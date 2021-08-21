/**
 * @typedef {{ delay: number; duration: number; css: () => string }} Transition
 */
/**
 * Create a transition that allows specifying a transition programmatically
 *  or disable it altogether.
 * @template T
 * @param {Element} node
 * @param {{ transition: (node: Element; options: T) => Transition; options: T }} options
 * @returns {Transition}
 */
export default function dynamic<T>(node: Element, { transition, options }: {
    transition: (node: Element, options: T) => Transition;
    options: T;
}): Transition;
export type Transition = {
    delay: number;
    duration: number;
    css: () => string;
};
//# sourceMappingURL=dynamic-transition.d.ts.map