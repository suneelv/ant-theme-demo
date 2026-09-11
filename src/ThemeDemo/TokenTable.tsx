import { Table, Tag, Typography, theme } from 'antd';
import type { TableColumnsType } from 'antd';
import { useStockToken } from './useStockToken';
import { useDemoStyles } from './useDemoStyles';

const { Text } = Typography;

interface TokenRow {
    name: string;
    applied: string;
    antd: string;
    changed: boolean;
}

const COLUMNS: TableColumnsType<TokenRow> = [
    {
        title: 'Token',
        dataIndex: 'name',
        key: 'name',
        render: (name: string) => <Text code>{name}</Text>,
    },
    {
        title: 'Applied',
        dataIndex: 'applied',
        key: 'applied',
        render: (value: string, row) => (row.changed ? <Text strong>{value}</Text> : <Text>{value}</Text>),
    },
    { title: 'Ant Design', dataIndex: 'antd', key: 'antd' },
    {
        title: '',
        key: 'changed',
        width: 110,
        render: (_, row) =>
            row.changed ? <Tag color="processing">changed</Tag> : <Text type="secondary">inherited</Text>,
    },
];

interface Props {
    tokens: string[];
}

/* A plain value table for tokens whose meaning is a number, not a colour — rendering a swatch for
   `controlHeight: 40` shows nothing, where the number beside antd's own tells the whole story. */
export const TokenTable = ({ tokens }: Props) => {
    const { token } = theme.useToken();
    const { stock } = useStockToken();
    const { styles } = useDemoStyles();
    const live = token as unknown as Record<string, unknown>;

    const rows: TokenRow[] = tokens.map((name) => {
        const applied = String(live[name]);
        const antd = String(stock[name]);

        return { name, applied, antd, changed: applied !== antd };
    });

    return (
        <Table<TokenRow>
            className={styles.deltaValue}
            rowKey="name"
            size="small"
            columns={COLUMNS}
            dataSource={rows}
            pagination={false}
        />
    );
};
