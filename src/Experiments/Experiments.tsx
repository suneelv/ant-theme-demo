import type { ReactNode } from 'react';
import { Card, ConfigProvider, DatePicker, Flex, Segmented, Typography, theme } from 'antd';
import type { ThemeConfig } from 'antd';
import { DesktopOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useThemeSettings } from '../theme/useThemeSettings';
import { ColorMode } from '../theme/theme.types';
import { Stock } from '../ThemeDemo/Compare';
import { unpinnedDatePicker } from '../ThemeDemo/derivedTokens';
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

const PICKER_WIDTH = 240;
const TOOLBAR_GAP = 12;
const TAG_SELECTOR = '.ant-picker-selection-item';

/* Fixed dates rather than today(), so every visit renders the same tags. Two fit on one row; the
   third wraps, which shows how the tag height stacks. */
const DATE_PAIR = [dayjs('2026-01-12'), dayjs('2026-01-19')];
const DATE_TRIO = [...DATE_PAIR, dayjs('2026-01-26')];

/* The design export's values. */
const FIXED_PICKER: ThemeConfig['components'] = {
    DatePicker: {
        multipleItemHeight: 24,
        multipleItemHeightLG: 32,
        multipleItemHeightSM: 16,
    },
};

interface PickerRowProps {
    size: ControlSize;
    label: string;
}

/* The tag height is measured, not restated: component tokens never reach useToken(), so the
   rendered tag is the only honest readout of what each card resolved to. */
const PickerRow = ({ size, label }: PickerRowProps) => {
    const { styles } = useDemoStyles();
    const { measure, size: tagSize } = useMeasuredSize(TAG_SELECTOR);

    return (
        <Flex vertical gap={4}>
            <Text type="secondary" className={styles.mono}>
                {label} · tag {tagSize ? `${tagSize.height}px` : '…'}
            </Text>
            <div ref={measure}>
                <Flex gap={8} wrap align="flex-start">
                    <DatePicker size={size} multiple defaultValue={DATE_PAIR} style={{ width: PICKER_WIDTH }} />
                    <DatePicker size={size} multiple defaultValue={DATE_TRIO} style={{ width: PICKER_WIDTH }} />
                </Flex>
            </div>
        </Flex>
    );
};

const PickerSizes = () => (
    <Flex vertical gap={16}>
        {SIZES.map(({ size, label }) => (
            <PickerRow key={size} size={size} label={label} />
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
const AutoPickerMetrics = ({ children }: { children: ReactNode }) => {
    const { token } = theme.useToken();

    return <ConfigProvider theme={{ components: unpinnedDatePicker(token) }}>{children}</ConfigProvider>;
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

                <Title level={3}>DatePicker — multiple tag height</Title>
                <Paragraph type="secondary">
                    The same multi-date pickers at small, default and large, under three settings for
                    multipleItemHeight. Each row reads out the rendered tag height.
                </Paragraph>

                <Flex vertical gap={token.margin}>
                    <Stock>
                        <ExperimentCard
                            title="Stock Ant Design"
                            caption="controlHeight 24 / 32 / 40 → tags 16 / 24 / 32"
                            highlighted
                        >
                            <PickerSizes />
                        </ExperimentCard>
                    </Stock>
                    <AutoPickerMetrics>
                        <ExperimentCard
                            title="pickerMetrics — auto"
                            caption={`Ant Design's formula, controlHeight − ${token.paddingXXS * 2}, on our 32 / 40 / 48 scale`}
                        >
                            <PickerSizes />
                        </ExperimentCard>
                    </AutoPickerMetrics>
                    <ConfigProvider theme={{ components: FIXED_PICKER }}>
                        <ExperimentCard title="pickerMetrics — fixed" caption="multipleItemHeight 16 / 24 / 32, pinned">
                            <PickerSizes />
                        </ExperimentCard>
                    </ConfigProvider>
                </Flex>
            </div>
        </div>
    );
};
