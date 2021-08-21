/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface H2Props
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["h2"]> {}

export default class H2 extends SvelteComponentTyped<
  H2Props,
  {},
  { default: {} }
> {}
