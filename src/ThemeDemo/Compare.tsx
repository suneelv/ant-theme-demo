import type { ReactNode } from 'react';
import { ConfigProvider, Typography, theme } from 'antd';
import type { ThemeConfig } from 'antd';
import { useResolvedColorMode } from '../theme/useResolvedColorMode';
import { ColorMode } from '../theme/theme.types';
import { useDemoStyles } from './useDemoStyles';

const { Text } = Typography;

interface WrapperProps {
    children: ReactNode;
}

/* Stock Ant Design in the CURRENT colour mode, so the mode is never the variable between columns.
   `inherit: false` matters: a nested ConfigProvider merges with its parent by default, which would
   leak this theme into the column that exists to show Ant Design without it. */
export const Stock = ({ children }: WrapperProps) => {
    const colorMode = useResolvedColorMode();

    return (
        <ConfigProvider
            theme={{
                inherit: false,
                algorithm: colorMode === ColorMode.Dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            {children}
        </ConfigProvider>
    );
};

interface CompareColumnProps {
    label: string;
    /* What this column is doing, in a phrase — usually the token value it resolves to. */
    caption?: string;
    children: ReactNode;
}

export const CompareColumn = ({ label, caption, children }: CompareColumnProps) => {
    const { styles } = useDemoStyles();
    const { token } = theme.useToken();

    return (
        <div className={styles.compareColumn}>
            <Text strong>{label}</Text>
            {caption ? (
                <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                    {caption}
                </Text>
            ) : null}
            {children}
        </div>
    );
};

interface CompareProps {
    /* A phrase naming what each column resolves to. Keep them parallel — the pair is read across. */
    ours?: string;
    stock?: string;
    children: ReactNode;
}

/* The page's default shape: the same markup twice, this theme on the left and stock Ant Design on
   the right. `children` is one element description rendered in two places, so anything stateful
   inside it gets its own instance per column. */
export const Compare = ({ ours, stock, children }: CompareProps) => {
    const { styles } = useDemoStyles();

    return (
        <div className={styles.compareGrid}>
            <CompareColumn label="This theme" caption={ours}>
                {children}
            </CompareColumn>
            <Stock>
                <CompareColumn label="Stock Ant Design" caption={stock}>
                    {children}
                </CompareColumn>
            </Stock>
        </div>
    );
};

interface CompareTrioProps {
    /* The demonstrated component put back on Ant Design's own formulas — see derivedTokens.ts. */
    unpinned: ThemeConfig['components'];
    ours?: string;
    middle?: string;
    stock?: string;
    children: ReactNode;
}

/* For the sizes theme.ts pins from the design export. Those pins restore Ant Design's own value at
   a 32px control, so a two-column card would show two identical columns: the difference is against
   what the raised control scale WOULD have derived, which is the middle column. */
export const CompareTrio = ({ unpinned, ours, middle, stock, children }: CompareTrioProps) => {
    const { styles } = useDemoStyles();

    return (
        <div className={styles.compareTrio}>
            <CompareColumn label="This theme — pinned" caption={ours}>
                {children}
            </CompareColumn>
            <ConfigProvider theme={{ components: unpinned }}>
                <CompareColumn label="Without the pins" caption={middle}>
                    {children}
                </CompareColumn>
            </ConfigProvider>
            <Stock>
                <CompareColumn label="Stock Ant Design" caption={stock}>
                    {children}
                </CompareColumn>
            </Stock>
        </div>
    );
};
