/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface H1Props
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["h1"]> {}

export default class H1 extends SvelteComponentTyped<
  H1Props,
  {},
  { default: {} }
> {}
