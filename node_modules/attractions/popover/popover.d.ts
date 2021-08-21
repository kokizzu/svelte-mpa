/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export type PopoverPositions = typeof import("./popover-positions").default;

export interface PopoverProps {
  /**
   * A class string to add to the popover.
   * @default null
   */
  popoverClass?: string | false | null;

  /**
   * The position of the popover content relative to the triggering handle.
   */
  position?: PopoverPositions[keyof PopoverPositions];
}

export default class Popover extends SvelteComponentTyped<
  PopoverProps,
  {},
  { default: {}; ["popover-content"]: {} }
> {}
