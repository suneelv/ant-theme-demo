import { createStyles } from 'antd-style';

/* Shared chrome for the component gallery. A section file only describes what it renders; how the
   page frames it lives here. */
export const useShowcaseStyles = createStyles(({ token, css }) => ({
    scroller: css`
        height: 100%;
        overflow-y: auto;
    `,
    /* Sticky so the colour-mode and tenant switches stay reachable from anywhere in a very long
       page — flipping one while looking at a component is the point of the gallery. */
    toolbar: css`
        position: sticky;
        top: 0;
        z-index: 10;
        padding: ${token.paddingSM}px ${token.paddingLG}px;
        background: ${token.colorBgElevated};
        border-bottom: ${token.lineWidth}px ${token.lineType} ${token.colorSplit};
        box-shadow: ${token.boxShadowTertiary};
    `,
    page: css`
        max-width: 1180px;
        margin: 0 auto;
        padding: ${token.paddingLG}px;
    `,
    group: css`
        margin-bottom: ${token.marginXL}px;
        scroll-margin-top: 80px;
    `,
    demo: css`
        scroll-margin-top: 80px;
    `,
    /* A hairline and a generous gap between variant rows: several rows in a card render the same
       component over and over, so without a rule between them it is not obvious where one variant
       ends and the next begins. The first row needs neither, hence `& + &`. */
    row: css`
        display: flex;
        align-items: flex-start;
        gap: ${token.marginXS}px;

        & + & {
            padding-top: ${token.marginLG}px;
            border-top: ${token.lineWidth}px ${token.lineType} ${token.colorSplit};
        }
    `,
    /* The label sits in its own column so every variant row in a card starts at the same x —
       scanning down the labels is how you find the variant you are after. */
    rowLabel: css`
        width: 148px;
        flex: none;
        padding-top: ${token.paddingXXS}px;
        font-size: ${token.fontSizeSM}px;
        color: ${token.colorTextTertiary};
    `,
    rowBody: css`
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: ${token.margin}px;
        min-width: 0;
        flex: 1;
    `,
    /* Wide specimens — tables, calendars, tab strips — scroll inside the card rather than widening
       it, and stack with a gap when a row holds more than one. */
    wide: css`
        display: flex;
        flex-direction: column;
        gap: ${token.marginLG}px;
        width: 100%;
        min-width: 0;
        overflow-x: auto;
    `,
    /* FloatButton is position: fixed. A transform on an ancestor makes that ancestor the containing
       block, so the demo buttons stay inside their card instead of floating over the page. */
    floatStage: css`
        position: relative;
        transform: translate(0);
        height: 260px;
        width: 100%;
        border: ${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary};
        border-radius: ${token.borderRadius}px;
        background: ${token.colorFillQuaternary};
    `,
    navLinks: css`
        display: flex;
        flex-wrap: wrap;
        gap: ${token.marginXXS}px;
    `,
}));
