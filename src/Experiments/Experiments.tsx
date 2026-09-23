import type { ReactNode } from 'react';
import {
    Card,
    Cascader,
    ConfigProvider,
    DatePicker,
    Flex,
    Segmented,
    Select,
    TreeSelect,
    Typography,
    theme,
} from 'antd';
import type { ThemeConfig } from 'antd';
import { DesktopOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useThemeSettings } from '../theme/useThemeSettings';
import { ColorMode } from '../theme/theme.types';
import { Stock } from '../ThemeDemo/Compare';
import { unpinnedMultipleItemHeight } from '../ThemeDemo/derivedTokens';
import { useDemoStyles } from '../ThemeDemo/useDemoStyles';
import { useMeasuredSize } from '../ThemeDemo/useMeasuredSize';

const { Title, Text, Paragraph } = Typography;

type ControlSize = 'small' | 'middle' | 'large';

const COLOR_MODE_OPTIONS = [
    { value: ColorMode.Light, label: 'Light', icon: <SunOutlined /> },
    { value: ColorMode.Dark, label: 'Dark', icon: <MoonOutlined /> },
    { value: ColorMode.System, label: 'System', icon: <DesktopOutlined /> },
];

const SIZES: { size: ControlSize; label: string }[] = [
    { size: 'small', label: 'small' },
    { size: 'middle', label: 'default' },
    { size: 'large', label: 'large' },
];

const FIELD_WIDTH = 240;
const TOOLBAR_GAP = 12;
const PICKER_TAG = '.ant-picker-selection-item';
/* TreeSelect and Cascader render through Select's styles, so they share its class names. */
const SELECT_TAG = '.ant-select-selection-item';

/* Every control holds three values in the same width, so each one wraps to a second row and
   shows the gap between rows as well as the tag height. Fixed dates rather than today(), so every
   visit renders the same tags. */
const DATES = [dayjs('2026-01-12'), dayjs('2026-01-19'), dayjs('2026-01-26')];

const SELECT_OPTIONS = [
    { value: 'north', label: 'North wing' },
    { value: 'south', label: 'South wing' },
    { value: 'east', label: 'East wing' },
    { value: 'west', label: 'West wing' },
];

const SELECTED_WINGS = ['north', 'south', 'east'];

const TREE_DATA = [
    {
        value: 'building-a',
        title: 'Building A',
        children: [
            { value: 'a-lobby', title: 'Main lobby' },
            { value: 'a-floor-1', title: 'First floor' },
            { value: 'a-floor-2', title: 'Second floor' },
        ],
    },
    {
        value: 'building-b',
        title: 'Building B',
        children: [{ value: 'b-lobby', title: 'Reception desk' }],
    },
];

const SELECTED_TREE = ['a-lobby', 'a-floor-1', 'b-lobby'];

const CASCADER_OPTIONS = [
    {
        value: 'europe',
        label: 'Europe',
        children: [
            { value: 'helsinki', label: 'Helsinki office' },
            { value: 'berlin', label: 'Berlin office' },
        ],
    },
    {
        value: 'asia',
        label: 'Asia',
        children: [{ value: 'tokyo', label: 'Tokyo office' }],
    },
];

const SELECTED_CITIES = [
    ['europe', 'helsinki'],
    ['europe', 'berlin'],
    ['asia', 'tokyo'],
];

/* The design export's values, applied to both token sets so every control in the card agrees. */
const FIXED_HEIGHTS = {
    multipleItemHeight: 24,
    multipleItemHeightLG: 32,
    multipleItemHeightSM: 16,
};

const FIXED_ITEM_HEIGHT: ThemeConfig['components'] = {
    DatePicker: FIXED_HEIGHTS,
    Select: FIXED_HEIGHTS,
};

interface ControlSpec {
    name: string;
    /* Which token set sizes this control's tags — the point of pairing DatePicker against the
       four controls that read Select's. */
    token: string;
    selector: string;
    render: (size: ControlSize) => ReactNode;
}

const style = { width: FIELD_WIDTH };

