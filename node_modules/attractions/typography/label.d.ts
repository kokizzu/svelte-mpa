/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface LabelProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Makes the `<Label>` smaller.
   * @default false
   */
  small?: boolean;
}

export default class Label extends SvelteComponentTyped<
  LabelProps,
  {},
  { default: {} }
> {}
