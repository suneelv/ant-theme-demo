import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppThemeProvider } from './theme/AppThemeProvider';
import { ThemeSettingsProvider } from './theme/ThemeSettingsProvider';
import { ThemeDemo } from './ThemeDemo/ThemeDemo';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeSettingsProvider>
            <AppThemeProvider>
                <ThemeDemo />
            </AppThemeProvider>
        </ThemeSettingsProvider>
    </StrictMode>,
);
