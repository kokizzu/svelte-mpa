/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface DotProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Applies the `$info` color to the dot.
   * @default false
   */
  info?: boolean;

  /**
   * Applies the `$attention` color to the dot.
   * @default false
   */
  attention?: boolean;

  /**
   * Applies the `$danger` color to the dot.
   * @default false
   */
  danger?: boolean;

  /**
   * Applies the `$success` color to the dot.
   * @default false
   */
  success?: boolean;

  /**
   * Decreases the size of the dot.
   * @default false
   */
  small?: boolean;
}

export default class Dot extends SvelteComponentTyped<DotProps, {}, {}> {}
