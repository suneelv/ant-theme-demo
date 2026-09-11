import { useSyncExternalStore } from 'react';
import { ColorMode, type ResolvedColorMode } from './theme.types';
import { useThemeSettings } from './useThemeSettings';

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

const subscribe = (onChange: () => void) => {
    const query = window.matchMedia(DARK_SCHEME_QUERY);

    query.addEventListener('change', onChange);

    return () => query.removeEventListener('change', onChange);
};

const getSystemPrefersDark = () => window.matchMedia(DARK_SCHEME_QUERY).matches;

/* The mode the theme is actually built in: `system` follows the OS preference live. */
export const useResolvedColorMode = (): ResolvedColorMode => {
    const { colorMode } = useThemeSettings();
    const systemPrefersDark = useSyncExternalStore(subscribe, getSystemPrefersDark);

    if (colorMode !== ColorMode.System) return colorMode;

    return systemPrefersDark ? ColorMode.Dark : ColorMode.Light;
};
