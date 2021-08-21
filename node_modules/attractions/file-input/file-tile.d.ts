/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface FileTileProps {
  /**
   * The File object to display.
   */
  file?: File;
}

export default class FileTile extends SvelteComponentTyped<
  FileTileProps,
  { delete: CustomEvent<File> },
  {}
> {}
