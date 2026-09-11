import { Table, Tag, Typography } from 'antd';
import type { TableColumnsType } from 'antd';
import { gradeContrast } from './contrast';
import type { ContrastGrade } from './contrast';
import { useContrastRows } from './useContrastRows';
import type { ContrastRow } from './useContrastRows';
import { useDemoStyles } from './useDemoStyles';

const { Text } = Typography;

/* Two decimals because the interesting failures sit just under 4.5, where one decimal rounds a
   4.46 up to a passing-looking 4.5. */
const RATIO_DIGITS = 2;

const SAMPLE_TEXT = 'The quick brown fox';

const GRADE_COLOUR: Record<ContrastGrade, string> = {
    AAA: 'success',
    AA: 'success',
    'AA Large': 'warning',
    Fail: 'error',
};

interface SampleProps {
    color: string;
    background: string;
}

/* `background` is always the composited opaque colour, never the raw alpha token: a translucent
   sample would take its real colour from whatever sits behind the table, and the ratio printed
   beside it would quietly stop describing it. */
const Sample = ({ color, background }: SampleProps) => {
    const { styles } = useDemoStyles();

    return (
        <div className={styles.contrastSample} style={{ background, color }}>
            {SAMPLE_TEXT}
        </div>
    );
};

interface RatioProps {
    ratio: number;
}

const Ratio = ({ ratio }: RatioProps) => {
    const grade = gradeContrast(ratio);

    return (
        <>
            <Text strong>{ratio.toFixed(RATIO_DIGITS)}</Text>{' '}
            <Tag color={GRADE_COLOUR[grade]} style={{ marginInlineEnd: 0 }}>
                {grade}
            </Tag>
        </>
    );
};

interface ContrastTableProps {
    tokens: string[];
}

/* Every text token measured against both light-mode surfaces at once, so the column that fails is
   the one that needs the design decision — not the token. */
export const ContrastTable = ({ tokens }: ContrastTableProps) => {
    const { styles } = useDemoStyles();
    const { rows, plain, tinted, tintedSource } = useContrastRows(tokens);

    const columns: TableColumnsType<ContrastRow> = [
        {
            title: 'Token',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, row) => (
                <>
                    <Text code>{name}</Text>
                    <div className={styles.mono}>{row.value}</div>
                </>
            ),
        },
        {
            title: `colorBgContainer — ${plain}`,
            children: [
                {
                    title: 'Sample',
                    key: 'plainSample',
                    render: (_, row) => <Sample color={row.value} background={plain} />,
                },
                {
                    title: 'Contrast',
                    key: 'plainRatio',
                    width: 140,
                    render: (_, row) => <Ratio ratio={row.plainRatio} />,
                },
            ],
        },
        {
            title: `colorFillQuaternary ${tintedSource} on ${plain} — ${tinted}`,
            children: [
                {
                    title: 'Sample',
                    key: 'tintedSample',
                    render: (_, row) => <Sample color={row.value} background={tinted} />,
                },
                {
                    title: 'Contrast',
                    key: 'tintedRatio',
                    width: 140,
                    render: (_, row) => <Ratio ratio={row.tintedRatio} />,
                },
            ],
        },
    ];

    return <Table<ContrastRow> rowKey="name" size="small" columns={columns} dataSource={rows} pagination={false} />;
};
