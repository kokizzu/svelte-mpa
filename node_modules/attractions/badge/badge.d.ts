/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface BadgeProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Whether the badge is shown or hidden. Useful for controlling its appearance without modifying the DOM tree.
   * @default false
   */
  hidden?: boolean;
}

export default class Badge extends SvelteComponentTyped<
  BadgeProps,
  {},
  { default: {} }
> {}
