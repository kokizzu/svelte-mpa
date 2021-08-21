/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface PopoverButtonProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["button"]> {}

export default class PopoverButton extends SvelteComponentTyped<
  PopoverButtonProps,
  { click: CustomEvent<{ nativeEvent: MouseEvent }> },
  { default: {} }
> {}
