const chokidar = require('chokidar');
const esbuild = require('esbuild');
const { readdirSync, statSync, existsSync, writeFileSync, mkdirSync } = require('fs');
const { join: _join, basename, resolve, dirname, relative } = require('path');
const alias = require('esbuild-plugin-alias');
const sveltePlugin = require('esbuild-svelte');
const { kebabCase, isEqual } = require('lodash');
const { copyFileSync } = require('fs');
const { program } = require('commander');

program.option('-w, --watch', 'enable watch mode').option('-s, --serve', 'start dev server');

program.parse();
const options = program.opts();

const { watch, serve } = options;

const unslash = s => s.replace(/\\/g, '/');
const join = (...args) => unslash(_join(...args));
const isInDir = (childDir, parentDir) => unslash(resolve(childDir)).startsWith(unslash(resolve(parentDir)));

const srcDir = './src';
const pageDir = join(srcDir, 'pages');
const outDir = './public';
const buildDelay = 500;

function findPages(dir = pageDir, sink = [], mainFileMapping = {}) {
  const mains = ['main.js', 'main.ts'];
  let main = mains.map(name => join(dir, name)).find(f => existsSync(f));

  main && sink.push(main);
  const files = readdirSync(dir).filter(f => f[0] !== '_');
  const svelteFiles = files.filter(f => f.endsWith('.svelte'));
  const dirs = files
    .filter(f => !svelteFiles.includes(f))
    .map(f => join(dir, f))
    .filter(f => statSync(f).isDirectory() && readdirSync(f).length !== 0);

  // if folder only contain one svelte file, assume it as App.svelte
  if (!main && svelteFiles.length === 1) {
    main = join(dir, 'main.ts');
    mainFileMapping[main] = './' + svelteFiles[0];
    sink.push(main);
  }

  if (!main) {
    if (svelteFiles.filter(f => f.toLowerCase() === 'index.svelte' || f.toLowerCase() === 'app.svelte').length > 1)
      throw new Error('one folder cannot have both index.svelte, app.svelte. dir: ' + dir);

    svelteFiles.forEach(f => {
      if (f.toLowerCase() === 'app.svelte' || f.toLowerCase() === 'index.svelte') {
        main = join(dir, 'main.ts');
        mainFileMapping[main] = './' + f;
      } else {
        const dirName = kebabCase(f.replace(/\.svelte/, ''));
        main = join(dir, dirName, 'main.ts');
        mainFileMapping[main] = '../' + f;

        const conflictDir = dirs.find(d => basename(d).toLowerCase() === dirName);
        if (conflictDir) throw new Error(`name conflicts: a file "${main}" will be created for `);
      }

      sink.push(main);
    });
  }

  dirs.forEach(f => findPages(f, sink, mainFileMapping));
  return [sink, mainFileMapping];
}

const svelteJsPathResolver = mainFileMapping => ({
  name: 'svelteJsPathResolver',
  setup(build) {
    const options = { filter: /main\.(js|ts)$/ };

    build.onResolve(options, ({ path, resolveDir }) => {
      path = unslash(path);
      if (!(path in mainFileMapping)) return;
      mainFileMapping[join(resolveDir, path)] = mainFileMapping[path];

      return { path: join(resolveDir, path) };
    });
    build.onLoad(options, ({ path }) => {
      path = unslash(path);
      if (!(path in mainFileMapping)) return;

      return {
        contents: `
            import App from "${mainFileMapping[path]}";
            export const app = new App({ target: document.getElementById("app") });
        `,
        loader: /\.(js|ts)$/.exec(path)[1],
        resolveDir: dirname(path),
      };
    });
  },
});

function createBuilder(entryPoints, mainFileMapping) {
  console.log('pages: ', entryPoints);

  entryPoints.forEach(f => {
    const html = join(f, '..', 'index.html');
    const saveDir = dirname(relative(pageDir, f));
    const out = join(outDir, saveDir, 'index.html');

    mkdirSync(dirname(out), { recursive: true });
    if (existsSync(html)) {
      console.log('copy:', html, '->', out);
      copyFileSync(html, out);
    } else {
      console.log('create:', out);
      writeFileSync(
        out,
        `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/${join(saveDir, 'main.css').replace('./', '')}">
        <title>TODO</title>
      </head>
      <body>
        <div id="app"></div>
        <script type="module" src="/${join(saveDir, 'main.js').replace('./', '')}"></script>
      </body>
    </html>
    `
      );
    }
  });

  return esbuild.build({
    entryPoints,
    bundle: true,
    outdir: outDir,
    plugins: [
      svelteJsPathResolver(mainFileMapping),
      alias({
        '@': resolve(__dirname, './src'),
      }),
      sveltePlugin(require('./svelte.config')),
    ],
    incremental: !!watch,
  });
}

(async () => {
  let watcherReady = false;

  console.log('first build start');
  let pages = findPages();
  let builder = await createBuilder(...pages);
  console.log('first build end\n');

  watch &&
    chokidar
      .watch(srcDir)
      .on('all', async (event, path) => {
        if (!watcherReady) return;
        console.log(event + ':', path);

        const inPageDir = isInDir(path, pageDir);

        if (inPageDir && path.endsWith('.html')) {
          const out = join(outDir, dirname(relative(pageDir, path)), 'index.html');
          console.log('copy:', path, '->', out);
          copyFileSync(path, out);
          return;
        }

        if (event === 'add' && inPageDir && /\.(js|ts|svelte)$/.test(path)) {
          const pages2 = findPages();

          if (!isEqual(pages, pages2)) {
            builder.rebuild.dispose();
            builder.stop();

            let builder = await createBuilder(...pages);
            return;
          }
        }

        if (/\.(js|ts|svelte|css|scss|json)$/.test(path)) {
          builder.rebuild();
          console.log('compiled');
        }
      })
      .on('ready', () => {
        console.log('watching for changes:', srcDir);
        watcherReady = true;
      });

  serve &&
    require('serve-http').createServer({
      port: 4200,
      pubdir: join(__dirname, 'public'),
    });
})();
