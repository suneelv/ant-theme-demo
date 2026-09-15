import { theme as antdTheme } from 'antd';
import type { MappingAlgorithm, ThemeConfig } from 'antd';
import { FastColor } from '@ant-design/fast-color';
import { ColorMode, type ColorSchema, type ResolvedColorMode } from './theme.types';

export const WHITE = '#ffffff';

export const BLACK = '#000000';

const { darkAlgorithm, defaultAlgorithm, getDesignToken } = antdTheme;

const DARK_HEADER_BG = getDesignToken({ algorithm: darkAlgorithm }).colorBgContainer;

const colorWithAlpha = (color: string, alpha: number) => new FastColor(color).setA(alpha).toRgbString();

/* ============================================== Palette — start =============================================== */

/* Brand teal scale — Ant Design 10-step palette. */
const teal = {
    1: '#e6f6f6',
    2: '#cceeed',
    3: '#99dcdb',
    4: '#66cac9',
    5: '#33b9b7',
    6: '#008188',
    7: '#006a70',
    8: '#005258',
    9: '#003940',
    10: '#002628',
} as const;

/* Dark-mode teal scale — the light scale mirrored about stop 6, with a new darkest stop at 1.
   darkTeal[n] === teal[12 - n] for stops 2-10; teal[1] has no dark counterpart. */
const darkTeal = {
    1: '#001718',
    2: teal[10],
    3: teal[9],
    4: teal[8],
    5: teal[7],
    6: teal[6],
    7: teal[5],
    8: teal[4],
    9: teal[3],
    10: teal[2],
} as const;

/* Named by strength, not mode: dark uses both. ANT derives these per hue, landing at 0.1-0.3. */
const OUTLINE_ALPHA = {
    standard: 0.66,
    strong: 0.88,
} as const;

/* ANT Defaults: 0.45/0.25 in both modes */
const MUTED_ALPHA = {
    light: { tertiary: 0.56, quaternary: 0.54 },
    dark: { tertiary: 0.58, quaternary: 0.53 },
} as const;

const SPLIT_ALPHA = 0.06;

const buildMutedText = (
    textBase: string,
    alpha: (typeof MUTED_ALPHA)[keyof typeof MUTED_ALPHA],
): ThemeConfig['token'] => ({
    colorTextTertiary: colorWithAlpha(textBase, alpha.tertiary),
    colorTextQuaternary: colorWithAlpha(textBase, alpha.quaternary),
});

/* Brand semantic colors — mirrors ui-toolkit/styles/redesign-variables.scss. */
export const brand = {
    blue: '#005295',
    teal: teal[6],
} as const;

/* Status ramps — from the design token export (design-tokens/light.json).
   Each status resolves to four stops: a tint background, a hover tint, the base tone
   (border + text) and a deep tone (hover/active/pressed). Supersedes the earlier
   decision to inherit antd's status defaults. */
const status = {
    success: { bg: '#dbf6ed', bgHover: '#6cd0ae', base: '#049967', deep: '#04724d' },
    warning: { bg: '#fff6d9', bgHover: '#ffc44b', base: '#c78600', deep: '#754f03' },
    error: { bg: '#ffe5e5', bgHover: '#f19191', base: '#eb1212', deep: '#ae0808' },
    info: { bg: '#e5f2ff', bgHover: '#c7e0f9', base: '#0879e2', deep: brand.blue },
} as const;

/* ======================================= Sizing and typography — start ======================================== */

const FONT_FAMILY = "'Google Sans Flex', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
const LINE_WIDTH_FOCUS = 4;

/* Controls run one step taller than antd's defaults (32/40/24/16). */
const CONTROL_HEIGHT = 40;
const CONTROL_HEIGHT_LG = 48;
const CONTROL_HEIGHT_SM = 32;
const CONTROL_HEIGHT_XS = 24;

const CONTROL_INTERACTIVE_SIZE = 16;

const TAG_PILL_RADIUS = 999999;

const HEADER_HEIGHT = 48;
const HEADER_PADDING_INLINE = 4;

/* Figma: Menu / Navigation Item — Components/Menu/Component/* */
const MENU_ICON_GAP = 10;
const MENU_ITEM_RADIUS = 8;

/* =========================================== Global tokens — start ============================================ */

