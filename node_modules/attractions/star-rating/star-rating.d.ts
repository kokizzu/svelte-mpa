/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface StarRatingProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["input"]> {
  /**
   * A class string to assign to the `<label>` element containing the star icon.
   * @default null
   */
  starClass?: string | false | null;

  /**
   * How many stars to be displayed.
   * @default 5
   */
  max?: number;

  /**
   * Current amount of selected stars.
   * @default 0
   */
  value?: number;

  /**
   * The name to assign to all stars belonging to the same group. Check [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname) for more information.
   */
  name?: string;

  /**
   * Disables star selection.
   * @default false
   */
  disabled?: boolean;

  /**
   * List of handlers for the [Events](https://illright.github.io/attractions/docs/utilities) action
   * @default []
   */
  events?: Array<{ name: string; handler: (e: Event) => void }>;
}

export default class StarRating extends SvelteComponentTyped<
  StarRatingProps,
  { change: CustomEvent<{ value: number; nativeEvent: Event }> },
  { icon: {} }
> {}
