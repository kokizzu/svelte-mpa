/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface TabsProps {
  /**
   * A class string to pass to each `<Tab>` component.
   * @default null
   */
  tabClass?: string | false | null;

  /**
   * The currently selected tab.
   * @default null
   */
  value?: string | null;

  /**
   * An array of strings that act as the labels of the tabs.
   */
  items?: string[];

  /**
   * The name passed to each of the underlying `<Tab>`s, which in turn becomes assigned to the `<input type="radio">`s' [name attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  name?: string;
}

export default class Tabs extends SvelteComponentTyped<
  TabsProps,
  { change: CustomEvent<{ value: string; nativeEvent: Event }> },
  {}
> {}
