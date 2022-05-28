# Multipage Svelte

The purpose of this project is to make velte that defaults to SPA into MPA

Creator: [sameerveda](//github.com/sameerveda)
Sponsored by [kokizzu](//github.com/kokizzu)

## Specification

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

It would generate 3 files automatically: `foo/bar.html`, `subpage/page3.html`, `index.html`

1. generate automatically .html foreach .svelte, for example when running `make gen` or `npm run build`
2. import properly other js, css, or svelte file (relative import)
3. dev mode, eg. `npm run dev`, it would listen to `localhost:portNumber` then livereload when changed like default svelte template project (will also autogenerate the `.html` files like spec number 1)
4. there no configuration, it should work as-is automatically, anything starts with underscore should not be generated, eg. `_component1.svelte`, or `_components/table.svelte`
5. will look for `_layout.html` in current directory or upper directories as base template
6. using minimal set of npm dependencies and no outdated package
7. planned to use Nodejs or Go (similar like what https://github.com/livebud/bud or https://github.com/plentico/plenti did)