const baseToken: ThemeConfig['token'] = {
    fontFamily: FONT_FAMILY,
    lineWidthFocus: LINE_WIDTH_FOCUS,

    controlHeight: CONTROL_HEIGHT,
    controlHeightLG: CONTROL_HEIGHT_LG,
    controlHeightSM: CONTROL_HEIGHT_SM,
    controlHeightXS: CONTROL_HEIGHT_XS,
    controlInteractiveSize: CONTROL_INTERACTIVE_SIZE,
};

/* Light-mode tokens are independent of tenant theming. 
   These will be shared across default theme and tenant theme
*/
const sharedLightToken: ThemeConfig['token'] = {
    colorBgLayout: WHITE,

    ...buildMutedText(BLACK, MUTED_ALPHA.light),
    colorSplit: colorWithAlpha(BLACK, SPLIT_ALPHA),

    colorSuccess: status.success.base,
    colorWarning: status.warning.base,
    colorError: status.error.base,
    colorInfo: status.info.base,

    colorSuccessBg: status.success.bg,
    colorSuccessBgHover: status.success.bgHover,
    colorSuccessBorder: status.success.base,
    colorSuccessBorderHover: status.success.deep,
    colorSuccessHover: status.success.deep,
    colorSuccessActive: status.success.deep,
    colorSuccessTextHover: status.success.deep,
    colorSuccessTextActive: status.success.deep,

    colorWarningBg: status.warning.bg,
    colorWarningBgHover: status.warning.bgHover,
    colorWarningBorder: status.warning.base,
    colorWarningBorderHover: status.warning.deep,
    colorWarningHover: status.warning.deep,
    colorWarningActive: status.warning.deep,
    colorWarningTextHover: status.warning.deep,
    colorWarningTextActive: status.warning.deep,
    colorWarningOutline: colorWithAlpha(status.warning.bgHover, OUTLINE_ALPHA.standard),

    colorErrorBg: status.error.bg,
    colorErrorBgHover: status.error.bgHover,
    colorErrorBorder: status.error.base,
    colorErrorBorderHover: status.error.deep,
    colorErrorHover: status.error.deep,
    colorErrorActive: status.error.deep,
    colorErrorTextHover: status.error.deep,
    colorErrorTextActive: status.error.deep,
    colorErrorOutline: colorWithAlpha(status.error.base, OUTLINE_ALPHA.standard),

    colorInfoBg: status.info.bg,
    colorInfoBgHover: status.info.bgHover,
    colorInfoBorder: status.info.base,
    colorInfoBorderHover: status.info.deep,
    colorInfoHover: status.info.deep,
    colorInfoActive: status.info.deep,
    colorInfoTextHover: status.info.deep,
    colorInfoTextActive: status.info.deep,
};

/* Dark-mode status ramps — from the design token export (design-tokens/dark.json).
   Design reuses the same four light stops but inverts their roles: the pale tint becomes the deep
   surface, the base tone becomes the fill, and the deep tone becomes the light text/hover tone.
   Written against `status` rather than fresh hexes so the two modes stay provably paired.

   Three stops break that inversion in the export. They are reproduced verbatim because the export
   is the source of truth, but each is marked for design to confirm or correct:
     - Success.BgHover uses the light BASE where Warning/Error/Info use the light BG_HOVER.
     - Info.Border uses the light BASE where the other three use the light BG_HOVER.
     - Info.BorderHover uses the light BG_HOVER where the other three use the light BG. */
