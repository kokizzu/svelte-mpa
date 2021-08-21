/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface SnackbarProps {
  /**
   * A class string to add to the label of the snackbar.
   * @default null
   */
  textClass?: string | false | null;

  /**
   * A class string to add to the action button of the snackbar.
   * @default null
   */
  buttonClass?: string | false | null;

  /**
   * The text to show on the snackbar.
   */
  text?: string;

  /**
   * The action for the button on the snackbar. If this is null, the button is not rendered. Otherwise it has text as a label and calls callback on click.
   * @default null
   */
  action?: { text: string; callback: () => void } | null;

  /**
   * Whether to call the `closeCallback` when an action button is pressed, after its callback.
   * @default true
   */
  closeOnAction?: boolean;

  /**
   * The callback to call to close the snackbar in the `SnackbarContainer`.
   * Passed internally by the `SnackbarContainer` when using the `showSnackbar` function.
   */
  closeCallback?: () => void;

  /**
   * The transition to use to animate the in and out of the snackbar.
   */
  transition?: (...args: any[]) => import("svelte/transition").TransitionConfig;

  /**
   * The options to use with the given transition.
   * @default { x: -20, duration: 150 }
   */
  transitionOptions?: any;
}

export default class Snackbar extends SvelteComponentTyped<
  SnackbarProps,
  {},
  {}
> {}
