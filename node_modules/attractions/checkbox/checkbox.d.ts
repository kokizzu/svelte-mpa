/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface CheckboxProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["input"]> {
  /**
   * A class string to assign to the `<input>` element.
   * @default null
   */
  inputClass?: string | false | null;

  /**
   * A class string to add to the selector box element.
   * @default null
   */
  selectorClass?: string | false | null;

  /**
   * A CSS style string to assign to the selector box element.
   * Can be used to make the checkbox represent a color (in conjunction with the [`getColorPickerStyles`](https://illright.github.io/attractions/docs/utilities) utility).
   * @default null
   */
  selectorStyle?: string | null;

  /**
   * Whether the checkbox is checked or not.
   * @default false
   */
  checked?: boolean;

  /**
   * The value assigned to the checkbox input. Check [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value) for more information.
   */
  value?: string;

  /**
   * Disables the checkbox, freezing its current `checked` state.
   * @default false
   */
  disabled?: boolean;

  /**
   * Places the default slot (label) to the left of the checkbox.
   * @default false
   */
  slotLeft?: boolean;

  /**
   * Makes the checkbox round (and slightly larger).
   * @default false
   */
  round?: boolean;

  /**
   * Adds a tooltip to the checkbox.
   * @default null
   */
  title?: string | null;
}

export default class Checkbox extends SvelteComponentTyped<
  CheckboxProps,
  {
    change: CustomEvent<{
      value: string;
      checked: boolean;
      nativeEvent: Event;
    }>;
  },
  { default: {} }
> {}
