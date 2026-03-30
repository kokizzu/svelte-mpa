import { compile } from 'svelte/compiler';
import { render } from 'svelte/server';
import chokidar from 'chokidar';
import esbuild from 'esbuild';
import { existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'fs';
import { basename, dirname, join, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import sveltePlugin from 'esbuild-svelte';
import { sum } from 'lodash-es';
import { parse, serialize } from 'parse5';
import notifier from 'node-notifier';
import svelteConfig from './svelte.config.js';
import FiveServerModule from 'five-server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.on('uncaughtException', error => {
  console.error(error);
  notifier.notify({
    title: 'Error occurs',
    message: `${error}`,
  });
});

process.on('unhandledRejection', error => {
  console.error(error);
  notifier.notify({
    title: 'Unhandled rejection',
    message: `${error}`,
  });
});

const FiveServer = FiveServerModule?.default || FiveServerModule;

const [watch, serve, minify, debug, logVars] = ['--watch', '--serve', '--minify', '--debug', '--log-vars'].map(s =>
  process.argv.includes(s),
);
const debug_console_log = (args, returnIndex = 0) => (debug && console.log(...args), args[returnIndex]);

const ignorePath = new Set([
  'node_modules',
  '.vscode',
  '.idea',
  '.git',
  '.gitignore',
  '.ssr_temp',
  'build.js',
  'package-lock.json',
  'package.json',
  'README.md',
  'build.js',
  'pullpush.sh',
]);

// find page candidates
function findPages(dir = '.', sink = []) {
  if (ignorePath.has(dir.replace('./', '').replace('.\\', ''))) {
    debug && console.log('skip:', dir);
    return;
  }

  const files = readdirSync(dir).filter(f => f[0] !== '_');
  const svelteFiles = files.filter(f => f.endsWith('.svelte') && statSync(join(dir, f)).isFile());
  svelteFiles.forEach(f => sink.push(join(dir, f)));

  files
    .filter(f => !svelteFiles.includes(f))
    .map(f => join(dir, f))
    .filter(f => statSync(f).isDirectory())
    .forEach(f => findPages(f, sink));
  return sink;
}

const _zId_prefix = `z_placeholder_${Math.floor(Math.random() * 1000000000).toString(16)}_`;
const _zReplacer = s => {
  const result = `"${_zId_prefix}${Buffer.from(s).toString('base64')}"`;
  debug && console.log('z-replace:', s, '->', result);
  return result;
};

