/**
 * An action to set up arbitrary event listeners dynamically.
 * @param {Element} node
 * @param {Array<{ name: string; handler: EventListenerOrEventListenerObject }>} args The event listeners to be registered
 * @returns {{ destroy: () => void }}
 */
export default function events(node: Element, args: Array<{
    name: string;
    handler: EventListenerOrEventListenerObject;
}>): {
    destroy: () => void;
};
//# sourceMappingURL=events.d.ts.map