import { createContext } from 'react';
import type { UseThemeSettings } from './useThemeSettings';

export const ThemeSettingsContext = createContext<UseThemeSettings | null>(null);
