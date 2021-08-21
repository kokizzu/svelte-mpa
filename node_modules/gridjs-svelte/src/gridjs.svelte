<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { Grid } from "gridjs";
  import type { Language } from "gridjs/dist/src/i18n/language";
  import type { ServerStorageOptions } from "gridjs/dist/src/storage/server";
  import type { SearchConfig } from "gridjs/dist/src/view/plugin/search/search";
  import type { GenericSortConfig } from "gridjs/dist/src/view/plugin/sort/sort";
  import type { PaginationConfig } from "gridjs/dist/src/view/plugin/pagination";
  import type {
    CSSDeclaration,
    OneDArray,
    TData,
    TColumn,
  } from "gridjs/dist/src/types";

  let node: Element;

  const dispatch = createEventDispatcher();

  export let width: string = "100%";
  export let height: string = "auto";
  export let autoWidth: boolean = true;
  export let fixedHeader: boolean = false;
  export let resizable: boolean = false;
  export let from: HTMLElement = undefined;
  export let language: Language = undefined;
  export let search: SearchConfig | boolean = false;
  export let sort: GenericSortConfig | boolean = false;
  export let pagination: PaginationConfig | boolean = false;
  export let server: ServerStorageOptions = undefined;
  export let columns: OneDArray<TColumn | string> = undefined;
  export let data: TData | (() => TData) | (() => Promise<TData>) = undefined;
  export let style: Partial<{
    table: CSSDeclaration;
    td: CSSDeclaration;
    th: CSSDeclaration;
    container: CSSDeclaration;
    header: CSSDeclaration;
    footer: CSSDeclaration;
  }> = {};
  export let className: Partial<{
    table: string;
    th: string;
    thead: string;
    tbody: string;
    td: string;
    container: string;
    footer: string;
    header: string;
    search: string;
    sort: string;
    pagination: string;
    paginationSummary: string;
    paginationButton: string;
    paginationButtonNext: string;
    paginationButtonCurrent: string;
    paginationButtonPrev: string;
    loading: string;
    notfound: string;
    error: string;
  }> = {};

  export const instance = new Grid({
    from,
    data,
    columns,
    server,
    search,
    sort,
    pagination,
    language,
    width,
    height,
    autoWidth,
    fixedHeader,
    style,
    className,
    resizable,
  });

  instance.on('cellClick', (...args) => dispatch('cellClick', {...args}))
  instance.on('rowClick', (...args) => dispatch('rowClick', {...args}))
  instance.on('beforeLoad', (...args) => dispatch('beforeLoad', {...args}))
  instance.on('load', (...args) => dispatch('load', {...args}))
  instance.on('ready', (...args) => dispatch('ready', {...args}))

  onMount(() => {
    if (node) {
      instance.render(node);
    }
  });
</script>

<article bind:this={node} />
