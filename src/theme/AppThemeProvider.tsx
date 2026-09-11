import { useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { ConfigProvider, theme } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { buildAppTheme } from './theme';
import { ColorMode } from './theme.types';
import { useResolvedColorMode } from './useResolvedColorMode';
import { useThemeSettings } from './useThemeSettings';

interface Props {
    children: ReactNode;
}

/* Paints the document itself, so overscroll and the area outside the page follow the theme too. */
const DocumentSurface = () => {
    const { token } = theme.useToken();
    const colorMode = useResolvedColorMode();

    useEffect(() => {
        const { style } = document.body;

        style.background = token.colorBgLayout;
        style.color = token.colorText;
        document.documentElement.style.colorScheme = colorMode === ColorMode.Dark ? 'dark' : 'light';
    }, [token.colorBgLayout, token.colorText, colorMode]);

    return null;
};

export const AppThemeProvider = ({ children }: Props) => {
    const { useTenant, tenantColors } = useThemeSettings();
    const colorMode = useResolvedColorMode();

    const themeConfig = useMemo(
        () => buildAppTheme(useTenant ? tenantColors : null, colorMode),
        [useTenant, tenantColors, colorMode],
    );

    return (
        <ConfigProvider
            theme={themeConfig}
            // antd v6 defaults Tag to the borderless "filled" variant; the Figma kit tag is outlined.
            tag={{ variant: 'outlined' }}
            spin={{ indicator: <LoadingOutlined spin /> }}
        >
            <DocumentSurface />
            {children}
        </ConfigProvider>
    );
};
