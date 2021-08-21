/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface PaginationProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["nav"]> {
  /**
   * The amount of pages to allow for navigation.
   */
  pages?: number;

  /**
   * The currently selected page (starting from 1).
   * @default 1
   */
  currentPage?: number;

  /**
   * Whether the pagination component should be displayed when there's only one page.
   * @default true
   */
  showLonePage?: boolean;
}

export default class Pagination extends SvelteComponentTyped<
  PaginationProps,
  { change: CustomEvent<{ value: number }> },
  {}
> {}
