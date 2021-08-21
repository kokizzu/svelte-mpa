/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface FileDropzoneProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["input"]> {
  /**
   * The user's selection as an array of [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) objects.
   * Note: this is an actual `Array`, not a `FileList`, as opposed to the native `<input type="file">`.
   * @default []
   */
  files?: File[];

  /**
   * The component used to render a selected file.
   * Receives a single prop: `file`, the [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) object.
   * Expected to dispatch `delete` events to delete this file from the selection with the `file` prop as the detail.
   */
  fileComponent?: SvelteComponentTyped<
    { file: File },
    { delete: CustomEvent<File> }
  >;

  /**
   * Limits the allowed files to particular types. For guidelines on the value of the attribute, consult the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept).
   * @default null
   */
  accept?: string | null;

  /**
   * A callback to call for each file that passes the `accept` check before it is added to the `files`.
   * If it returns a Promise, they will be started for every file in parallel and awaited together at the end.
   * @default null
   */
  beforeChange?: ((file: File) => void | Promise<void>) | null;

  /**
   * Whether the input should accept files.
   * @default false
   */
  disabled?: boolean;

  /**
   * The maximum amount of files that the user can upload.
   */
  max?: number;
}

export default class FileDropzone extends SvelteComponentTyped<
  FileDropzoneProps,
  { change: CustomEvent<{ files: File[]; nativeEvent?: Event }> },
  {
    ["empty-layer"]: { wrongType: boolean; dragActive: boolean };
    ["more-icon"]: {};
  }
> {}
