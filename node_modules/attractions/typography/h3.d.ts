/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface H3Props
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["h3"]> {}

export default class H3 extends SvelteComponentTyped<
  H3Props,
  {},
  { default: {} }
> {}
