/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface DialogProps {
  /**
   * Adds a title to the dialog.
   * @default null
   */
  titleClass?: string | false | null;

  /**
   * Applies the danger color to the title (including the icon slot if it is stylable with the CSS `color` property).
   * @default false
   */
  danger?: boolean;

  /**
   * Adds a close button to the dialog and calls this function when it is clicked.
   * @default null
   */
  closeCallback?:
    | ((e: CustomEvent<{ nativeEvent: MouseEvent }>) => void)
    | null;

  /**
   * Adds a title to the dialog.
   * @default null
   */
  title?: string | null;

  /**
   * Gives the dialog a `max-width` of `30em`.
   * @default false
   */
  constrainWidth?: boolean;
}

export default class Dialog extends SvelteComponentTyped<
  DialogProps,
  {},
  { default: {}; ["close-icon"]: {}; ["title-icon"]: {} }
> {}
