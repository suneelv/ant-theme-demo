import { useCallback, useEffect, useRef, useState } from 'react';

/* Sizes land on fractional pixels once a metric is derived from a line-height or a multiplier, so
   keep a decimal rather than rounding the evidence away. */
const DECIMALS = 10;

interface Size {
    width: number;
    height: number;
}

interface UseMeasuredSize {
    measure: (node: HTMLElement | null) => void;
    size: Size | null;
}

const round = (value: number) => Math.round(value * DECIMALS) / DECIMALS;

/* Reports the rendered size of an element, or of the first descendant matching `selector`.
   Ant Design's component tokens never reach useToken() — it exposes the global alias token only —
   so measuring what the browser laid out is the only way a specimen can report them honestly. */
export const useMeasuredSize = (selector?: string): UseMeasuredSize => {
    const [size, setSize] = useState<Size | null>(null);
    const resizeRef = useRef<ResizeObserver | null>(null);
    const mutationRef = useRef<MutationObserver | null>(null);
    /* The observers fire on every layout pass, and an unconditional setState from a ref callback
       re-attaches the ref and measures again — React caps that as an update-depth error. Only
       publish a size that actually changed. */
    const lastRef = useRef<Size | null>(null);

    const publish = useCallback((next: Size | null) => {
        const last = lastRef.current;

        if (last === next || (last && next && last.width === next.width && last.height === next.height)) return;

        lastRef.current = next;
        setSize(next);
    }, []);

    useEffect(
        () => () => {
            resizeRef.current?.disconnect();
            mutationRef.current?.disconnect();
        },
        [],
    );

    const measure = useCallback(
        (node: HTMLElement | null) => {
            resizeRef.current?.disconnect();
            mutationRef.current?.disconnect();

            if (!node) {
                resizeRef.current = null;
                mutationRef.current = null;

                return;
            }

            const resolve = () => (selector ? node.querySelector<HTMLElement>(selector) : node);

            const attach = () => {
                const target = resolve();

                resizeRef.current?.disconnect();

                if (!target) {
                    publish(null);

                    return;
                }

                const read = () => {
                    const box = target.getBoundingClientRect();

                    publish({ width: round(box.width), height: round(box.height) });
                };

                read();

                /* Fonts and the theme both land after the first paint, and each changes the answer. */
                const observer = new ResizeObserver(read);

                observer.observe(target);
                resizeRef.current = observer;
            };

            attach();

            /* A selected descendant can arrive or be replaced after mount, so re-resolve on any
               change beneath the probe. */
            if (selector) {
                const watcher = new MutationObserver(attach);

                watcher.observe(node, { childList: true, subtree: true });
                mutationRef.current = watcher;
            }
        },
        [publish, selector],
    );

    return { measure, size };
};
