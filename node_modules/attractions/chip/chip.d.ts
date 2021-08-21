/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface ChipProps {
  /**
   * Makes the chip smaller.
   * @default false
   */
  small?: boolean;

  /**
   * Adds a border to the chip instead of the background.
   * @default false
   */
  outline?: boolean;

  /**
   * Clears the internal padding. Useful if you want to handle spacing yourself.
   * @default false
   */
  noPadding?: boolean;
}

export default class Chip extends SvelteComponentTyped<
  ChipProps,
  {},
  { default: {} }
> {}