const CONTROLS: ControlSpec[] = [
    {
        name: 'DatePicker',
        token: 'DatePicker.multipleItemHeight',
        selector: PICKER_TAG,
        render: (size) => <DatePicker size={size} multiple defaultValue={DATES} style={style} />,
    },
    {
        name: 'Select — multiple',
        token: 'Select.multipleItemHeight',
        selector: SELECT_TAG,
        render: (size) => (
            <Select size={size} mode="multiple" defaultValue={SELECTED_WINGS} options={SELECT_OPTIONS} style={style} />
        ),
    },
    {
        name: 'Select — tags',
        token: 'Select.multipleItemHeight',
        selector: SELECT_TAG,
        render: (size) => (
            <Select size={size} mode="tags" defaultValue={SELECTED_WINGS} options={SELECT_OPTIONS} style={style} />
        ),
    },
    {
        name: 'TreeSelect',
        token: 'Select.multipleItemHeight',
        selector: SELECT_TAG,
        render: (size) => (
            <TreeSelect
                size={size}
                treeCheckable
                defaultValue={SELECTED_TREE}
                treeData={TREE_DATA}
                treeDefaultExpandAll
                style={style}
            />
        ),
    },
    {
        name: 'Cascader',
        token: 'Select.multipleItemHeight',
        selector: SELECT_TAG,
        render: (size) => (
            <Cascader
                size={size}
                multiple
                /* The default collapses a fully selected branch into one parent tag. */
                showCheckedStrategy={Cascader.SHOW_CHILD}
                defaultValue={SELECTED_CITIES}
                options={CASCADER_OPTIONS}
                style={style}
            />
        ),
    },
];

interface VariantColumnProps {
    label: string;
    caption: string;
    selector: string;
    children: ReactNode;
}

/* The tag height is measured, not restated: component tokens never reach useToken(), so the
   rendered tag is the only honest readout of what each column resolved to. */
const VariantColumn = ({ label, caption, selector, children }: VariantColumnProps) => {
    const { styles } = useDemoStyles();
    const { token } = theme.useToken();
    const { measure, size } = useMeasuredSize(selector);

    return (
        <div className={styles.compareColumn}>
            <Text strong>{label}</Text>
            <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                {caption}
            </Text>
            <Text className={styles.mono}>tag {size ? `${size.height}px` : '…'}</Text>
            <div ref={measure}>{children}</div>
        </div>
    );
};

/* The formula is evaluated against the app's control scale, so the column follows controlHeight
   rather than whatever theme.ts currently pins. */
const AutoItemHeight = ({ children }: { children: ReactNode }) => {
    const { token } = theme.useToken();

    return <ConfigProvider theme={{ components: unpinnedMultipleItemHeight(token) }}>{children}</ConfigProvider>;
};

interface ComparisonRowProps {
    control: ControlSpec;
    size: ControlSize;
    sizeLabel: string;
}

/* One control at one size, three ways: stock Ant Design, Ant Design's own formula on our raised
   control scale, and the design export's pinned numbers. Read across. */
const ComparisonRow = ({ control, size, sizeLabel }: ComparisonRowProps) => {
    const { styles } = useDemoStyles();
    const { token } = theme.useToken();

    return (
        <Card size="small" title={`${control.name} · ${sizeLabel}`} variant="outlined">
            <div className={styles.compareTrio}>
                <Stock>
                    <VariantColumn label="Ant default" caption="stock scale, stock formula" selector={control.selector}>
                        {control.render(size)}
                    </VariantColumn>
                </Stock>
                <AutoItemHeight>
                    <VariantColumn
                        label="Auto"
                        caption={`controlHeight − ${token.paddingXXS * 2}, our scale`}
                        selector={control.selector}
                    >
                        {control.render(size)}
                    </VariantColumn>
                </AutoItemHeight>
                <ConfigProvider theme={{ components: FIXED_ITEM_HEIGHT }}>
                    <VariantColumn label="Theme fix" caption="pinned 16 / 24 / 32" selector={control.selector}>
                        {control.render(size)}
                    </VariantColumn>
                </ConfigProvider>
            </div>
        </Card>
    );
};

export const Experiments = () => {
    const { styles } = useDemoStyles();
    const { token } = theme.useToken();
    const { colorMode, setColorMode } = useThemeSettings();

    return (
        <div className={styles.scroller}>
            <div className={styles.toolbar}>
                <Flex align="center" gap={TOOLBAR_GAP} wrap>
                    <Segmented<ColorMode>
                        size="small"
                        options={COLOR_MODE_OPTIONS}
                        value={colorMode}
                        onChange={setColorMode}
                    />
                </Flex>
            </div>

            <div className={styles.page}>
                <Title level={2}>Experiments</Title>

                <Title level={3}>Multi-select tag height</Title>
                <Paragraph type="secondary">
                    Every Ant Design control that renders selections as tags, one card per control per size, with
                    stock Ant Design, the auto formula and the pinned theme fix side by side. DatePicker reads its
                    own token; Select, TreeSelect and Cascader all read Select's. Each column reads out its
                    rendered tag height.
                </Paragraph>

                <Flex vertical gap={token.margin}>
                    {CONTROLS.map((control) => (
                        <Flex key={control.name} vertical gap={token.marginXS}>
                            <Text type="secondary" className={styles.mono}>
                                {control.token}
                            </Text>
                            {SIZES.map(({ size, label }) => (
                                <ComparisonRow key={size} control={control} size={size} sizeLabel={label} />
                            ))}
                        </Flex>
                    ))}
                </Flex>
            </div>
        </div>
    );
};
