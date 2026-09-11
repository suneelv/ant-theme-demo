import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { loadSettings, saveSettings } from './settingsStorage';
import type { ColorMode, ColorSchema } from './theme.types';
import { ThemeSettingsContext } from './themeSettingsContext';

interface Props {
    children: ReactNode;
}

export const ThemeSettingsProvider = ({ children }: Props) => {
    const [initial] = useState(loadSettings);
    const [colorMode, setColorMode] = useState<ColorMode>(initial.colorMode);
    const [useTenant, setUseTenant] = useState(initial.useTenant);
    const [tenantColors, setTenantColors] = useState<ColorSchema>(initial.tenantColors);

    useEffect(() => {
        saveSettings({ colorMode, useTenant, tenantColors });
    }, [colorMode, useTenant, tenantColors]);

    const value = useMemo(
        () => ({ colorMode, setColorMode, useTenant, setUseTenant, tenantColors, setTenantColors }),
        [colorMode, useTenant, tenantColors],
    );

    return <ThemeSettingsContext.Provider value={value}>{children}</ThemeSettingsContext.Provider>;
};
