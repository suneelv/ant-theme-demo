import { Button, Collapse, Table, Tag, Typography } from 'antd';
import type { TableColumnsType } from 'antd';
import { useCoverage } from './coverage';
import { useDemoStyles } from './useDemoStyles';
import { useThemeDiff } from './useThemeDiff';
import type { ThemeDelta } from './useThemeDiff';

const { Text, Paragraph } = Typography;

const scrollToSpecimen = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

interface ValueCellProps {
    value: string;
    isColor: boolean;
}

const ValueCell = ({ value, isColor }: ValueCellProps) => {
    const { styles } = useDemoStyles();

    return (
        <span className={styles.deltaValue}>
            {isColor ? <span className={styles.deltaSwatch} style={{ background: value }} /> : null}
            {value}
        </span>
    );
};

export const DeltaTable = () => {
    const { groups, total, names } = useThemeDiff();
    const { anchors } = useCoverage();
    const shown = names.filter((name) => anchors[name]).length;

    const columns: TableColumnsType<ThemeDelta> = [
        {
            title: 'Token',
            dataIndex: 'name',
            key: 'name',
            render: (name: string) => <Text code>{name}</Text>,
        },
        {
            title: 'Ours',
            dataIndex: 'ours',
            key: 'ours',
            render: (value: string, row) => <ValueCell value={value} isColor={row.isColor} />,
        },
        {
            title: 'Ant Design',
            dataIndex: 'antd',
            key: 'antd',
            render: (value: string, row) => <ValueCell value={value} isColor={row.isColor} />,
        },
        {
            title: 'Shown',
            key: 'shown',
            width: 160,
            render: (_, row) =>
                anchors[row.name] ? (
                    <Button type="link" size="small" onClick={() => scrollToSpecimen(anchors[row.name])}>
                        Go to specimen
                    </Button>
                ) : (
                    <Text type="secondary">not demonstrated</Text>
                ),
        },
    ];

    return (
        <>
            <Paragraph type="secondary">
                {total} tokens differ from stock Ant Design in the current colour mode. {shown} of them have a specimen
                on this page — the rest change something the page does not yet show.
            </Paragraph>
            <Collapse
                items={groups.map((group) => ({
                    key: group.id,
                    label: (
                        <>
                            {group.title} <Tag variant="filled">{group.deltas.length}</Tag>
                            <Text type="secondary">{group.hint}</Text>
                        </>
                    ),
                    children: (
                        <Table<ThemeDelta>
                            rowKey="name"
                            size="small"
                            columns={columns}
                            dataSource={group.deltas}
                            pagination={false}
                        />
                    ),
                }))}
            />
        </>
    );
};
