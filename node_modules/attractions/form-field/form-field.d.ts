/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface FormFieldProps {
  /**
   * A class string to add to the `<label>` containing the form field name.
   * @default null
   */
  nameClass?: string | false | null;

  /**
   * A class string to add to the help text of the form field.
   * @default null
   */
  helpClass?: string | false | null;

  /**
   * The name of the form field. Displayed prominently next to the actual field.
   * @default null
   */
  name?: string | null;

  /**
   * The subtitle text under the name providing extra guidance.
   * @default null
   */
  help?: string | null;

  /**
   * The ID to add the the `for` attribute of the `<label>` element containing the `name`.
   * Useful if you pass an ID to the actual field inside and want to connect it with the label.
   * @default null
   */
  id?: string | null;

  /**
   * Marks the form field as required, adding an asterisk to the name and text under the field indicating that the field is mandatory.
   * @default false
   */
  required?: boolean;

  /**
   * Marks the form field as optional, explicitly stating the optionality of the field in the text under the field.
   * @default false
   */
  optional?: boolean;

  /**
   * An array of error messages to display under the field. False elements are not shown.
   * @default []
   */
  errors?: Array<string | false>;
}

export default class FormField extends SvelteComponentTyped<
  FormFieldProps,
  {},
  { default: {}; description: {}; message: {} }
> {}