const sharedDarkToken: ThemeConfig['token'] = {
    colorSuccess: status.success.bgHover,
    colorSuccessBg: status.success.deep,
    colorSuccessBgHover: status.success.base, // deviates: siblings use `.bgHover` here
    colorSuccessBorder: status.success.bgHover,
    colorSuccessBorderHover: status.success.bg,
    colorSuccessHover: status.success.bg,
    colorSuccessActive: status.success.bg,
    colorSuccessText: status.success.bgHover,
    colorSuccessTextHover: status.success.bg,
    colorSuccessTextActive: status.success.bg,

    colorWarning: status.warning.bgHover,
    colorWarningBg: status.warning.deep,
    colorWarningBgHover: status.warning.bgHover,
    colorWarningBorder: status.warning.bgHover,
    colorWarningBorderHover: status.warning.bg,
    colorWarningHover: status.warning.bg,
    colorWarningActive: status.warning.bg,
    colorWarningText: status.warning.bgHover,
    colorWarningTextHover: status.warning.bg,
    colorWarningTextActive: status.warning.bg,
    colorWarningOutline: colorWithAlpha(status.warning.bgHover, OUTLINE_ALPHA.standard),

    colorError: status.error.bgHover,
    colorErrorBg: status.error.deep,
    colorErrorBgHover: status.error.bgHover,
    colorErrorBorder: status.error.bgHover,
    colorErrorBorderHover: status.error.bg,
    colorErrorHover: status.error.bg,
    colorErrorActive: status.error.bg,
    colorErrorText: status.error.bgHover,
    colorErrorTextHover: status.error.bg,
    colorErrorTextActive: status.error.bg,
    /* Two oddities, both from the export: the alpha is `strong` where Warning's is `standard`, and
       the tone is the LIGHT error base rather than dark's `colorError`. Flagged for design. */
    colorErrorOutline: colorWithAlpha(status.error.base, OUTLINE_ALPHA.strong),

    colorInfo: status.info.bgHover,
    colorInfoBg: status.info.deep,
    colorInfoBgHover: status.info.bgHover,
    colorInfoBorder: status.info.base, // deviates: siblings use `.bgHover` here
    colorInfoBorderHover: status.info.bgHover, // deviates: siblings use `.bg` here
    colorInfoHover: status.info.bg,
    colorInfoActive: status.info.bg,
    colorInfoText: status.info.bgHover,
    colorInfoTextHover: status.info.bg,
    colorInfoTextActive: status.info.bg,

    /* Muted tones run lighter than antd's 0.45/0.25, mirroring how light mode darkens them.
       Description, Disabled, Placeholder and Icon are omitted: antd derives them from these two. */
    ...buildMutedText(WHITE, MUTED_ALPHA.dark),
    colorSplit: colorWithAlpha(WHITE, SPLIT_ALPHA),
};

/* colorPrimary, colorLink and the four status colours are SEED tokens, and antd deletes seeds from the
   override merge (antd/es/theme/util/alias.js) before re-emitting each one off the ramp it just
   generated. Under darkAlgorithm that ramp is dark-tuned, so `#008188` passed in `token` comes
   back as `#037177`. Chaining a second mapping algorithm re-applies the bases at map level, after
   the strip. Verified to leave every surface and derived ramp stop identical to plain darkAlgorithm. */
const darkSeedBases = {
    colorSuccess: status.success.bgHover,
    colorWarning: status.warning.bgHover,
    colorError: status.error.bgHover,
    colorInfo: status.info.bgHover,
};

const buildDarkAlgorithm = (primary: string): MappingAlgorithm[] => [
    darkAlgorithm,
    (seed, derived) => ({
        ...(derived ?? darkAlgorithm(seed)),
        ...darkSeedBases,
        colorPrimary: primary,
        colorLink: primary,
    }),
];

const brandLightToken: ThemeConfig['token'] = {
    colorPrimaryBg: teal[1],
    colorPrimaryBgHover: teal[2],
    colorPrimaryBorder: teal[3],
    colorPrimaryBorderHover: teal[4],
    colorPrimaryHover: teal[7],
    colorPrimaryActive: teal[5],
    colorPrimaryText: brand.teal,
    colorPrimaryTextHover: teal[7],
    colorPrimaryTextActive: teal[5],

    colorLinkHover: teal[7],
    colorLinkActive: teal[5],

    controlItemBgActive: teal[1],
    controlItemBgActiveHover: teal[2],
    controlOutline: colorWithAlpha(brand.teal, OUTLINE_ALPHA.standard),
};

/* 
   Tenant themes do not get this block: their primary is derived from the tenant colour. */
const brandDarkToken: ThemeConfig['token'] = {
    colorPrimaryBg: darkTeal[1],
    colorPrimaryBgHover: darkTeal[2],
    colorPrimaryBorder: darkTeal[3],
    colorPrimaryBorderHover: darkTeal[4],
    colorPrimaryHover: darkTeal[7],
    colorPrimaryActive: darkTeal[5],
    colorPrimaryText: darkTeal[6],
    colorPrimaryTextHover: darkTeal[7],
    colorPrimaryTextActive: darkTeal[5],

    /* Light mode darkens on hover and lightens on active; dark mode does the reverse. */
    colorLinkHover: darkTeal[7],
    colorLinkActive: darkTeal[5],

    controlItemBgActive: darkTeal[1],
    controlItemBgActiveHover: darkTeal[2],
    controlOutline: colorWithAlpha(brand.teal, OUTLINE_ALPHA.strong),
};

