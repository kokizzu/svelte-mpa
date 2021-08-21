/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface FileInputProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["input"]> {
  /**
   * A class string to add to the `<label>` element wrapping the `<input>`.
   * @default null
   */
  labelClass?: string | false | null;

  /**
   * Allows the user to select multiple files.
   * @default false
   */
  multiple?: boolean;

  /**
   * Decides if the _select a file_ and _clear selection_ buttons will be laid out in a row or a column (upload a file to see the two buttons).
   * @default false
   */
  vertical?: boolean;

  /**
   * The user's selection. If `multiple` is `false`, the value is an actual `File` object, not a one-element `FileList`, as opposed to the native `<input type="file">`.
   */
  value?: File | FileList | null;

  /**
   * Whether the input should accept files.
   * @default false
   */
  disabled?: boolean;
}

export default class FileInput extends SvelteComponentTyped<
  FileInputProps,
  { change: CustomEvent<{ value: File | FileList; nativeEvent: Event }> },
  { default: {} }
> {}
