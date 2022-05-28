# Multipage Svelte

The purpose of this project is to make Svelte that defaults to SPA into an static generated MPA. So for deployment you only need to rsync the `.html`, `.css`, `.js` and any other non `.svelte` files. It was originally built for [Z](https://github.com/kokizzu/gotro/tree/master/Z)-template engine.

Creator: [sameerveda](//github.com/sameerveda)

Specs/sponsored by: [kokizzu](//github.com/kokizzu)

## Specification

For example you have a project with specific structure:

```shell
foo/
  bar.svelte
  any.js
subpage/
  page3.svelte
index.svelte
whatever.css
whatever.js
_layout.html
```

It would automatically generate 3 files: `foo/bar.html`, `subpage/page3.html`, and `index.html`.

1. generate automatically `.html` foreach `.svelte`, for example when running `make gen` or `npm run build`
2. can import properly other js, css, or svelte file (relative import)
3. dev mode, eg. `npm run dev`, it would listen to `localhost:portNumber` then livereload when changed like default svelte template project (will also autogenerate the `.html` files like spec number 1)
4. there no configuration, it should work as-is automatically, anything starts with underscore will not generate `.html`, eg. `_component1.svelte`, or `_components/table.svelte`
5. will look for `_layout.html` in current directory or upper directories as base template
6. using minimal set of npm dependencies and no outdated package
7. planned to use Nodejs or Go (similar like what https://github.com/livebud/bud or https://github.com/plentico/plenti did)
8. it will not remove comments, especially one that used in `Z` template engine, like: `/*! c1 */`, `#{c2}`, `[/* c3 */]`, or `{/* c4 */}`

## How to usa

TODO continue this (install esbuild, etc)
