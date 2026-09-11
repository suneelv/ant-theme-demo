import { useContext } from 'react';
import type { ColorMode, ColorSchema } from './theme.types';
import { ThemeSettingsContext } from './themeSettingsContext';

export interface UseThemeSettings {
    /* The user's choice, which may be `system` — resolve it with useResolvedColorMode. */
    colorMode: ColorMode;
    setColorMode: (colorMode: ColorMode) => void;
    /* When off, the brand (teal) theme is built and tenantColors is ignored. */
    useTenant: boolean;
    setUseTenant: (useTenant: boolean) => void;
    tenantColors: ColorSchema;
    setTenantColors: (colors: ColorSchema) => void;
}

export const useThemeSettings = (): UseThemeSettings => {
    const settings = useContext(ThemeSettingsContext);

    if (!settings) throw new Error('useThemeSettings must be used inside ThemeSettingsProvider');

    return settings;
};
