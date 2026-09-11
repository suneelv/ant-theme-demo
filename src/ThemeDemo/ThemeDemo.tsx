import { useState } from 'react';
import { Button, Divider, Flex, Segmented, Switch, Typography } from 'antd';
import { DesktopOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useResolvedColorMode } from '../theme/useResolvedColorMode';
import { useThemeSettings } from '../theme/useThemeSettings';
import { ColorMode } from '../theme/theme.types';
import { TenantThemeDialog } from './TenantThemeDialog';
import { CoverageProvider } from './Specimen';
import { DeltaTable } from './DeltaTable';
import { useDemoStyles } from './useDemoStyles';
import { Foundations } from './sections/Foundations';
import { General } from './sections/General';
import { Navigation } from './sections/Navigation';
import { DataEntry } from './sections/DataEntry';
import { DataDisplay } from './sections/DataDisplay';
import { Feedback } from './sections/Feedback';
import { TextAccessibility } from './sections/TextAccessibility';

const { Title, Text, Paragraph } = Typography;

const TOOLBAR_GAP = 12;

const COLOR_MODE_OPTIONS = [
    { value: ColorMode.Light, label: 'Light', icon: <SunOutlined /> },
    { value: ColorMode.Dark, label: 'Dark', icon: <MoonOutlined /> },
    { value: ColorMode.System, label: 'System', icon: <DesktopOutlined /> },
];

export const ThemeDemo = () => {
    const { styles } = useDemoStyles();
    const { colorMode, setColorMode, useTenant, setUseTenant, tenantColors, setTenantColors } = useThemeSettings();
    const resolvedColorMode = useResolvedColorMode();
    const [configureOpen, setConfigureOpen] = useState(false);

    return (
        <CoverageProvider>
            <div className={styles.scroller}>
                <div className={styles.toolbar}>
                    <Flex align="center" gap={TOOLBAR_GAP} wrap>
                        <Segmented<ColorMode>
                            size="small"
                            options={COLOR_MODE_OPTIONS}
                            value={colorMode}
                            onChange={setColorMode}
                        />

                        <Divider orientation="vertical" />

                        <Switch checked={useTenant} aria-label="Use tenant theme" onChange={setUseTenant} />
                        <Text strong>Use tenant theme</Text>
                        <Button size="small" disabled={!useTenant} onClick={() => setConfigureOpen(true)}>
                            Configure
                        </Button>
                        <Text type="secondary">(builds the theme from a ColorSchema)</Text>

                        <Divider orientation="vertical" />

                        <Text type="secondary">
                            left column: this theme · right column: stock Ant Design in{' '}
                            {resolvedColorMode === ColorMode.Dark ? 'dark' : 'light'} mode
                        </Text>
                    </Flex>
                </div>

                <div className={styles.page}>
                    <Title level={2}>Theme demo</Title>
                    <Paragraph type="secondary">
                        Everything below is stock Ant Design plus the overrides in this custom theme. Each card puts the
                        two side by side — this theme on the left, Ant Design on its own on the right — and says what
                        changed and what to look for. Cards for a size the design export pins add a third column showing
                        what our raised control scale would have derived without that pin.
                    </Paragraph>

                    <Title level={3}>What changed</Title>
                    <DeltaTable />

                    <Divider />

                    <Foundations />
                    <General />
                    <Navigation />
                    <DataEntry />
                    <DataDisplay />
                    <Feedback />
                    <TextAccessibility />
                </div>

                {configureOpen ? (
                    <TenantThemeDialog
                        colors={tenantColors}
                        onCancel={() => setConfigureOpen(false)}
                        onSave={(next) => {
                            setTenantColors(next);
                            setConfigureOpen(false);
                        }}
                    />
                ) : null}
            </div>
        </CoverageProvider>
    );
};
