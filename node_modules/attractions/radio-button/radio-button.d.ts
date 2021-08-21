/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface RadioButtonProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["input"]> {
  /**
   * A class string to assign to the `<input>` element.
   * @default null
   */
  inputClass?: string | false | null;

  /**
   * A class string to add to the selector circle.
   * @default null
   */
  selectorClass?: string | false | null;

  /**
   * A CSS style string to assign to the selector circle.
   * Can be used to make the radio button represent a color (in conjunction with the `getColorPickerStyles` utility).
   * @default null
   */
  selectorStyle?: string | null;

  /**
   * The value assigned to the radio button input. Check [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#Value) for more information.
   */
  value?: string;

  /**
   * Disables the radio button.
   * @default false
   */
  disabled?: boolean;

  /**
   * The value of the currently selected radio button in the `name` group.
   * Similar to Svelte's `bind:group` binding on native radio buttons.
   * @default null
   */
  group?: string | null;

  /**
   * Places the default slot (label) to the left of the radio button.
   * @default false
   */
  slotLeft?: boolean;

  /**
   * Adds a tooltip to the radio button.
   * @default null
   */
  title?: string | null;
}

export default class RadioButton extends SvelteComponentTyped<
  RadioButtonProps,
  { change: CustomEvent<{ value: string; nativeEvent: Event }> },
  { default: {} }
> {}
