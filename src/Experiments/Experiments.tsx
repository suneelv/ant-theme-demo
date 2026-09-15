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

interface TagProbeProps {
    name: string;
    selector: string;
    children: ReactNode;
}

/* The tag height is measured, not restated: component tokens never reach useToken(), so the
   rendered tag is the only honest readout of what each card resolved to. */
const TagProbe = ({ name, selector, children }: TagProbeProps) => {
    const { styles } = useDemoStyles();
    const { measure, size } = useMeasuredSize(selector);

    return (
        <Flex vertical gap={4}>
            <Text type="secondary" className={styles.mono}>
                {name} · tag {size ? `${size.height}px` : '…'}
            </Text>
            <div ref={measure}>{children}</div>
        </Flex>
    );
};

interface ControlRowProps {
    size: ControlSize;
    label: string;
}

const ControlRow = ({ size, label }: ControlRowProps) => {
    const style = { width: FIELD_WIDTH };

    return (
        <Flex vertical gap={8}>
            <Text strong>{label}</Text>
            <Flex gap={16} wrap align="flex-start">
                <TagProbe name="DatePicker" selector={PICKER_TAG}>
                    <DatePicker size={size} multiple defaultValue={DATES} style={style} />
                </TagProbe>
                <TagProbe name="Select multiple" selector={SELECT_TAG}>
                    <Select
                        size={size}
                        mode="multiple"
                        defaultValue={SELECTED_WINGS}
                        options={SELECT_OPTIONS}
                        style={style}
                    />
                </TagProbe>
                <TagProbe name="Select tags" selector={SELECT_TAG}>
                    <Select size={size} mode="tags" defaultValue={SELECTED_WINGS} options={SELECT_OPTIONS} style={style} />
                </TagProbe>
                <TagProbe name="TreeSelect" selector={SELECT_TAG}>
                    <TreeSelect
                        size={size}
                        treeCheckable
                        defaultValue={SELECTED_TREE}
                        treeData={TREE_DATA}
                        treeDefaultExpandAll
                        style={style}
                    />
                </TagProbe>
                <TagProbe name="Cascader" selector={SELECT_TAG}>
                    <Cascader
                        size={size}
                        multiple
                        /* The default collapses a fully selected branch into one parent tag. */
                        showCheckedStrategy={Cascader.SHOW_CHILD}
                        defaultValue={SELECTED_CITIES}
                        options={CASCADER_OPTIONS}
                        style={style}
                    />
                </TagProbe>
            </Flex>
        </Flex>
    );
};

const ControlSizes = () => (
    <Flex vertical gap={24}>
        {SIZES.map(({ size, label }) => (
            <ControlRow key={size} size={size} label={label} />
        ))}
    </Flex>
);

interface ExperimentCardProps {
    title: string;
    caption: string;
    /* Borders the card in the primary colour of the theme it renders under. */
    highlighted?: boolean;
    children: ReactNode;
}

const ExperimentCard = ({ title, caption, highlighted, children }: ExperimentCardProps) => {
    const { token } = theme.useToken();

    return (
        <Card
            size="small"
            title={title}
            variant="outlined"
            style={highlighted ? { borderColor: token.colorPrimary } : undefined}
        >
            <Paragraph type="secondary">{caption}</Paragraph>
            {children}
        </Card>
    );
};

/* The formula is evaluated against the app's control scale, so the card follows controlHeight
   rather than whatever theme.ts currently pins. */
const AutoItemHeight = ({ children }: { children: ReactNode }) => {
    const { token } = theme.useToken();

    return <ConfigProvider theme={{ components: unpinnedMultipleItemHeight(token) }}>{children}</ConfigProvider>;
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
                    Every Ant Design control that renders selections as tags, at small, default and large, under
                    three settings for multipleItemHeight. DatePicker reads its own token; Select, TreeSelect and
                    Cascader all read Select's. Each control reads out its rendered tag height.
                </Paragraph>

                <Flex vertical gap={token.margin}>
                    <Stock>
                        <ExperimentCard
                            title="Stock Ant Design"
                            caption="controlHeight 24 / 32 / 40 → tags 16 / 24 / 32"
                            highlighted
                        >
                            <ControlSizes />
                        </ExperimentCard>
                    </Stock>
                    <AutoItemHeight>
                        <ExperimentCard
                            title="multipleItemHeight — auto"
                            caption={`Ant Design's formula, controlHeight − ${token.paddingXXS * 2}, on our 32 / 40 / 48 scale`}
                        >
                            <ControlSizes />
                        </ExperimentCard>
                    </AutoItemHeight>
                    <ConfigProvider theme={{ components: FIXED_ITEM_HEIGHT }}>
                        <ExperimentCard title="multipleItemHeight — fixed" caption="16 / 24 / 32, pinned">
                            <ControlSizes />
                        </ExperimentCard>
                    </ConfigProvider>
                </Flex>
            </div>
        </div>
    );
};
