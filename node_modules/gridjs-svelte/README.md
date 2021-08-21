# gridjs-svelte

A Svelte wrapper component for [Grid.js](https://gridjs.io)

## Installation

``` bash
npm install gridjs gridjs-svelte
```

## Usage

> [Try it out in the browser](https://svelte.dev/repl/9a066ccf55f54173bf5c6c8042142566)

``` html
<script>
  import Grid from "gridjs-svelte";

  const data = [
    { name: "John", email: "john@example.com" },
    { name: "Mark", email: "mark@gmail.com" },
  ];
</script>

<Grid {data} />

<style global>
  @import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";
</style>
```

There is also an [example server side](https://svelte.dev/repl/e772220feac54e65b132615ac4d8eb09).

> You can pass all Grid.js configs, refer to [Grid.js documentation](https://gridjs.io/docs/config/data) for specific configuration options.

## How to get instance?

You can use `instance` and bind it with state, you can check the example [here](https://svelte.dev/repl/c779df2be3d64008b3b83fbd091df429?version=3.38.0) or you can see tutorial for how to [bindings component](https://svelte.dev/tutorial/component-bindings).

``` diff html
<script>
  import Grid from "gridjs-svelte"

+  let grid

  const data = [
    { name: "John", email: "john@example.com" },
    { name: "Mark", email: "mark@gmail.com" },
  ]
</script>

- <Grid {data} />
+ <Grid bind:instance={grid} {data} />

<style global>
  @import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";
</style>
```

## How to add plugin?

> [Try it out in the browser](https://svelte.dev/repl/9a066ccf55f54173bf5c6c8042142566?version=3.38.0)

1. Write a plugin, you can see how to write the plugin on [plugin basic](https://gridjs.io/docs/plugin/writing-plugin) section.
2. [Get an instance of Grid.js](https://gridjs.io/docs/integrations/svelte#how-to-get-instance), so you can add plugins to Grid.js, you can use [`grid.plugin.add`](https://gridjs.io/docs/plugin/basics#adding-a-plugin) for adding it.
3. the last step is you need to re-render Grid.js so that the plugin can appear, you can use [`grid.forceRender`](https://gridjs.io/docs/examples/force-render).

> NOTE: if you want to create an advanced plugin, you need to know [React](https://reactjs.org) because Grid.js uses [preact](https://preactjs.com) (an alternative React). If you need help to create an advanced plugin, you can open [discussions](https://github.com/iamyuu/gridjs-svelte/discussions/new) maybe I can help.

## Contributing

**PRs are welcome!**
You noticed a bug, a possible improvement or whatever?
Any help is always appreciated, so don't hesitate opening one!

### Get started (Devs)

```bash
git clone https://github.com/iamyuu/gridjs-svelte
cd gridjs-svelte
yarn
yarn storybook
```

### Running the tests

```bash
yarn test
```
