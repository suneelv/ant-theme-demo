import { createContext, useCallback, useContext, useRef, useState } from 'react';

export interface Coverage {
    /* Token name -> DOM id of the specimen that demonstrates it. */
    anchors: Record<string, string>;
    register: (tokens: string[], id: string) => void;
}

const NOOP_COVERAGE: Coverage = { anchors: {}, register: () => undefined };

export const CoverageContext = createContext<Coverage>(NOOP_COVERAGE);

export const useCoverage = () => useContext(CoverageContext);

export interface UseCoverageRegistry {
    coverage: Coverage;
}

/* Specimens declare the tokens they demonstrate; the page collects those declarations so the
   delta table can mark which changed tokens are actually shown, and link to where.
   Declaring at the specimen keeps coverage honest — the list cannot drift from the page,
   because it IS the page. */
export const useCoverageRegistry = (): UseCoverageRegistry => {
    const [anchors, setAnchors] = useState<Record<string, string>>({});
    const anchorsRef = useRef<Record<string, string>>({});

    const register = useCallback((tokens: string[], id: string) => {
        /* First specimen to claim a token wins the anchor, so the earliest (and usually most
           prominent) demonstration is the one the table links to. */
        const added = tokens.filter((name) => !(name in anchorsRef.current));

        if (added.length === 0) return;

        added.forEach((name) => {
            anchorsRef.current[name] = id;
        });

        setAnchors({ ...anchorsRef.current });
    }, []);

    return { coverage: { anchors, register } };
};