const buildTenantLightToken = (colors: ColorSchema): ThemeConfig['token'] => ({
    controlOutline: colorWithAlpha(colors.primary, OUTLINE_ALPHA.standard),
    // TODO: Disabled tenant colors for text and background until a good solution is agreed upon.
    // colorTextBase: colors.primaryFont,
    // colorBgBase: colors.primaryBackground,
    // colorSplit: colorWithAlpha(colors.primaryFont, SPLIT_ALPHA),

    // TODO: these colors left out for now because they are not used in the current design, but we may want to add them back in if we need to use them in the future
    // colorTextSecondary: colors.secondaryFont,
    // colorBgLayout: colors.secondaryBackground,
});

const buildTenantDarkToken = (colors: ColorSchema): ThemeConfig['token'] => ({
    controlOutline: colorWithAlpha(colors.primary, OUTLINE_ALPHA.strong),
});

/* ======================================== Component overrides — start ========================================= */

type ComponentsConfig = NonNullable<ThemeConfig['components']>;

type ComponentTokens = NonNullable<ComponentsConfig[keyof ComponentsConfig]>;
interface ComponentVariants<T> {
    light: () => T;
    dark: () => T;
    tenantLight: (colors: ColorSchema) => T;
    tenantDark: (colors: ColorSchema) => T;
}

type ThemedComponents = {
    [K in keyof ComponentsConfig]?: ComponentVariants<NonNullable<ComponentsConfig[K]>>;
};

/* Input box metrics, shared by every control ANT builds on the Input token set.

   The export's paddingBlock, paddingBlockLG and paddingBlockSM are left out on purpose. ANT gives a
   text input no height rule, so its height is paddingBlock * 2 + line-height + border; taking the
   export's 4/7/0 renders a 32px input beside a 40px button, short at every size. Those numbers are
   ANT's own formula at a controlHeight of 32, and the export's Input block declares controlHeight
   40 alongside them, so the two cannot both be right. Left unset, ANT derives them from our scale
   and the input matches the button. The input-height specimen on the theme demo measures it.

   inputFontSizeSM is different: ANT uses fontSize at every size, so 12 is a real design decision. */
const inputMetrics = {
    inputFontSizeSM: 12,
};

/* The pickers add calendar and multi-select metrics on top of the same input box. */
const pickerMetrics = {
    ...inputMetrics,
    cellWidth: 36,
    cellHeight: 24,
    textHeight: 40,
    timeColumnWidth: 56,
    withoutTimeCellHeight: 66,
    // multipleItemHeight: 24,
    // multipleItemHeightLG: 32,
    // multipleItemHeightSM: 16,
};

/* Every component override that does not depend on the tenant colours or the colour mode.
    Adding a key here applies it to all four variants; a key that varies by tenant or colour mode belongs in themedComponents.
*/
const baseComponents = {
    /* The glyph inside an icon-only button. ANT leaves all three at the string 'inherit', so the
       icon takes the button's own font size — 14 / 14 / 16 across default, small and large. The
       export asks for 16 / 14 / 18, giving the glyph two more pixels than the label it replaces at
       default and large size, which is what keeps a lone icon legible in a 40px button. The small
       value is the same 14 that 'inherit' resolves to today; it is pinned so the trio moves
       together if contentFontSizeSM ever changes. Only icon-only buttons are affected — an icon
       beside a label is sized by fontSize. */
    Button: {
        onlyIconSize: 16,
        onlyIconSizeSM: 14,
        onlyIconSizeLG: 18,
    },
    Layout: {
        headerHeight: HEADER_HEIGHT,
        headerPadding: `0 ${HEADER_PADDING_INLINE}px`,
        triggerHeight: 48,
    },
    Menu: {
        iconMarginInlineEnd: MENU_ICON_GAP,
        subMenuItemBg: 'transparent',
        itemHeight: CONTROL_HEIGHT,
        itemBorderRadius: MENU_ITEM_RADIUS,
        subMenuItemBorderRadius: MENU_ITEM_RADIUS,
        collapsedWidth: 80,
        horizontalLineHeight: 40,
    },
    Avatar: {
        textFontSize: 18,
        textFontSizeLG: 24,
    },
    Modal: {
        titleLineHeight: 1.375,
    },
    Radio: {
        dotSize: 8,
    },
    Tag: {
        borderRadiusSM: TAG_PILL_RADIUS,
    },
    Input: inputMetrics,
    InputNumber: { ...inputMetrics, handleWidth: 22 },
    /* Covers TimePicker too: ANT 6 has no separate TimePicker theme key, and the time picker
       renders through the date-picker style with this token set. */
    DatePicker: pickerMetrics,
    Switch: {
        trackHeightSM: 16,
        handleSizeSM: 12,
        trackMinWidthSM: 28,
        innerMinMarginSM: 6,
        innerMaxMarginSM: 18,
    },
    Slider: { handleSize: 10, controlSize: 10, handleSizeHover: 12 },
    Rate: { starSize: 20, starSizeSM: 15, starSizeLG: 25 },
    Steps: { dotSize: 8, dotCurrentSize: 10 },
    Spin: { dotSize: 20, dotSizeSM: 14 },
    /* cardHeightSM sets no height directly — ANT turns it into cardPaddingSM, half the difference
       between it and the line height, and floors the add button on an editable card set. The export
       carries this one as `cardHeighSM`, missing the t, so copying the export verbatim would leave
       small card tabs on ANT's own derivation. Spelled correctly here. */
    Tabs: { cardHeight: 40, cardHeightSM: 32, cardHeightLG: 48 },
    Skeleton: { titleHeight: 16, paragraphLiHeight: 16 },
    Dropdown: { paddingBlock: 5 },
    Transfer: { itemPaddingBlock: 5 },
    Upload: { pictureCardSize: 102 },
} satisfies ComponentsConfig;

