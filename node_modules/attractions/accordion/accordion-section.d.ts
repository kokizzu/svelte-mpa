/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface AccordionSectionProps {
  /**
   * The label text to use on the button that toggles the section.
   * Not used if the handle slot is provided.
   * @default null
   */
  label?: string | null;

  /**
   * The state of the section: opened or closed.
   * @default false
   */
  open?: boolean;
}

export default class AccordionSection extends SvelteComponentTyped<
  AccordionSectionProps,
  {
    ["panel-open"]: CustomEvent<{ close: () => void; toggle: () => void }>;
    ["panel-close"]: CustomEvent<{ close: () => void; toggle: () => void }>;
  },
  { default: {}; handle: { toggle: () => void } }
> {}
