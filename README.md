# Multipage Svelte, Svelte MPA

This is starter template to create multiple-page application using plain Svelte, so just like SvelteKit static-adapter, but without unecessary complexity it introduces.

The purpose of this project is to make [Svelte](//svelte.dev/) that defaults is component-based SPA into an statically-generated MPA (multi-page SPA, page+component-based). 
So for deployment you only need to [rsync](//rsync.samba.org/) the `.html`, imported/external `.css`/`.js` and any other assets (images, fonts, non-`.svelte` files). 
It was originally built for [Z](https://github.com/kokizzu/gotro/tree/master/Z) template engine.

Creator: [sameerveda](//github.com/sameerveda)

Specs/maintainer/sponsored by: [kokizzu](//github.com/kokizzu)

## 💡 Why Svelte?

[Rethinking Reactivity](//www.youtube.com/watch?v=AdNJ3fydeao)
`tl;dw`
- Svelte is just normal html with automatic reactivity (every assignment will efficiently update the dependent element on next render tick), so very shallow learning curve, if you already know basic of javascript+html+css, you already can use Svelte
- Component-based, each `.svelte` file is will became html element
- No JSX, so you can just copy paste any html and it should work without have to convert it
- compiled, so most likely you can detect problems before running it

## 📰 Changelog

- `2023-08-07` feat: remove full path fakecss comment generation
- `2023-08-02` feat: send desktop notification when error
- `2023-08-02` bugfix: should not exit when compile error
- `2023-06-23` feat: upgrade to svelte-4
- `2023-01-07` bugfix: nested component css not outputted after editing
- `2022-12-31` bugfix: component css not outputted after editing
- `2022-09-12` feat: render on first load for SEO
- `2022-07-07` bugfix: watcher not capturing added/deleted files, feat: optimized watch list
- `2022-05-30` initial version

## 🉐 Specification

For example you have a project with specific structure:

```shell
_mycomponent/
  button.svelte
foo/
  _table.svelte
  bar.svelte --> will generate bar.html
  any.js
subpage/
  page3.svelte --> will generate page3.html
index.svelte --> will generate index.html
whatever.css
whatever.js
_layout.html
```

It would automatically generate 3 files: `foo/bar.html`, `subpage/page3.html`, and `index.html`.

1. generate automatically `.html` foreach `.svelte`, for production build use `npm run build:prod`
2. there no configuration, it should work as-is automatically, anything starts with underscore will not generate `.html`, eg. `foo/_component1.svelte`, or `_components/table.svelte`
3. will look for `_layout.html` in current directory or nearest upper directories as base template
4. can import properly other js, css, or svelte file (relative import)
5. dev mode, eg. `npm run dev`, it would listen to `localhost:5500` then livereload when changed like default svelte template project (will also autogenerate the `.html` files like spec number 1), there's also `npm run watch` if you have reverse proxy or backend that loads html that listen on another port
6. using minimal set of npm dependencies and no outdated package (use `./update_deps.sh` to update dependencies)
7. generated html will not remove comments, especially one that used in [Z](https://github.com/kokizzu/gotro/tree/master/Z) template engine, like: `/*! c1 */`, `#{c2}`, `[/* c3 */]`, or `{/* c4 */}`

## 🍴 Usage

Svelte-MPA is just consist of `build.js`, `package.json`, `svelte.config.js`, so you just need to copy those files to your project, then create `_layout.html` and one `.svelte` file to start. Or alternatively just clone whole directory manually or using `degit` and remove stuff that you don't need.

```shell
npm install -g degit                 # scaffolding helper
degit kokizzu/svelte-mpa myproject1  # clone this repo with new name
cd myproject1                        

npm install    # install dependencies
npm start      # start dev-server, auto rebuild
npm run watch  # auto rebuild without webserver, 
               # eg. if you use other webserver/reverse proxy locally

npm run build:prod  # build project for production
./deploy.sh         # example deployment script for single server
```

## 🏗️ How to update/upgrade from previous version?

just copy latest `build.js` to your project directory and then `npm i` or `pnpm i`

or if you want to use Svelte-4 from previous version that uses Svelte-3:

```
# copy latest build.js to your project directory
cp ../svelte-mpa/build.js .
cp ../svelte-mpa/svelte.config.js .

# upgrade package.json to svelte 4
npx svelte-migrate svelte-4 .

# update all dependencies (downloads svelte 4)
./update_deps.sh # or npm i # or pnpm i
```

## ⌨️ Dev Dependencies

- [svelte](//svelte.dev/) - cybernetically enhanced web apps
- [esbuild](//esbuild.github.io/) - an extremely fast JavaScript bundler
- [esbuild-svelte](//github.com/EMH333/esbuild-svelte) - plugin to compile svelte components for bundling with esbuild
- [chokidar](//github.com/paulmillr/chokidar) - minimal and efficient cross-platform file watching library
- [five-server](//github.com/yandeu/five-server) - development Server with Live Reload Capability
- [lodash](//lodash.com) - A modern JavaScript utility library delivering modularity, performance & extras
- [node-notifier](//github.com/mikaelbr/node-notifier) - cross-platform desktop notification
- [parse5](//github.com/inikulin/parse5) - html parsing/serialization toolset for node.js
- [svelte-preprocess](//github.com/sveltejs/svelte-preprocess) - a svelte preprocessor with sensible defaults and support for: postcss, scss, less, stylus, coffeescript, typescript, pug and much more.

🔥 **ZERO** production dependency. 🔥

## ❓ Why Svelte-MPA? Motivation

If you already have existing backend that wasn't written in NodeJS, you can have best of two worlds, multiple page with their own [meta headers](//svelte.dev/repl/ffd783c9b8e54d97b6b7cac6eadace42?version=3.52.0) and content for SEO, and reactivity using Svelte for each page. Also with this you can remove the serialization/transport/hop-cost of default setup:

so for first request normally would be something like this:
```
[Browser] 
  --fetch-HTML--> 
    [SvelteKit/Next/Nuxt/other-SSR] 
      --fetch-API--> 
        [ExistingBackend]
```
or like this:
```
[Browser] (1st request)
  --fetch-HTML--> 
    [SvelteKit-static-adapter/generated-HTML] (fetch the HTML first without data)
[Browser] (2nd request)
  --fetch-API--> 
    [ExistingBackend] (fetch the JSON to populate data, then rerender)
```
became:
```
[Browser] (only need 1 request)
  --fetch-HTML+API--> 
    [ExistingBackend] 
```

So your existing backend responsibility is to load the generated `.html` then replace the js variable or any template keyword with proper value for initial load/SEO. So not svelte's responsibility to request/preload the initial json content, but backend's responsibility (whatever existing backend langauge/framework you are using). Like SvelteKit, you can also use this as SSG. You can see example [here](//github.com/kokizzu/sveltefiber)

## 📈 TODO / Possible Improvement

- [ ] update `<!-- MODIFIED TIME` generated comment from highest modification date of dependencies, eg. if `a.svelte` depends on `b.js` and `_c.svelte`, the resulting `a.html` html comment should be max modification date of those three
- [ ] prevent generating full path comment on the upper part of the html (what svelte file being included), it should be only relative path starting from project folder
- [ ] generate bundled javascript `[name].min.js` foreach `[name].svelte` file that will imported by generated `[name].html`, to reduce overhead when page's bundled reactivity code size is very big, only when svelte file doesn't contain Z-template special keywords, so the code might look like this:
```html
`_layout.html`:
...
<script>
  let obj = {/* some_obj */}
  let arr = [/* some_arr */]
</script>

`bla.svelte`:
<script>
  let obj = (window||{}).obj || {};
  let arr = (window||{}).arr || [];
</script>

generated `bla.min.js` will be referenced by `bla.html`: 
<script src='bla.min.js?modifiedTime'></script>
```