const BUTTON_SHADOW_ALPHA = 0.11;

const TEXT_HOVER_ALPHA = {
    light: 0.06,
    dark: 0.12,
} as const;

const buildButton = (primary: string, textBase: string, textHoverAlpha: number) => ({
    controlOutline: colorWithAlpha(primary, BUTTON_SHADOW_ALPHA),
    colorErrorOutline: colorWithAlpha(status.error.base, BUTTON_SHADOW_ALPHA),
    textHoverBg: colorWithAlpha(textBase, textHoverAlpha),
});

const brandLightButton = () => buildButton(brand.teal, BLACK, TEXT_HOVER_ALPHA.light);

const brandDarkButton = () => buildButton(brand.teal, WHITE, TEXT_HOVER_ALPHA.dark);

const tenantLightButton = (colors: ColorSchema) => buildButton(colors.primary, BLACK, TEXT_HOVER_ALPHA.light);

const tenantDarkButton = (colors: ColorSchema) => buildButton(colors.primary, WHITE, TEXT_HOVER_ALPHA.dark);

const darkHeader = () => ({ headerBg: DARK_HEADER_BG });

const TABLE_STICKY_SCROLL_BG_ALPHA = 0.25;

/* ANT's own default: colorTextBase at 0.25. Pinned because it otherwise follows colorTextQuaternary,
   which this theme raises to 0.54. */
const buildTable = (textBase: string) => ({
    stickyScrollBarBg: colorWithAlpha(textBase, TABLE_STICKY_SCROLL_BG_ALPHA),
});

const lightTable = () => buildTable(BLACK);

const darkTable = () => buildTable(WHITE);

const tenantMenu = (colors: ColorSchema) => ({
    itemSelectedBg: colors.primary,
    itemSelectedColor: new FastColor(colors.primary).isDark() ? WHITE : BLACK,
});

/* COLOURS the export carries that this theme deliberately leaves unset. Each one is ANT's own
 * derivation from ANT's default palette, so applying it puts ANT's blue and grey into a teal app.
 * Left unset, ANT recomputes each from the brand or tenant colours.
 *
 *   Slider.handleActiveOutlineColor   export rgba(22, 119, 255, 0.2)   unset -> rgba(0, 129, 136, 0.2)
 *       ANT derives this as colorPrimary at 0.2 alpha. rgb(22, 119, 255) is #1677ff, ANT's default
 *       blue, which would give the slider handle a blue active outline in an app whose every other
 *       focus affordance is teal.
 *
 *   Slider.handleColorDisabled        export #bfbfbf                   unset -> #757575
 *       ANT derives this as colorTextDisabled composited on colorBgContainer. #bfbfbf is
 *       rgba(0,0,0,0.25) over white, ANT's stock disabled tone, which reads paler than every other
 *       disabled affordance here now that the muted tones sit at 0.54.
 *
 *   Table.headerBg / footerBg                 export rgba(0, 0, 0, 0.02)
 *   Table.headerSortActiveBg / SortHoverBg    export rgba(0, 0, 0, 0.06)
 *       ANT derives all four from colorTextBase — headerBg off colorFillAlter, both sort tints off
 *       colorFillSecondary — then composites onto colorBgContainer (antd/es/table/style/index.js),
 *       landing on the same pixels the export names. Pinning the literals freezes the hue: a tenant
 *       whose primaryFont is not black gets neutral grey table tints while every other muted tone
 *       carries its colour. The alphas are light-mode only; ANT uses 0.04/0.12 in dark.
 *
 *   Timeline.dotBg                            export #ffffff (light) / #141414 (dark)
 *       Both values are colorBgContainer for their mode, which is what ANT resolves the dot to when
 *       left unset. Pinning the literal puts a white dot on a tenant's tinted canvas.
 *
 * Each one would be a row in the table below if it ever came back.
 */

