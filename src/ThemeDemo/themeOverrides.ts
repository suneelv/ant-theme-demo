export interface ComponentOverride {
    component: string;
    token: string;
    ours: string;
    /* Ant Design's default AS RESOLVED IN THIS THEME — several of these derive from controlHeight,
       so they are not the same as antd's stock-theme values. */
    antd: string;
    why?: string;
}

/* Hand-maintained mirror of the `components` block in src/theme/theme.ts.
   The page cannot import that file (baseComponents and themedComponents are private to it), and
   useToken() only exposes global tokens, so component overrides have to be restated here.
   Keep this in step with theme.ts when you add or remove an override.

   Ordered by component, then by token, so the delta table reads as an index and a missing entry is
   findable by eye. Add new entries in place rather than at the end. */
export const COMPONENT_OVERRIDES: ComponentOverride[] = [
    { component: 'Avatar', token: 'textFontSize', ours: '18', antd: '14' },
    { component: 'Avatar', token: 'textFontSizeLG', ours: '24', antd: '14' },

    {
        component: 'Button',
        token: 'colorErrorOutline',
        ours: 'rgba(235, 18, 18, 0.11)',
        antd: 'rgba(235, 18, 18, 0.66) in light, 0.88 in dark (the global pin)',
        why: 'The danger half of the same pair: it drives dangerShadow, never an outline.',
    },
    {
        component: 'Button',
        token: 'controlOutline',
        ours: 'rgba(0, 129, 136, 0.11)',
        antd: 'rgba(0, 129, 136, 0.66) in light, 0.88 in dark (the global pin)',
        why: 'Not an outline. Ant Design feeds it to primaryShadow, the flat 2px bar under solid, outlined and dashed primary buttons. Scoped to Button so the focus rings on Input, Select, Radio, Pagination and Form keep the stronger global alpha. Tenants get their own primary at the same 0.11.',
    },
    {
        component: 'Button',
        token: 'onlyIconSize',
        ours: '16',
        antd: "inherit — the button's own contentFontSize, 14",
        why: "Sizes the glyph in an icon-only button, and nothing else: an icon next to a label follows fontSize. Ant Design leaves all three sizes on the string 'inherit', so the icon is as big as the label would have been. The export gives the default and large sizes two extra pixels, because a lone glyph in a 40px button reads smaller than text of the same size.",
    },
    { component: 'Button', token: 'onlyIconSizeLG', ours: '18', antd: 'inherit — contentFontSizeLG, 16' },
    { component: 'Button', token: 'onlyIconSizeSM', ours: '14', antd: 'inherit — contentFontSizeSM, 14' },

    { component: 'DatePicker', token: 'cellHeight', ours: '24', antd: '32' },
    { component: 'DatePicker', token: 'cellWidth', ours: '36', antd: '48' },
    {
        component: 'DatePicker',
        token: 'inputFontSizeSM',
        ours: '12',
        antd: '14',
        why: 'The DatePicker block also styles TimePicker: Ant Design 6 has no separate TimePicker theme key, and the time picker renders through the date picker.',
    },
    { component: 'DatePicker', token: 'textHeight', ours: '40', antd: '48' },
    { component: 'DatePicker', token: 'timeColumnWidth', ours: '56', antd: '67.2' },
    { component: 'DatePicker', token: 'withoutTimeCellHeight', ours: '66', antd: '79.2' },

    { component: 'Dropdown', token: 'paddingBlock', ours: '5', antd: '9' },

    {
        component: 'Input',
        token: 'inputFontSizeSM',
        ours: '12',
        antd: '14',
        why: "Small inputs drop to fontSizeSM. Ant Design keeps them at fontSize, so small fields read the same size as default ones. The export also carries paddingBlock values for these fields; those are left out, because Ant Design derives an input's height from its padding and the export's numbers are Ant Design's own at a 32px control.",
    },

    { component: 'InputNumber', token: 'handleWidth', ours: '22', antd: '30' },
    { component: 'InputNumber', token: 'inputFontSizeSM', ours: '12', antd: '14' },

    {
        component: 'Layout',
        token: 'headerBg',
        ours: '#ffffff',
        antd: '#001529',
        why: "antd's default is the legacy dark navy header.",
    },
    { component: 'Layout', token: 'headerHeight', ours: '48', antd: '80' },
    { component: 'Layout', token: 'headerPadding', ours: '0 4px', antd: '0 60px' },
    {
        component: 'Layout',
        token: 'triggerHeight',
        ours: '48',
        antd: '56',
        why: 'Only paints on a collapsible Sider that renders its trigger; nothing on this page does.',
    },

    { component: 'Menu', token: 'collapsedWidth', ours: '80', antd: '96' },
    { component: 'Menu', token: 'horizontalLineHeight', ours: '40', antd: '55.2' },
    { component: 'Menu', token: 'iconMarginInlineEnd', ours: '10', antd: '18' },
    { component: 'Menu', token: 'itemHeight', ours: '40', antd: '48 (derived from controlHeightLG)' },
    { component: 'Menu', token: 'itemSelectedColor', ours: '#006a70', antd: '#008188' },
    /* No `why` here on purpose: the menu-inline specimen carries an explicit note that explains this
       token at length, and an explicit note wins over this one, so anything written here is dead. */
    { component: 'Menu', token: 'subMenuItemBg', ours: 'transparent', antd: 'rgba(0, 0, 0, 0.02)' },

    { component: 'Modal', token: 'titleLineHeight', ours: '1.375', antd: '1.5' },

    {
        component: 'Radio',
        token: 'dotSize',
        ours: '8',
        antd: '6',
        why: 'A larger dot keeps the checked state readable at the taller control height.',
    },

    { component: 'Rate', token: 'starSize', ours: '20', antd: '25' },
    { component: 'Rate', token: 'starSizeLG', ours: '25', antd: '30' },
    { component: 'Rate', token: 'starSizeSM', ours: '15', antd: '20' },

    { component: 'Skeleton', token: 'paragraphLiHeight', ours: '16', antd: '20' },
    { component: 'Skeleton', token: 'titleHeight', ours: '16', antd: '20' },

    { component: 'Slider', token: 'controlSize', ours: '10', antd: '12' },
    { component: 'Slider', token: 'handleSize', ours: '10', antd: '12' },
    { component: 'Slider', token: 'handleSizeHover', ours: '12', antd: '16' },

    { component: 'Spin', token: 'dotSize', ours: '20', antd: '24' },
    { component: 'Spin', token: 'dotSizeSM', ours: '14', antd: '16.8' },

    { component: 'Steps', token: 'dotCurrentSize', ours: '10', antd: '12' },
    { component: 'Steps', token: 'dotSize', ours: '8', antd: '10' },

    { component: 'Switch', token: 'handleSizeSM', ours: '12', antd: '16' },
    { component: 'Switch', token: 'innerMaxMarginSM', ours: '18', antd: '22' },
    { component: 'Switch', token: 'innerMinMarginSM', ours: '6', antd: '8' },
    { component: 'Switch', token: 'trackHeightSM', ours: '16', antd: '20' },
    { component: 'Switch', token: 'trackMinWidthSM', ours: '28', antd: '36' },

    { component: 'Tabs', token: 'cardHeight', ours: '40', antd: '48' },
    { component: 'Tabs', token: 'cardHeightLG', ours: '48', antd: '56' },
    {
        component: 'Tabs',
        token: 'cardHeightSM',
        ours: '32',
        antd: '40',
        why: 'Reaches a small card tab as padding, not as a height: Ant Design spends it on cardPaddingSM, half the difference between it and the line height, and on the minimum size of the add button in an editable card set. The design export spells the key `cardHeighSM`, so this one is easy to miss — a verbatim copy of the export would leave small card tabs at controlHeight.',
    },

    {
        component: 'Tag',
        token: 'borderRadiusSM',
        ours: '999999',
        antd: '4',
        why: 'Tags are full pills. The radius sits on the Tag root, so every variant gets it — outlined included.',
    },

    { component: 'Transfer', token: 'itemPaddingBlock', ours: '5', antd: '9' },

    { component: 'Upload', token: 'pictureCardSize', ours: '102', antd: '122.4' },
];

/* Keyed lookup so a specimen can print the prose for the token it demonstrates. */
export const OVERRIDE_NOTES: Record<string, string> = Object.fromEntries(
    COMPONENT_OVERRIDES.filter((entry) => entry.why).map((entry) => [
        `${entry.component}.${entry.token}`,
        entry.why as string,
    ]),
);
