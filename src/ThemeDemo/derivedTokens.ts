import type { GlobalToken, ThemeConfig } from 'antd';

/* Ant Design's own component formulas, evaluated against whatever control scale is in force. This
   is what each component would size itself to if theme.ts did not pin the design export's numbers
   over it — the "without the pins" column on every sizing card.

   Transcribed from each component's `prepareComponentToken` in antd 6.4. Keep them in step when
   antd is upgraded; a formula that has drifted shows up as a middle column that agrees with the
   pinned one, which is exactly the case the card is meant to expose. */

const HALF = 2;
const QUARTER = 4;
const SWITCH_TRACK_PADDING = 2;
const RATE_STAR_RATIO = 0.625;
const SPIN_DOT_SM_RATIO = 0.35;
const UPLOAD_CARD_RATIO = 2.55;
/* controlHeight has no XL step, so antd writes the large card tab as LG plus a fixed 8. */
const TABS_CARD_LG_EXTRA = 8;
const MENU_HORIZONTAL_LINE_RATIO = 1.15;

export const unpinnedMenu = (token: GlobalToken): ThemeConfig['components'] => ({
    Menu: {
        itemHeight: token.controlHeightLG,
        collapsedWidth: token.controlHeightLG * HALF,
        horizontalLineHeight: `${token.controlHeightLG * MENU_HORIZONTAL_LINE_RATIO}px`,
        iconMarginInlineEnd: token.controlHeightSM - token.fontSize,
    },
});

export const unpinnedSwitch = (token: GlobalToken): ThemeConfig['components'] => {
    const heightSM = token.controlHeight / HALF;
    const handleSizeSM = heightSM - SWITCH_TRACK_PADDING * HALF;

    return {
        Switch: {
            trackHeightSM: heightSM,
            trackMinWidthSM: handleSizeSM * HALF + SWITCH_TRACK_PADDING * HALF,
            handleSizeSM,
            innerMinMarginSM: handleSizeSM / HALF,
            innerMaxMarginSM: handleSizeSM + SWITCH_TRACK_PADDING + SWITCH_TRACK_PADDING * HALF,
        },
    };
};

export const unpinnedSlider = (token: GlobalToken): ThemeConfig['components'] => {
    const controlSize = token.controlHeightLG / QUARTER;

    return {
        Slider: {
            controlSize,
            handleSize: controlSize,
            handleSizeHover: token.controlHeightSM / HALF,
        },
    };
};

export const unpinnedRate = (token: GlobalToken): ThemeConfig['components'] => ({
    Rate: {
        starSize: token.controlHeight * RATE_STAR_RATIO,
        starSizeSM: token.controlHeightSM * RATE_STAR_RATIO,
        starSizeLG: token.controlHeightLG * RATE_STAR_RATIO,
    },
});

export const unpinnedTabs = (token: GlobalToken): ThemeConfig['components'] => ({
    Tabs: {
        cardHeight: token.controlHeightLG,
        cardHeightSM: token.controlHeight,
        cardHeightLG: token.controlHeightLG + TABS_CARD_LG_EXTRA,
    },
});

export const unpinnedSkeleton = (token: GlobalToken): ThemeConfig['components'] => ({
    Skeleton: {
        titleHeight: token.controlHeight / HALF,
        paragraphLiHeight: token.controlHeight / HALF,
    },
});

export const unpinnedTransfer = (token: GlobalToken): ThemeConfig['components'] => ({
    Transfer: {
        itemPaddingBlock: (token.controlHeight - Math.round(token.fontSize * token.lineHeight)) / HALF,
    },
});

export const unpinnedDropdown = (token: GlobalToken): ThemeConfig['components'] => ({
    Dropdown: {
        paddingBlock: (token.controlHeight - token.fontSize * token.lineHeight) / HALF,
    },
});

export const unpinnedInputNumber = (token: GlobalToken): ThemeConfig['components'] => ({
    InputNumber: {
        handleWidth: token.controlHeightSM - token.lineWidth * HALF,
        /* Not a size pin, but the same story: antd uses fontSize at every size. */
        inputFontSizeSM: token.fontSize,
    },
});

export const unpinnedDatePicker = (token: GlobalToken): ThemeConfig['components'] => {
    const inset = Math.max(token.paddingXXS, token.lineWidth) * HALF;

    return {
        DatePicker: {
            multipleItemHeight: token.controlHeight - inset,
            multipleItemHeightSM: token.controlHeightSM - inset,
            multipleItemHeightLG: token.controlHeightLG - inset,
        },
    };
};

export const unpinnedSteps =(token: GlobalToken): ThemeConfig['components'] => ({
    Steps: {
        dotSize: token.controlHeight / QUARTER,
        dotCurrentSize: token.controlHeightLG / QUARTER,
    },
});

export const unpinnedSpin = (token: GlobalToken): ThemeConfig['components'] => ({
    Spin: {
        dotSize: token.controlHeightLG / HALF,
        dotSizeSM: token.controlHeightLG * SPIN_DOT_SM_RATIO,
    },
});

export const unpinnedUpload = (token: GlobalToken): ThemeConfig['components'] => ({
    Upload: {
        pictureCardSize: token.controlHeightLG * UPLOAD_CARD_RATIO,
    },
});
