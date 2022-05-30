# Multipage Svelte, Svelte MPA

The purpose of this project is to make Svelte that defaults to SPA into an static generated MPA. So for deployment you only need to rsync the `.html`, `.css`, `.js` and any other non-`.svelte` files. It was originally built for [Z](https://github.com/kokizzu/gotro/tree/master/Z) template engine.

Creator: [sameerveda](//github.com/sameerveda)

Specs/sponsored by: [kokizzu](//github.com/kokizzu)

## Specification

For example you have a project with specific structure:

```shell
_mycomponent/
  button.svelte
foo/
  _table.svelte
  bar.svelte --> will generate 
  any.js
subpage/
  page3.svelte --> will generate
index.svelte --> will generate
whatever.css
whatever.js
_layout.html
```

It would automatically generate 3 files: `foo/bar.html`, `subpage/page3.html`, and `index.html`.

1. generate automatically `.html` foreach `.svelte`, for production build use `npm run build:prod`
2. can import properly other js, css, or svelte file (relative import)
3. dev mode, eg. `npm start`, it would listen to `localhost:8080` then livereload when changed like default svelte template project (will also autogenerate the `.html` files like spec number 1)
4. there no configuration, it should work as-is automatically, anything starts with underscore will not generate `.html`, eg. `_component1.svelte`, or `_components/table.svelte`
5. will look for `_layout.html` in current directory or nearest upper directories as base template
6. using minimal set of npm dependencies and no outdated package
7. generated html will not remove comments, especially one that used in [Z](https://github.com/kokizzu/gotro/tree/master/Z) template engine, like: `/*! c1 */`, `#{c2}`, `[/* c3 */]`, or `{/* c4 */}`

## How to use

```shell
$ npm install # install dependencies
$ npm start # start dev-server

$ npm run build:prod # build project for production

```

## Dev Dependencies

- [svelte](//svelte.dev/) - cybernetically enhanced web apps
- [esbuild](//esbuild.github.io/) - an extremely fast JavaScript bundler
- [esbuild-svelte](//github.com/EMH333/esbuild-svelte) - plugin to compile svelte components for bundling with esbuild
- [chokidar](//github.com/paulmillr/chokidar) - minimal and efficient cross-platform file watching library
- [five-server](//github.com/yandeu/five-server) - development Server with Live Reload Capability
- [lodash](//lodash.com) - A modern JavaScript utility library delivering modularity, performance & extras
- [parse5](//github.com/inikulin/parse5) - html parsing/serialization toolset for node.js
- [svelte-preprocess](//github.com/sveltejs/svelte-preprocess) - a svelte preprocessor with sensible defaults and support for: postcss, scss, less, stylus, coffeescript, typescript, pug and much more.

zero production dependency.

## TODO

- [ ] update built comment from highest modification date of dependencies, eg. if `a.svelte` depends on `b.js` and `c.js`, the resulting `a.html` html comment should be max modification date of those three 