const themedComponents = {
    Layout: {
        light: () => ({ headerBg: WHITE }),
        dark: darkHeader,
        tenantLight: (colors: ColorSchema) => ({ headerBg: colors.primaryBackground }),
        tenantDark: darkHeader,
    },
    Menu: {
        light: () => ({ itemSelectedColor: teal[7] }),
        dark: () => ({ itemSelectedColor: darkTeal[7] }),
        tenantLight: tenantMenu,
        tenantDark: tenantMenu,
    },
    Button: {
        light: brandLightButton,
        dark: brandDarkButton,
        tenantLight: tenantLightButton,
        tenantDark: tenantDarkButton,
    },
    Table: {
        light: lightTable,
        dark: darkTable,
        tenantLight: lightTable,
        tenantDark: darkTable,
    },
} satisfies ThemedComponents;

export const mergeComponentsConfig = (base: ComponentsConfig, themed: ComponentsConfig): ComponentsConfig =>
    Object.entries(themed).reduce<ComponentsConfig>(
        (merged, [component, tokens]) => ({
            ...merged,
            [component]: { ...merged[component as keyof ComponentsConfig], ...tokens },
        }),
        base,
    );

const pickVariant = (
    variants: ComponentVariants<ComponentTokens>,
    colors: ColorSchema | null,
    isDark: boolean,
): ComponentTokens => {
    if (colors) return (isDark ? variants.tenantDark : variants.tenantLight)(colors);

    return (isDark ? variants.dark : variants.light)();
};

const buildThemedComponents = (colors: ColorSchema | null, isDark: boolean): ComponentsConfig =>
    Object.entries(themedComponents).reduce<ComponentsConfig>(
        (resolved, [component, variants]) => ({
            ...resolved,
            [component]: pickVariant(variants, colors, isDark),
        }),
        {},
    );

const buildComponents = (colors: ColorSchema | null, isDark: boolean): ThemeConfig['components'] =>
    mergeComponentsConfig(baseComponents, buildThemedComponents(colors, isDark));

/* =========================================== Theme builders — start =========================================== */

const buildBrandTheme = (isDark: boolean): ThemeConfig => ({
    algorithm: isDark ? buildDarkAlgorithm(brand.teal) : defaultAlgorithm,
    token: {
        ...baseToken,
        colorPrimary: brand.teal,
        colorLink: brand.teal,
        ...(isDark ? { ...sharedDarkToken, ...brandDarkToken } : { ...sharedLightToken, ...brandLightToken }),
    },
    components: buildComponents(null, isDark),
});

const buildTenantTheme = (colors: ColorSchema, isDark: boolean): ThemeConfig => ({
    algorithm: isDark ? buildDarkAlgorithm(colors.primary) : defaultAlgorithm,
    token: {
        ...baseToken,
        colorPrimary: colors.primary,
        colorLink: colors.primary,
        /* No primary ramp in dark mode: the tenant colour is arbitrary, so antd's derivation is
           the only thing that can produce a coherent ramp around it. */
        ...(isDark
            ? { ...sharedDarkToken, ...buildTenantDarkToken(colors) }
            : { ...sharedLightToken, ...buildTenantLightToken(colors) }),
    },
    components: buildComponents(colors, isDark),
});

export const buildAppTheme = (userColors: ColorSchema | null, colorMode: ResolvedColorMode): ThemeConfig => {
    const isDark = colorMode === ColorMode.Dark;

    return userColors ? buildTenantTheme(userColors, isDark) : buildBrandTheme(isDark);
};
