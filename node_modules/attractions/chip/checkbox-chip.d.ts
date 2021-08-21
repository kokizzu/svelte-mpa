/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface CheckboxChipProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["input"]> {
  /**
   * A class string to add to the `<input>` element.
   * @default null
   */
  inputClass?: string | false | null;

  /**
   * A class string to add to the underlying `<Chip>` component.
   * @default null
   */
  chipClass?: string | false | null;

  /**
   * Whether the chip is selected or not.
   * @default false
   */
  checked?: boolean;

  /**
   * The value of this checkbox. Check [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value) for more information.
   */
  value?: string;

  /**
   * The name of the group to relate this checkbox chip to. Check [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname) for more information.
   */
  name?: string;

  /**
   * Disables the chip and disallows selection.
   * @default false
   */
  disabled?: boolean;

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

export default class CheckboxChip extends SvelteComponentTyped<
  CheckboxChipProps,
  {
    change: CustomEvent<{
      value: string;
      checked: boolean;
      nativeEvent: Event;
    }>;
  },
  { default: {} }
> {}
