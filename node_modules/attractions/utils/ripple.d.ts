/**
 * Create a ripple action
 * @typedef {{ event?: string; transition?: number; zIndex?: string; rippleColor?: string; disabled?: boolean }} Options
 * @param {Element} node
 * @param {Options} [options={}]
 * @returns {{ destroy: () => void; update: (options?: Options) => void }}
 */
export default function ripple(node: Element, options?: Options | undefined): {
    destroy: () => void;
    update: (options?: Options | undefined) => void;
};
/**
 * Create a ripple action
 */
export type Options = {
    event?: string;
    transition?: number;
    zIndex?: string;
    rippleColor?: string;
    disabled?: boolean;
};
//# sourceMappingURL=ripple.d.ts.map