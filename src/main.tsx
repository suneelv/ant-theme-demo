import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { AppThemeProvider } from './theme/AppThemeProvider';
import { ThemeSettingsProvider } from './theme/ThemeSettingsProvider';
import { router } from './router/router';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeSettingsProvider>
            <AppThemeProvider>
                <RouterProvider router={router} />
            </AppThemeProvider>
        </ThemeSettingsProvider>
    </StrictMode>,
);