const zPlaceholderReplacer = (content, isSSR = global.zIsSSR) => {
  if (!content) return content;
  if (isSSR) return content;
  return content.replace(/\#\{\s*\w+\s*\}/gs, _zReplacer) // #{ key }
    .replace(/\/\*\!\s*\w+\s*\*\//gs, _zReplacer) // map /*! mapKey */
    .replace(/\[\s*\/\*\s*\w+\s*\*\/\s*\]/gs, _zReplacer) // map [/* mapKey */]
    .replace(/\{\s*\/\*\s*\w+\s*\*\/\s*\}/gs, _zReplacer); // map {/* mapKey */}
};

global.zPlaceholderReplacer = zPlaceholderReplacer;

const zPlaceholderRestore = (content, sink) =>
  content?.replace(new RegExp(`("|')?${_zId_prefix}(\\w+=*)\\1?`, 'g'), (_, q, s) => {
    s = Buffer.from(s, 'base64').toString('ascii');
    sink.push(s);
    debug && console.log('z-restore', _, s);
    return s;
  });

const svelteJsPathResolver = {
  name: 'svelteJsPathResolver',
  setup(build) {
    const options = { filter: /\.svelte\.(ts)$/ };

    build.onResolve(options, ({ path, resolveDir }) => ({ path: join(resolveDir, path) }));
    build.onLoad(options, ({ path }) => {
      return {
        contents: `
            import { mount } from "svelte";
            import App from "./${basename(path).replace(/\.ts$/, '')}";
            let target = document.getElementById("app");
            target.innerHTML = '';
            export const app = mount(App, { target: target });
            export default app;
        `,
        loader: 'ts',
        resolveDir: dirname(path),
      };
    });
  },
};

async function createBuilder(entryPoints) {
  console.log('pages:', entryPoints);

  const buildOptions = {
    entryPoints: entryPoints.map(s => s + '.ts'),
    bundle: true,
    outdir: '.',
    write: false,
    plugins: [svelteJsPathResolver,
      sveltePlugin({ ...svelteConfig, compilerOptions: { ...svelteConfig.compilerOptions, css: 'injected' } }),
    ],
    sourcemap: false,
    minify,
  };

  if (watch) {
    const context = await esbuild.context(buildOptions);
    const buildResult = await context.rebuild();

    return {
      outputFiles: buildResult.outputFiles,
      rebuild: () => context.rebuild(),
      dispose: () => context.dispose(),
    };
  }

  return esbuild.build(buildOptions);
}

function layoutFor(path, content = {}) {
  path = (() => {
    let temp = join(path, '..', '_layout.html');

    while(true) {
      if (existsSync(temp)) return temp;
      if (resolve(__dirname) === resolve(dirname(temp))) return;

      temp = join(temp, '../..', '_layout.html');
    }
  })();

  layoutFor.cache = layoutFor.cache || {};

  const defaultKey = '_DEFAULT_LAYOUT';
  if (!path && layoutFor.cache[defaultKey]) return layoutFor.cache[defaultKey];

  let cache = layoutFor.cache[path];
  const m = statSync(path).mtimeMs;
  if (cache && m === cache.m) return cache;

  const tree = parse(
    path
      ? readFileSync(path, 'utf-8')
      : `<!DOCTYPE html>
<html>
  <head>
    <title>#{title}</title>
  </head>
  <body>
    <h1>layout not found, please create <b>_layout.html</b></h1>
    <slot></slot>
  </body>
</html>`,
  );

  let slot = null;
  let body = null;

  let stack = [...tree.childNodes];

  while(stack.length && (slot == null || body == null)) {
    const t = stack.pop();
    if (t.nodeName === 'body') body = t;
    if (t.nodeName === 'slot' || (t.nodeName === '#comment' && t.data?.trim() === 'content_goes_here')) slot = t;

    t.childNodes && (stack = [...stack, ...t.childNodes]);
  }

  // main content placeholder
  const appKEY = `${Math.random()}-APP-${Math.random()}`;
  if (slot) {
    slot.nodeName = 'main';
    slot.tagName = 'main';
    delete slot.data;
    slot.attrs = [
      { name: 'id', value: 'app' },
      ...(slot.attrs || [])?.filter(t => t.name !== 'id'),
    ];
    slot.childNodes = [{ nodeName: '#text', value: appKEY }];
  } else {
    body.childNodes.push({
      nodeName: 'main',
      tagName: 'main',
      attrs: [{ name: 'id', value: 'app' }],
      childNodes: [{ nodeName: '#text', value: appKEY }],
      namespaceURI: body.namespaceURI,
    });
  }

  const jsKEY = `${Math.random()}-JS-${Math.random()}`;
  const cssKEY = `${Math.random()}-CSS-${Math.random()}`;
  const comments = {
    nodeName: '#comment',
    data: '',
  };
  const cssVarsComments = {
    nodeName: '#comment',
    data: '',
  };
  const jsVarsComments = {
    nodeName: '#comment',
    data: '',
  };

  body.childNodes = [
    ...body.childNodes,
    comments,
    {
      nodeName: '#text',
      value: '\n',
    },
    logVars && cssVarsComments,
    {
      nodeName: '#text',
      value: '\n',
    },
    logVars && jsVarsComments,
    {
      nodeName: '#text',
      value: '\n',
    },
    {
      nodeName: 'style',
      tagName: 'style',
      attrs: [],
      childNodes: [{ nodeName: '#text', value: cssKEY }],
      namespaceURI: body.namespaceURI,
    },
    {
      nodeName: '#text',
      value: '\n',
    },
    {
      nodeName: 'script',
      tagName: 'script',
      attrs: [],
      childNodes: [{ nodeName: '#text', value: jsKEY }],
      namespaceURI: body.namespaceURI,
    },
    {
      nodeName: '#text',
      value: '\n',
    },
  ];

  debug && console.log('build layout for:', path || defaultKey);

  return (layoutFor.cache[path || defaultKey] = ({ js, css }) => {
    const cssVars = [],
      jsVars = [];
    js = zPlaceholderRestore(js, jsVars) || '';
    css = zPlaceholderRestore(css, cssVars) || '';

    //comments.data = `BUILD TIME: ${new Date().toISOString()}`;
    cssVarsComments.data = cssVars.length ? `--- CSS z-vars --- \n${cssVars.join('\n')}` : '';
    jsVarsComments.data = jsVars.length ? `--- JS z-vars --- \n${jsVars.join('\n')}` : '';

    let html = zPlaceholderRestore(content.html, []) || '';
    const innerCss = (content.css || {}).code || '';

    debug && console.log('Replacing appKEY in layout for', path, 'with HTML length:', html.length);
    const result = serialize(tree).replace(cssKEY, css + innerCss).replace(jsKEY, js).replace(appKEY, html).replaceAll('fakecss:' + __dirname, 'fakecss:.');

    if (debug && !result.includes(html)) {
      console.warn('WARNING: SSR HTML not found in final output for', path);
    }
    return result;
  });
}

(async() => {
  let watcherReady = false;

  watch && console.log('first build start');
  let pages = findPages();
  global.zIsSSR = false;
  let builder = await createBuilder(pages);

  const compiledFiles = new Set();
  let cache = {};

  async function saveFiles(files = builder, layoutChanged = false) {
    const output = {};
    let unchanged = 0;

  // We need to render the pages on the server for SEO
  // We'll do a separate build for this to get all pages at once
  const pages = Array.from(new Set(files.outputFiles.map(f => f.path.replace(/\.svelte\.\w+$/, '.svelte'))));
  global.zIsSSR = true;
  const ssrResult = await esbuild.build({
    entryPoints: pages,
    bundle: true,
    platform: 'node',
    format: 'esm',
    outdir: '.ssr_temp',
    write: true,
    plugins: [sveltePlugin({
      ...svelteConfig,
      compilerOptions: { ...svelteConfig.compilerOptions, generate: 'server' },
    })],
    external: ['svelte/server'],
  });
  global.zIsSSR = false;

    // path = bla.svelte.js or bla.svelte.css
    for(const { path, text } of files.outputFiles) {
      const ext = /\.(\w+)$/.exec(path)?.[1];
      debug && console.log('output path:', path);
      debug && ext === 'css' && console.log('css text:', text);
      if (ext !== 'css' && ext !== 'js') throw new Error('unknown ext:' + ext);

      // bla.js or bla.css
      const key = path.replace(/\.svelte\.\w+$/, '');

      output[key] = output[key] || {};
      output[key][ext] = text;

      if (cache[path] === text && !layoutChanged) {
        unchanged += 1;
        continue;
      }
      cache[path] = text;
    }

    // do nothing if nothing's changed
    if (unchanged === files.outputFiles.length) return;

    if (Object.keys(output).length === 0) return console.log('no changes');

    // for each .html files need to be generated
    for(const [path, data] of Object.entries(output)) {
      const ssrPath = resolve('.ssr_temp', relative(__dirname, path) + '.js');
      let html = '';
      try {
        const fullSsrPath = ssrPath + '?' + Date.now();
        debug && console.log('Importing SSR from:', fullSsrPath);
        const { default: App } = await import(fullSsrPath);
        const rendered = render(App, { props: {} });
        html = rendered.html.replace(/<!--\[-->/g, '').replace(/<!--\]-->/g, '').replace(/<!---->/g, '');
        debug && console.log('SSR HTML length for', path, ':', html.length);
      } catch(e) {
        console.error(`Failed to render SSR for ${path}:`, e);
      }

      const source = readFileSync(path + '.svelte', 'utf-8');
      const renderedSvelte = compile(source, { filename: path + '.svelte', css: 'external' });

      const content = layoutFor(path, { ...renderedSvelte, html })(data);

      const outPath = resolve(path + '.html');
      compiledFiles.add(outPath);
      console.log('compiled:', relative(resolve(__dirname), outPath));
      writeFileSync(outPath, content);
    }

    // Clean up temporary SSR build
    try {
      rmSync('.ssr_temp', { recursive: true, force: true });
    } catch(e) {
      // ignore
    }
  }

  await saveFiles();
  watch && console.log('first build end');

  if (watch) {
    const pagesPaths = new Set(pages.map(p => resolve(p)));

    let timeRef = null;

    function changeListener(path, stats, type, watcher) {
      switch(type) {
        case 'change':
          notifier.notify({
            title: 'Change occurs',
            message: `Change occurs in "${path}"`,
          });
          break;
        case 'add':
          notifier.notify({
            title: 'File added',
            message: `Added file "${path}"`,
          });
          break;
        case 'unlink':
          notifier.notify({
            title: 'File remove',
            message: `Removed file "${path}"`,
          });
          break;
      }

      if (compiledFiles.has(resolve(path))) return;
      console.log(type + ':', path.replace(__dirname, ''));

      const svelteFile = path[0] !== '_' && path.endsWith('.svelte');

      let pagesChanged = true;
      if (svelteFile && type === 'add') pagesPaths.add(resolve(path));
      else if (svelteFile && type === 'unlink') pagesPaths.delete(resolve(path));
      else pagesChanged = false;

      let layoutChanged = path.endsWith('_layout.html');

      if (timeRef) clearTimeout(timeRef);
      timeRef = setTimeout(async() => {
        if (pagesChanged) {
          if (builder.dispose) await builder.dispose();
          builder = await createBuilder(Array.from(pagesPaths, p => relative(__dirname, p)));
          await saveFiles(builder, layoutChanged);
          return;
        }

        await saveFiles(await builder.rebuild(), layoutChanged);
      }, 200);
    }

    const watcher = chokidar
      .watch('.', { ignored: s => ignorePath.has(s) || ignorePath.has(join('./', s)), ignoreInitial: true })
      .on('change', (path, stats) => changeListener(path, stats, 'change', watcher))
      .on('add', (path, stats) => changeListener(path, stats, 'add', watcher))
      .on('unlink', (path, stats) => changeListener(path, stats, 'unlink', watcher))
      .on('ready', () => {
        console.log(`watching ${sum(Object.values(watcher.getWatched()).map(t => t.length))} files/dirs for changes`);
        watcherReady = true;
      })
      .on('error', err => console.log('ERROR:', err));
  }
  ;


  if (serve) {
    if (typeof FiveServer !== 'function') {
      throw new TypeError(`five-server export is not a constructor (typeof=${typeof FiveServer})`);
    }

    await new FiveServer().start({
      open: true,
      workspace: __dirname,
      ignore: [...ignorePath, /\.(js|ts|svelte)$/, /\_layout\.html$/],
      wait: 500,
    });
  }
})();
