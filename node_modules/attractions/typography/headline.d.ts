/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface HeadlineProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {}

export default class Headline extends SvelteComponentTyped<
  HeadlineProps,
  {},
  { default: {} }
> {}
