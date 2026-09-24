import { useState } from 'react';
import { Button, Divider, Flex, Segmented, Switch, Typography } from 'antd';
import { DesktopOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { ColorMode } from './theme.types';
import { TenantThemeDialog } from './TenantThemeDialog';
import { useThemeSettings } from './useThemeSettings';

const { Text } = Typography;

const CONTROL_GAP = 12;

const COLOR_MODE_OPTIONS = [
    { value: ColorMode.Light, label: 'Light', icon: <SunOutlined /> },
    { value: ColorMode.Dark, label: 'Dark', icon: <MoonOutlined /> },
    { value: ColorMode.System, label: 'System', icon: <DesktopOutlined /> },
];

/* The colour-mode switch and the tenant toggle, shared by every page that has a toolbar — flipping
   either one while looking at a component is the point of the whole demo, so no page should have to
   re-implement them. */
export const ThemeControls = () => {
    const { colorMode, setColorMode, useTenant, setUseTenant, tenantColors, setTenantColors } = useThemeSettings();
    const [configureOpen, setConfigureOpen] = useState(false);

    return (
        <>
            <Segmented<ColorMode> size="small" options={COLOR_MODE_OPTIONS} value={colorMode} onChange={setColorMode} />

            <Divider orientation="vertical" />

            <Flex align="center" gap={CONTROL_GAP}>
                <Switch checked={useTenant} aria-label="Use tenant theme" onChange={setUseTenant} />
                <Text strong>Use tenant theme</Text>
                <Button size="small" disabled={!useTenant} onClick={() => setConfigureOpen(true)}>
                    Configure
                </Button>
                <Text type="secondary">(builds the theme from a ColorSchema)</Text>
            </Flex>

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
        </>
    );
};
