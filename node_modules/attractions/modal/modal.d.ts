/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface ModalProps {
  /**
   * Whether the modal is open or not.
   * @default false
   */
  open?: boolean;

  /**
   * Removes the click event listener from the overlay `<div>` to close the modal on an outside click.
   * @default false
   */
  noClickaway?: boolean;
}

export default class Modal extends SvelteComponentTyped<
  ModalProps,
  { change: CustomEvent<{ value: boolean }> },
  { default: { closeCallback: () => void } }
> {}
