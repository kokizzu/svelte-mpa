/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface DividerProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["hr"]> {
  /**
   * Adds a text to the middle of the line.
   * @default null
   */
  text?: string | null;
}

export default class Divider extends SvelteComponentTyped<
  DividerProps,
  {},
  {}
> {}
