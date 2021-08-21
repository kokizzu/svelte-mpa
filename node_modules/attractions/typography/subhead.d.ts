/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface SubheadProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {}

export default class Subhead extends SvelteComponentTyped<
  SubheadProps,
  {},
  { default: {} }
> {}
