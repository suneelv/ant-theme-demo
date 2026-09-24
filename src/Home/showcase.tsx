import type { ReactNode } from 'react';
import { Card, Flex, Typography } from 'antd';
import { useShowcaseStyles } from './useShowcaseStyles';

const { Title, Text, Paragraph } = Typography;

const GROUP_GAP = 12;
const ROW_GAP = 20;

interface GroupProps {
    /* Stable DOM id — the jump links at the top of the page scroll to it. */
    id: string;
    title: string;
    summary: string;
    children: ReactNode;
}

export const Group = ({ id, title, summary, children }: GroupProps) => {
    const { styles } = useShowcaseStyles();

    return (
        <section id={id} className={styles.group}>
            <Title level={3}>{title}</Title>
            <Paragraph type="secondary">{summary}</Paragraph>
            <Flex vertical gap={GROUP_GAP}>
                {children}
            </Flex>
        </section>
    );
};

interface DemoProps {
    id: string;
    title: string;
    /* One line on what the theme does to this component, where it does anything at all. */
    note?: string;
    extra?: ReactNode;
    children: ReactNode;
}

export const Demo = ({ id, title, note, extra, children }: DemoProps) => {
    const { styles } = useShowcaseStyles();

    return (
        <Card id={id} className={styles.demo} size="small" title={title} extra={extra} variant="outlined">
            {note ? <Paragraph type="secondary">{note}</Paragraph> : null}
            <Flex vertical gap={ROW_GAP}>
                {children}
            </Flex>
        </Card>
    );
};

interface RowProps {
    /* Names the variant the row shows, so the row is readable without counting props. */
    label: string;
    children: ReactNode;
}

export const Row = ({ label, children }: RowProps) => {
    const { styles } = useShowcaseStyles();

    return (
        <div className={styles.row}>
            <div className={styles.rowLabel}>{label}</div>
            <div className={styles.rowBody}>{children}</div>
        </div>
    );
};

interface WideProps {
    children: ReactNode;
}

/* For a specimen that is wider than the card — a table, a calendar, a long tab strip. */
export const Wide = ({ children }: WideProps) => {
    const { styles } = useShowcaseStyles();

    return <div className={styles.wide}>{children}</div>;
};

interface UsedProps {
    children: ReactNode;
}

/* Marks a variant the app itself ships, as opposed to one that is here for completeness. */
export const Used = ({ children }: UsedProps) => (
    <Text type="secondary" style={{ fontSize: 12 }}>
        In the app: {children}
    </Text>
);
