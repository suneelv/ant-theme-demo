import { useMemo } from 'react';
import { theme } from 'antd';
import { useResolvedColorMode } from '../theme/useResolvedColorMode';
import { ColorMode } from '../theme/theme.types';

const { getDesignToken, darkAlgorithm, defaultAlgorithm } = theme;

export interface UseStockToken {
    stock: Record<string, unknown>;
}

/* Stock Ant Design's resolved token in the CURRENT colour mode — the baseline every comparison on
   this page is made against. Shared so the delta table and the inline token tables cannot drift. */
export const useStockToken = (): UseStockToken => {
    const colorMode = useResolvedColorMode();

    return useMemo(() => {
        const algorithm = colorMode === ColorMode.Dark ? darkAlgorithm : defaultAlgorithm;

        return { stock: getDesignToken({ algorithm }) as unknown as Record<string, unknown> };
    }, [colorMode]);
};
