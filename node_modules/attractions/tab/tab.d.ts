/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface TabProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["input"]> {
  /**
   * A class string to assign to the `<input>` element.
   * @default null
   */
  inputClass?: string | false | null;

  /**
   * A class string to add to the content of the tab.
   * @default null
   */
  contentClass?: string | false | null;

  /**
   * The value assigned to the `<input type="radio">`. Check [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#Value) for more information.
   */
  value?: string;

  /**
   * The name assigned to the `<input type="radio">`'s [name attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   * @default null
   */
  name?: string | null;

  /**
   * The `value` of the currently selected tab. Use with `bind:group`.
   * @default null
   */
  group?: string | null;

  /**
   * Disallows selecting this tab.
   * @default false
   */
  disabled?: boolean;

  /**
   * Disables the ripple on the tab when clicking on it.
   * @default false
   */
  noRipple?: boolean;
}

export default class Tab extends SvelteComponentTyped<
  TabProps,
  {
    change: CustomEvent<{ value: string; nativeEvent: Event }>;
    click: CustomEvent<{ nativeEvent: MouseEvent }>;
  },
  { default: {} }
> {}
