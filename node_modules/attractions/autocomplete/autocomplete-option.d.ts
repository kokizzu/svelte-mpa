/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface Option {
  name: string;
  details?: string;
}

export interface AutocompleteOptionProps {
  /**
   * The option data to render.
   */
  option?: Option;

  /**
   * The substring to seek out and highlight among the name and the details.
   * @default null
   */
  query?: string | null;
}

export default class AutocompleteOption extends SvelteComponentTyped<
  AutocompleteOptionProps,
  { click: CustomEvent<{ nativeEvent: MouseEvent }> },
  {}
> {}
