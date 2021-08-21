/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface RadioChipProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["input"]> {
  /**
   * A class string to add to the `<input>` element.
   * @default null
   */
  inputClass?: string | false | null;

  /**
   * A class string to add to the underlying <Chip> component.
   * @default null
   */
  chipClass?: string | false | null;

  /**
   * The value of this radio button. Included in events and can be bound to using `bind:group`.
   */
  value?: string;

  /**
   * The name of the group to relate this radio chip to. Check [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname) for more information.
   */
  name?: string;

  /**
   * Disables the chip and disallows selection.
   * @default false
   */
  disabled?: boolean;

  /**
   * The currently selected value among the radio chips with the same name. Often used with a two-way binding: `bind:group`.
   * @default null
   */
  group?: string | null;

  /**
   * The tooltip to give to a chip.
   * @default null
   */
  title?: string | null;

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

export default class RadioChip extends SvelteComponentTyped<
  RadioChipProps,
  { change: CustomEvent<{ value: string; nativeEvent: Event }> },
  { default: {} }
> {}
