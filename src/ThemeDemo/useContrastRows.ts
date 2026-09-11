import { theme } from 'antd';
import { compositeOn, contrastRatio } from './contrast';

export interface ContrastRow {
    name: string;
    /* The raw token value, alpha and all — what a component actually sets as its colour. */
    value: string;
    plainRatio: number;
    tintedRatio: number;
}

interface UseContrastRows {
    rows: ContrastRow[];
    /* Both surfaces as opaque hexes, so a caller can paint a sample with the same colour the ratio
       was measured against and name it in a column header. */
    plain: string;
    tinted: string;
    /* The raw colorFillQuaternary token behind `tinted`, for a header that shows its work. */
    tintedSource: string;
}

/* Reads the two surfaces once rather than per row: the ratios are only comparable if every row was
   measured against the same pair. */
export const useContrastRows = (tokens: string[]): UseContrastRows => {
    const { token } = theme.useToken();
    const read = token as unknown as Record<string, string>;

    /* colorBgContainer is opaque (#ffffff in light mode); colorFillQuaternary is not, so it is
       composited onto the container before anything is measured against it. */
    const plain = token.colorBgContainer;
    const tinted = compositeOn(token.colorFillQuaternary, plain);

    const rows = tokens.map((name) => {
        const value = read[name];

        return {
            name,
            value,
            plainRatio: contrastRatio(value, plain),
            tintedRatio: contrastRatio(value, tinted),
        };
    });

    return { rows, plain, tinted, tintedSource: token.colorFillQuaternary };
};
