/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface CardProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Removes the internal padding for full control over the content.
   * @default false
   */
  tight?: boolean;

  /**
   * Instead of emphasizing the card with a shadow, uses an outline.
   * @default false
   */
  outline?: boolean;
}

export default class Card extends SvelteComponentTyped<
  CardProps,
  {},
  { default: {} }
> {}
