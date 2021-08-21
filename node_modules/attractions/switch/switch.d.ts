/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface SwitchProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["input"]> {
  /**
   * A class string to add to the `<input>` inside.
   * @default null
   */
  inputClass?: string | false | null;

  /**
   * A class string to add to the [track](https://material.io/components/selection-controls#switches) of the switch.
   * @default null
   */
  trackClass?: string | false | null;

  /**
   * A class string to add to the [thumb](https://material.io/components/selection-controls#switches) of the switch.
   * @default null
   */
  thumbClass?: string | false | null;

  /**
   * Whether the switch is currently on.
   * @default false
   */
  value?: boolean;

  /**
   * Disables the switch.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to place the default slot to the left of the switch or to the right.
   * @default false
   */
  slotLeft?: boolean;
}

export default class Switch extends SvelteComponentTyped<
  SwitchProps,
  { change: CustomEvent<{ value: boolean; nativeEvent: Event }> },
  { default: {} }
> {}
