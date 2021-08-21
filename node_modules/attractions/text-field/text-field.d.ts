/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface TextFieldProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["textarea"]>,
    svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["input"]> {
  /**
   * A class string to assign to the `<input>` or `<textarea>` element.
   * @default null
   */
  inputClass?: string | false | null;

  /**
   * A class string to assign to the `<label>` for the outline text fields.
   * @default null
   */
  labelClass?: string | false | null;

  /**
   * A class string to add to the error message under the text field.
   * @default null
   */
  errorClass?: string | false | null;

  /**
   * Whether the text field should have outline styling.
   * @default false
   */
  outline?: boolean;

  /**
   * Whether there will be something permanent inside the field like an icon.
   * By default, this item is placed to the left of the input area.
   * @default false
   */
  withItem?: boolean;

  /**
   * Whether the item should be placed to the right of the input area.
   * @default false
   */
  itemRight?: boolean;

  /**
   * The ID to assign to the input.
   * @default null
   */
  id?: string | null;

  /**
   * Whether to hide the spinner (arrow buttons inside `<input type="number">`).
   * @default false
   */
  noSpinner?: boolean;

  /**
   * The label to show above the text field. Only works with `outline` text fields.
   * @default null
   */
  label?: string | null;

  /**
   * The error message to show under the text field.
   * @default null
   */
  error?: string | false | null;

  /**
   * Whether the text field should allow multiple lines (`<textarea>` will be used instead of the `<input>`).
   * @default false
   */
  multiline?: boolean;

  /**
   * Whether the field should be focused on mount.
   * @default false
   */
  autofocus?: boolean;

  /**
   * The current value of the text field. Converted to a number if `type="number"`.
   * @default null
   */
  value?: string | number | null;

  /**
   * List of handlers for the [Events](https://illright.github.io/attractions/docs/utilities) action.
   * @default []
   */
  events?: Array<{ name: string; handler: (e: Event) => void }>;
}

export default class TextField extends SvelteComponentTyped<
  TextFieldProps,
  {
    input: CustomEvent<{ value: string | number | null; nativeEvent: Event }>;
    change: CustomEvent<{ value: string | number | null; nativeEvent: Event }>;
    focus: CustomEvent<{ nativeEvent: FocusEvent }>;
    keydown: CustomEvent<{ nativeEvent: KeyboardEvent }>;
    blur: CustomEvent<{ nativeEvent: FocusEvent }>;
  },
  { default: {}; error: {} }
> {}
