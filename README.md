# Multipage Svelte, Svelte MPA

The purpose of this project is to make Svelte that defaults is component-based SPA into an statically-generated MPA (multipage SPA, page+component-based). 
So for deployment you only need to [rsync](//rsync.samba.org/) the `.html`, `.css`, `.js` and any other non-`.svelte` files. 
It was originally built for [Z](https://github.com/kokizzu/gotro/tree/master/Z) template engine.

Creator: [sameerveda](//github.com/sameerveda)

Specs/sponsored by: [kokizzu](//github.com/kokizzu)

## Specification

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
2. there no configuration, it should work as-is automatically, anything starts with underscore will not generate `.html`, eg. `_component1.svelte`, or `_components/table.svelte`
3. will look for `_layout.html` in current directory or nearest upper directories as base template
4. can import properly other js, css, or svelte file (relative import)
5. dev mode, eg. `npm start`, it would listen to `localhost:5500` then livereload when changed like default svelte template project (will also autogenerate the `.html` files like spec number 1)
6. using minimal set of npm dependencies and no outdated package
7. generated html will not remove comments, especially one that used in [Z](https://github.com/kokizzu/gotro/tree/master/Z) template engine, like: `/*! c1 */`, `#{c2}`, `[/* c3 */]`, or `{/* c4 */}`

## Usage

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

## Why? Motivation

If you already have existing backend that wasn't written in NodeJS, you can have best of two worlds, multiple page with their own meta headers and content for SEO, and reactivity using Svelte for each page. Also with this you can remove the serialization/transport/hop-cost of default setup:

```
[Browser] --fetch-HTML--> [SvelteKit/Next/Nuxt/etc] --fetch-API--> [ExistingBackend]

became

[Browser] --fetch-HTML/API--> [ExistingBackend]
```

So your existing backend responsibility is to load the generated `.html` then replace the js variable or any template keyword with proper value for initial load/SEO. So not svelte's responsibility to request/preload the initial json content, but backend's responsibility (whatever existing backend langauge/framework you are using). Like SvelteKit, you can also use this as SSG. You can see example [here](//github.com/kokizzu/sveltefiber)

## TODO / Possible Improvement

- [ ] update `<!-- MODIFIED TIME` generated comment from highest modification date of dependencies, eg. if `a.svelte` depends on `b.js` and `_c.svelte`, the resulting `a.html` html comment should be max modification date of those three 
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
