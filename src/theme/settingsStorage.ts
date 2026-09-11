import { ColorMode, isColorMode, type ColorSchema } from './theme.types';
import { DEFAULT_TENANT_COLORS } from './tenantDefaults';

const STORAGE_KEY = 'ant-theme-demo:settings';

export interface StoredSettings {
    colorMode: ColorMode;
    useTenant: boolean;
    tenantColors: ColorSchema;
}

export const DEFAULT_SETTINGS: StoredSettings = {
    colorMode: ColorMode.System,
    useTenant: false,
    tenantColors: DEFAULT_TENANT_COLORS,
};

const isColorSchema = (value: unknown): value is ColorSchema =>
    typeof value === 'object' &&
    value !== null &&
    Object.keys(DEFAULT_TENANT_COLORS).every((key) => typeof (value as Record<string, unknown>)[key] === 'string');

/* Storage can be blocked or hold a stale shape, so every field falls back on its own. */
export const loadSettings = (): StoredSettings => {
    try {
        const parsed: Partial<Record<keyof StoredSettings, unknown>> = JSON.parse(
            localStorage.getItem(STORAGE_KEY) ?? '{}',
        );

        return {
            colorMode: isColorMode(parsed.colorMode) ? parsed.colorMode : DEFAULT_SETTINGS.colorMode,
            useTenant: typeof parsed.useTenant === 'boolean' ? parsed.useTenant : DEFAULT_SETTINGS.useTenant,
            tenantColors: isColorSchema(parsed.tenantColors) ? parsed.tenantColors : DEFAULT_SETTINGS.tenantColors,
        };
    } catch {
        return DEFAULT_SETTINGS;
    }
};

export const saveSettings = (settings: StoredSettings) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
        /* Persistence is a convenience; the page works without it. */
    }
};
