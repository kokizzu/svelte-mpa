const chokidar = require('chokidar');
const esbuild = require('esbuild');
const { readdirSync, statSync, existsSync, writeFileSync, mkdirSync, readFileSync } = require('fs');
const { join, basename, resolve, dirname, relative } = require('path');
const sveltePlugin = require('esbuild-svelte');
const { kebabCase, isEqual, size } = require('lodash');
const { copyFileSync } = require('fs');
const parse5 = require('parse5');

const [watch, serve, minify, debug] = ['--watch', '--serve', '--minify', '--debug'].map(s => process.argv.includes(s));

const ignoreDirs = new Set([
  'node_modules',
  '.git',
  'build.js',
  'package-lock.json',
  'package.json',
  'README.md',
  'build.js',
]);

function findPages(dir = '.', sink = []) {
  if (ignoreDirs.has(dir.replace('./', ''))) {
    console.log('skip: ', dir);
    return;
  }

  const files = readdirSync(dir).filter(f => f[0] !== '_');
  const svelteFiles = files.filter(f => f.endsWith('.svelte'));
  svelteFiles.forEach(f => sink.push(join(dir, f)));

  files
    .filter(f => !svelteFiles.includes(f))
    .map(f => join(dir, f))
    .filter(f => statSync(f).isDirectory())
    .forEach(f => findPages(f, sink));
  return sink;
}

const _zId_prefix = `z_placeholder_${Math.floor(Math.random() * 10000000).toString(16)}_`;
const _zReplacer = s => `'${_zId_prefix}${Buffer.from(s).toString('base64')}'`;

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
  content?.replace(new RegExp(`("|')${_zId_prefix}(\\w+=?)\\1`, 'g'), (_, _2, s) => {
    s = Buffer.from(s, 'base64').toString('ascii');
    sink.push(s);
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
  console.log('pages: ', entryPoints);

  return esbuild.build({
    entryPoints: entryPoints.map(s => s + '.ts'),
    bundle: true,
    outdir: '.',
    write: false,
    plugins: [svelteJsPathResolver, sveltePlugin(require('./svelte.config'))],
    incremental: !!watch,
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
                <title>!/* title */</title>
              </head>
              <body>
                <h1>layout for everything else</h1>
                <main id="ip"></main>
                <slot></slot>
              </body>
            </html>
      `
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
    slot.attrs = [{ name: 'id', value: 'app' }, ...(slot.attrs || [])?.filter(t => t.name !== 'id')];
  } else {
    body.childNodes.push({
      nodeName: 'main',
      tagName: 'main',
      attrs: [{ name: 'id', value: 'app' }],
      childNodes: [],
      namespaceURI: body.namespaceURI,
    });
  }

  const jsKEY = `${Math.random()}-JS-${Math.random()}`;
  const cssKEY = `${Math.random()}-CSS-${Math.random()}`;
  const commentKEY = `${Math.random()}-COMMENT-${Math.random()}`;
  const cssVarsKey = `${Math.random()}-CSS-COMMENT-${Math.random()}`;
  const jsVarsKey = `${Math.random()}-JS-COMMENT-${Math.random()}`;

  body.childNodes = [
    ...body.childNodes,
    {
      nodeName: '#comment',
      data: commentKEY,
    },
    {
      nodeName: '#text',
      value: '\n',
    },
    {
      nodeName: '#comment',
      data: cssVarsKey,
    },
    {
      nodeName: '#text',
      value: '\n',
    },
    {
      nodeName: '#comment',
      data: jsVarsKey,
    },
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

  debug && console.log('build layout for: ', path || defaultKey);
  const content0 = parse5.serialize(tree);

  return (layoutFor.cache[path || defaultKey] = ({ js, css }) => {
    const cssVars = [],
      jsVars = [];
    return content0
      .replace(cssKEY, zPlaceholderRestore(css, cssVars) || '')
      .replace(jsKEY, zPlaceholderRestore(js, jsVars) || '')
      .replace(commentKEY, `BUILD TIME: ${new Date().toISOString()}`)
      .replace(cssVarsKey, cssVars.length ? `--- CSS z-vars --- \n${cssVars.join('\n')}` : '')
      .replace(jsVarsKey, jsVars.length ? `--- JS z-vars --- \n${jsVars.join('\n')}` : '');
  });
}

(async () => {
  let watcherReady = false;

  console.log('first build start');
  let pages = findPages();
  let builder = await createBuilder(pages);
  console.log('first build end\n');

  const listed_files = new Set();
  const compiledFiles = new Set();
  let cache = {};

  function saveFiles(files = builder) {
    const output = {};
    for (const { path, text } of files.outputFiles) {
      if (cache[path] === text) continue;
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
      console.log('compiled', relative(resolve(__dirname), path));
      writeFileSync(path, content);
    });
  }

  saveFiles();

  watch &&
    chokidar
      .watch('.', { ignored: s => ignoreDirs.has(s) || ignoreDirs.has(join('./', s)) })
      .on('all', async (event, path) => {
        if (!watcherReady) return void listed_files.add(path);
        if (compiledFiles.has(resolve(path))) return;

        console.log(event + ':', path);

        if (path[0] !== '_' && path.endsWith('.svelte') && !listed_files.has(path)) {
          const pages2 = findPages();

          if (!isEqual(pages, pages2)) {
            cache = {};
            builder = await createBuilder(pages);
            saveFiles();
            return;
          }
        }

        saveFiles(await builder.rebuild());
      })
      .on('ready', () => {
        console.log(`watching ${listed_files.size} files/dirs for changes`);
        watcherReady = true;
      });

  serve &&
    require('live-server').start({
      open: true,
      pubdir: __dirname,
      ignore: [...ignoreDirs, '*.js', '*.ts', '*.svelte'].join(','),
      wait: 500,
    });
})();
