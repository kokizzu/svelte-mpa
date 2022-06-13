const chokidar = require('chokidar');
const esbuild = require('esbuild');
const {readdirSync, statSync, existsSync, writeFileSync, readFileSync} = require('fs');
const {join, basename, resolve, dirname, relative} = require('path');
const sveltePlugin = require('esbuild-svelte');
const {sum} = require('lodash');
const parse5 = require('parse5');

const [watch, serve, minify, debug, logVars] = ['--watch', '--serve', '--minify', '--debug', '--log-vars'].map(s =>
  process.argv.includes(s)
);
const debug_console_log = (args, returnIndex = 0) => (debug && console.log(...args), args[returnIndex]);

const ignorePath = new Set([
  'node_modules',
  '.vscode',
  '.idea',
  '.git',
  '.gitignore',
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

const _zId_prefix = `z_placeholder_${Math.floor(Math.random() * 10000000).toString(16)}_`;
const _zReplacer = s => debug_console_log(['z-replace:', s, `'${_zId_prefix}${Buffer.from(s).toString('base64')}'`], 2);

const zPlaceholderReplacer = content =>
  // map /*! mapKey */
  content
    ?.replace(/\/\*\!\s*\w+\s*\*\//gs, _zReplacer)
    // map [/* mapKey */]
    .replace(/\[\s*\/\*\s*\w+\s*\*\/\s*\]/gs, _zReplacer)
    // map {/* mapKey */}
    .replace(/\{\s*\/\*\s*\w+\s*\*\/\s*\}/gs, _zReplacer);

global.zPlaceholderReplacer = zPlaceholderReplacer;

const zPlaceholderRestore = (content, sink) =>
  content?.replace(new RegExp(`("|')${_zId_prefix}(\\w+=*)\\1`, 'g'), (_, _2, s) => {
    s = Buffer.from(s, 'base64').toString('ascii');
    sink.push(s);
    debug && console.log('z-restore', _, s);
    return s;
  });

const svelteJsPathResolver = {
  name: 'svelteJsPathResolver',
  setup(build) {
    const options = {filter: /\.svelte\.(ts)$/};

    build.onResolve(options, ({path, resolveDir}) => ({path: join(resolveDir, path)}));
    build.onLoad(options, ({path}) => {
      return {
        contents: `
            import App from "./${basename(path).replace(/\.ts$/, '')}";
            export const app = new App({ target: document.getElementById("app") });
        `,
        loader: 'ts',
        resolveDir: dirname(path),
      };
    });
  },
};

function createBuilder(entryPoints) {
  console.log('pages:', entryPoints);

  return esbuild.build({
    entryPoints: entryPoints.map(s => s + '.ts'),
    bundle: true,
    outdir: '.',
    write: false,
    plugins: [svelteJsPathResolver, sveltePlugin(require('./svelte.config'))],
    incremental: !!watch,
    sourcemap: false,
    minify,
  });
}

function layoutFor(path) {
  path = (() => {
    let temp = join(path, '..', '_layout.html');

    while (true) {
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

  const tree = parse5.parse(
    path
      ? readFileSync(path, 'utf-8')
      : `<html>
  <head>
    <title>#{title}</title>
  </head>
  <body>
    <h1>layout not found, please create <b>_layout.html</b></h1>
    <slot></slot>
  </body>
</html>`
  );

  let slot = null;
  let body = null;

  let stack = [...tree.childNodes];

  while (stack.length && (slot == null || body == null)) {
    const t = stack.pop();
    if (t.nodeName === 'body') body = t;
    if (t.nodeName === 'slot' || (t.nodeName === '#comment' && t.data?.trim() === 'content_goes_here')) slot = t;

    t.childNodes && (stack = [...stack, ...t.childNodes]);
  }

  if (!body) throw new Error('body not found');

  if (slot) {
    slot.nodeName = 'main';
    slot.tagName = 'main';
    delete slot.data;
    slot.attrs = [
      {name: 'id', value: 'app'}, 
      ...(slot.attrs || [])?.filter(t => t.name !== 'id')
    ];
  } else {
    body.childNodes.push({
      nodeName: 'main',
      tagName: 'main',
      attrs: [{name: 'id', value: 'app'}],
      childNodes: [],
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
      childNodes: [{nodeName: '#text', value: cssKEY}],
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
      childNodes: [{nodeName: '#text', value: jsKEY}],
      namespaceURI: body.namespaceURI,
    },
    {
      nodeName: '#text',
      value: '\n',
    },
  ];

  debug && console.log('build layout for:', path || defaultKey);

  return (layoutFor.cache[path || defaultKey] = ({js, css}) => {
    const cssVars = [],
      jsVars = [];
    js = zPlaceholderRestore(js, cssVars) || '';
    css = zPlaceholderRestore(css, cssVars) || '';

    //comments.data = `BUILD TIME: ${new Date().toISOString()}`;
    cssVarsComments.data = cssVars.length ? `--- CSS z-vars --- \n${cssVars.join('\n')}` : '';
    jsVarsComments.data = jsVars.length ? `--- JS z-vars --- \n${jsVars.join('\n')}` : '';

    return parse5.serialize(tree).replace(cssKEY, css).replace(jsKEY, js);
  });
}

(async () => {
  let watcherReady = false;

  watch && console.log('first build start');
  let pages = findPages();
  let builder = await createBuilder(pages);

  const compiledFiles = new Set();
  let cache = {};

  function saveFiles(files = builder, layoutChanged = false) {
    const output = {};
    for (const {path, text} of files.outputFiles) {
      if (cache[path] === text && !layoutChanged) continue;
      cache[path] = text;

      const key = path.replace(/\.svelte\.\w+$/, '');
      output[key] = output[key] || {};

      const ext = /\.(\w+)$/.exec(path)?.[1];
      if (ext !== 'css' && ext !== 'js') throw new Error('unknown ext:' + ext);

      output[key][ext] = text;
    }

    if (Object.keys(output).length === 0) return console.log('no changes');

    Object.entries(output).forEach(([path, data]) => {
      const content = layoutFor(path)(data);

      path = resolve(path + '.html');
      compiledFiles.add(path);
      console.log('compiled:', relative(resolve(__dirname), path));
      writeFileSync(path, content);
    });
  }

  saveFiles();
  watch && console.log('first build end');

  if (watch) {
    const pagesPaths = new Set(pages.map(p => resolve(p)));

    let timeRef = null;

    function changeListener(path, stats, type, watcher) {
      if (compiledFiles.has(resolve(path))) return;
      console.log(type + ':', path.replace(__dirname, ''));

      const svelteFile = path[0] !== '_' && path.endsWith('.svelte');

      let pagesChanged = true;
      if (svelteFile && type === 'add') pagesPaths.add(resolve(path));
      else if (svelteFile && type === 'unlink') pagesPaths.delete(resolve(path));
      else pagesChanged = false;

      let layoutChanged = path.endsWith('_layout.html');
      
      if (timeRef) clearTimeout(timeRef);
      timeRef = setTimeout(async () => {
        pagesChanged
          ? saveFiles((builder = await createBuilder(Array.from(pagesPaths, p => relative(__dirname, p)))), layoutChanged)
          : saveFiles(await builder.rebuild(), layoutChanged);
      }, 200);
    }

    const watcher = chokidar
      .watch('.', {ignored: s => ignorePath.has(s) || ignorePath.has(join('./', s)), ignoreInitial: true})
      .on('change', (path, stats) => changeListener(path, stats, 'change', watcher))
      .on('add', (path, stats) => changeListener(path, stats, 'add', watcher))
      .on('unlink', (path, stats) => changeListener(path, stats, 'unlink', watcher))
      .on('ready', () => {
        console.log(`watching ${sum(Object.values(watcher.getWatched()).map(t => t.length))} files/dirs for changes`);
        watcherReady = true;
      })
      .on('error', err => console.log('ERROR:', err));
  }

  const FiveServer = require('five-server').default;
  serve &&
  (await new FiveServer().start({
    open: true,
    workspace: __dirname,
    ignore: [...ignorePath, /\.(js|ts|svelte)$/, /\_layout\.html$/],
    wait: 500,
  }));
})();
