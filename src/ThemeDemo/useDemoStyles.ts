import { createStyles } from 'antd-style';

/* Shared chrome for every ThemeDemo section. Kept in one place so a section file only ever
   describes what it demonstrates, never how the page frames it. */
export const useDemoStyles = createStyles(({ token, css }) => ({
    page: css`
        max-width: 1180px;
        margin: 0 auto;
        padding: ${token.paddingLG}px;
    `,
    scroller: css`
        height: 100%;
        overflow-y: auto;
    `,
    /* Sticky so the theme toggle stays reachable from anywhere in a very long page — flipping it
       while looking at one component is the whole point of the comparison. */
    toolbar: css`
        position: sticky;
        top: 0;
        z-index: 10;
        padding: ${token.paddingSM}px ${token.paddingLG}px;
        background: ${token.colorBgElevated};
        border-bottom: ${token.lineWidth}px ${token.lineType} ${token.colorSplit};
        box-shadow: ${token.boxShadowTertiary};
    `,
    section: css`
        margin-bottom: ${token.marginXL}px;
        scroll-margin-top: 80px;
    `,
    specimen: css`
        scroll-margin-top: 80px;
    `,
    specimenTokens: css`
        display: flex;
        flex-wrap: wrap;
        gap: ${token.marginXXS}px;
        margin-bottom: ${token.marginXS}px;
    `,
    swatchRow: css`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: ${token.marginXS}px;
    `,
    swatch: css`
        display: flex;
        align-items: center;
        gap: ${token.marginXS}px;
        padding: ${token.paddingXXS}px ${token.paddingXS}px;
        border: ${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary};
        border-radius: ${token.borderRadius}px;
    `,
    chip: css`
        width: 34px;
        height: 34px;
        flex: none;
        border-radius: ${token.borderRadiusSM}px;
        border: ${token.lineWidth}px ${token.lineType} ${token.colorSplit};
    `,
    /* A checkerboard makes the alpha in the muted text tones visible. */
    alphaChip: css`
        background-image:
            linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%);
        background-size: 10px 10px;
        background-position:
            0 0,
            0 5px,
            5px -5px,
            -5px 0;
    `,
    mono: css`
        font-family: ${token.fontFamilyCode};
        font-size: ${token.fontSizeSM}px;
        color: ${token.colorTextTertiary};
    `,
    /* Two themes abreast: every specimen on the page is a comparison, so this is the default
       shape. Stacks on a narrow viewport rather than squeezing both columns. */
    compareGrid: css`
        display: grid;
        grid-template-columns: 1fr;
        gap: ${token.margin}px;

        @media (min-width: 900px) {
            grid-template-columns: 1fr 1fr;
        }
    `,
    /* Three themes abreast on a wide screen; wraps rather than squeezing the columns. */
    compareTrio: css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 270px), 1fr));
        gap: ${token.margin}px;
    `,
    /* min-width:0 so a wide child (a table, a long control row) scrolls inside its column instead
       of forcing the grid track wider than its share. */
    compareColumn: css`
        display: flex;
        flex-direction: column;
        gap: ${token.marginXS}px;
        min-width: 0;
        overflow-x: auto;
        padding: ${token.paddingSM}px;
        border: ${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary};
        border-radius: ${token.borderRadius}px;
        background: ${token.colorBgContainer};
        color: ${token.colorText};
    `,
    metricRow: css`
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: ${token.marginXS}px;
    `,
    metricLabel: css`
        width: 56px;
        flex: none;
        font-size: ${token.fontSizeSM}px;
    `,
    /* The probe wraps the control so the observer measures the control itself, not a flex track
       that has already been stretched to its row. */
    metricProbe: css`
        display: inline-flex;
    `,
    metricBad: css`
        color: ${token.colorError};
    `,
    /* Rules the eye against, so the taller controls are obviously taller. */
    ruler: css`
        position: relative;
        padding: ${token.paddingSM}px;
        border-radius: ${token.borderRadius}px;
        background-image: repeating-linear-gradient(
            to bottom,
            ${token.colorFillQuaternary} 0,
            ${token.colorFillQuaternary} 1px,
            transparent 1px,
            transparent 8px
        );
    `,
    tileGrid: css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: ${token.marginXS}px;
    `,
    /* A bare button so the tile is keyboard reachable and reports :focus-visible like a control. */
    tile: css`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 52px;
        padding: ${token.paddingXS}px;
        font-family: inherit;
        font-size: ${token.fontSizeSM}px;
        font-weight: ${token.fontWeightStrong};
        cursor: pointer;
        user-select: none;
        transition: none;
    `,
    tileReadout: css`
        margin-top: ${token.marginXXS}px;
        display: flex;
        align-items: baseline;
        gap: ${token.marginXXS}px;
        font-family: ${token.fontFamilyCode};
        font-size: ${token.fontSizeSM}px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `,
    menuBox: css`
        width: 260px;
        border: ${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary};
        border-radius: ${token.borderRadiusLG}px;
        overflow: hidden;
    `,
    /* The sample paints its own background and colour inline; this only gives the text room to be
       judged as text, at the size body copy actually renders. */
    contrastSample: css`
        padding: ${token.paddingXS}px ${token.paddingSM}px;
        border-radius: ${token.borderRadius}px;
        font-size: ${token.fontSize}px;
        line-height: ${token.lineHeight};
        white-space: nowrap;
    `,
    deltaValue: css`
        font-family: ${token.fontFamilyCode};
        font-size: ${token.fontSizeSM}px;
    `,
    deltaSwatch: css`
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-inline-end: ${token.marginXXS}px;
        vertical-align: -1px;
        border-radius: 2px;
        border: ${token.lineWidth}px ${token.lineType} ${token.colorSplit};
    `,
}));
