import {
    Avatar,
    Badge,
    Button,
    Card,
    Collapse,
    Descriptions,
    Empty,
    Flex,
    Popover,
    Segmented,
    Table,
    Tabs,
    Tag,
    Timeline,
    Tooltip,
    Tree,
    theme,
} from 'antd';
import type { TableColumnsType } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Section } from '../primitives';
import { Specimen } from '../Specimen';
import { Compare, CompareTrio } from '../Compare';
import { unpinnedTabs } from '../derivedTokens';

const STATUSES = ['success', 'warning', 'error', 'info'] as const;

type Status = (typeof STATUSES)[number];

interface DemoRow {
    key: string;
    name: string;
    status: Status;
    reading: number;
}

const TABLE_ROWS: DemoRow[] = [
    { key: '1', name: 'Sensor A — lobby', status: 'success', reading: 21.4 },
    { key: '2', name: 'Sensor B — atrium', status: 'warning', reading: 27.9 },
    { key: '3', name: 'Sensor C — plant room', status: 'error', reading: 34.2 },
];

const TREE_DATA = [
    {
        title: 'Building',
        key: 'building',
        children: [
            { title: 'Floor 1', key: 'floor-1', children: [{ title: 'Room 101', key: 'room-101' }] },
            { title: 'Floor 2', key: 'floor-2' },
        ],
    },
];

const TAB_ITEMS = [
    { key: '1', label: 'Tab one', children: 'Tab one content' },
    { key: '2', label: 'Tab two', children: 'Tab two content' },
    { key: '3', label: 'Disabled', children: 'x', disabled: true },
];

const BADGE_COUNT = 5;

const COLUMNS: TableColumnsType<DemoRow> = [
    { title: 'Device', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (value: Status) => <Badge status={value === 'info' ? 'processing' : value} text={value} />,
    },
    {
        title: 'Tag',
        dataIndex: 'status',
        key: 'tag',
        render: (value: Status) => <Tag color={value === 'info' ? 'processing' : value}>{value.toUpperCase()}</Tag>,
    },
    {
        title: 'Reading (°C)',
        dataIndex: 'reading',
        key: 'reading',
        align: 'right',
        sorter: (a, b) => a.reading - b.reading,
    },
];

const DemoTable = () => (
    <Table<DemoRow>
        columns={COLUMNS}
        dataSource={TABLE_ROWS}
        pagination={false}
        size="middle"
        rowSelection={{}}
        footer={() => 'Table footer'}
    />
);

const Tags = () => {
    const { token } = theme.useToken();

    return (
        <Flex gap={token.marginXS} wrap>
            <Tag color="success">success</Tag>
            <Tag color="warning">warning</Tag>
            <Tag color="error">error</Tag>
            <Tag color="processing">processing</Tag>
            <Tag color="default">default</Tag>
            <Tag variant="filled" color="success">
                filled
            </Tag>
            <Tag closable>closable</Tag>
            <Tag.CheckableTag checked>checkable</Tag.CheckableTag>
        </Flex>
    );
};

const Cards = () => {
    const { token } = theme.useToken();

    return (
        <Flex vertical gap={token.margin}>
            <Card title="Default card" extra={<Button type="link">More</Button>}>
                Card body text.
            </Card>
            <Card size="small" title="Small card">
                Card body text.
            </Card>
        </Flex>
    );
};

const BadgesAndAvatars = () => {
    const { token } = theme.useToken();

    return (
        <Flex gap={token.marginLG} wrap align="center">
            {STATUSES.map((status) => (
                <Badge key={status} status={status === 'info' ? 'processing' : status} text={status} />
            ))}
            <Badge count={BADGE_COUNT}>
                <Button>Count</Button>
            </Badge>
            <Badge dot>
                <Button>Dot</Button>
            </Badge>
            <Avatar size="large">SA</Avatar>
            <Avatar>SA</Avatar>
            <Avatar size="small">SA</Avatar>
            <Avatar icon={<UserOutlined />} />
        </Flex>
    );
};

const TabSet = () => {
    const { token } = theme.useToken();

    return (
        <Flex vertical gap={token.margin}>
            <Tabs type="card" size="large" items={TAB_ITEMS} />
            <Tabs type="card" items={TAB_ITEMS} />
            <Tabs type="card" size="small" items={TAB_ITEMS} />
            <Tabs items={TAB_ITEMS} />
        </Flex>
    );
};

const UnpinnedTabs = () => {
    const { token } = theme.useToken();

    return (
        <CompareTrio
            unpinned={unpinnedTabs(token)}
            ours="48 · 40 · 32"
            middle="56 · 48 · 40 — LG + 8, controlHeightLG, controlHeight"
            stock="48 · 40 · 32"
        >
            <TabSet />
        </CompareTrio>
    );
};

const Overlays = () => {
    const { token } = theme.useToken();

    return (
        <Flex gap={token.margin} wrap>
            <Tooltip title="Tooltip content">
                <Button>Hover for tooltip</Button>
            </Tooltip>
            <Popover title="Popover title" content="Popover content sits on colorBgElevated.">
                <Button>Hover for popover</Button>
            </Popover>
        </Flex>
    );
};

const Containers = () => {
    const { token } = theme.useToken();

    return (
        <>
            <Collapse
                items={[
                    { key: '1', label: 'First panel', children: 'Panel content' },
                    { key: '2', label: 'Second panel', children: 'Panel content' },
                ]}
            />
            <Descriptions
                bordered
                size="small"
                column={1}
                style={{ marginTop: token.margin }}
                items={[
                    { key: '1', label: 'colorPrimary', children: token.colorPrimary },
                    { key: '2', label: 'controlHeight', children: token.controlHeight },
                    { key: '3', label: 'borderRadius', children: token.borderRadius },
                ]}
            />
            <Flex gap={token.margin} wrap align="flex-start" style={{ marginTop: token.margin }}>
                <Segmented options={['Day', 'Week', 'Month']} />
                <Tree defaultExpandAll checkable treeData={TREE_DATA} />
            </Flex>
        </>
    );
};

const TimelineAndEmpty = () => {
    const { token } = theme.useToken();

    return (
        <Flex gap={token.marginLG} wrap align="flex-start">
            <Timeline
                items={[
                    { color: token.colorSuccess, content: 'Success event' },
                    { color: token.colorWarning, content: 'Warning event' },
                    { color: token.colorError, content: 'Error event' },
                ]}
            />
            <Empty />
        </Flex>
    );
};

export const DataDisplay = () => (
    <Section
        id="group-data-display"
        title="Data display"
        summary="Almost nothing here is overridden — this group is mostly the global tokens landing on components that never asked for them."
    >
        <Specimen
            id="table"
            title="Table"
            note="Header, footer and sorted-column tints all derive from colorTextBase, so they follow the tenant font colour rather than a pinned grey. Click a column header in each side and compare the sorted tint. What else to look for: the row height, which follows the control scale, and the checkbox, which does not — it is pinned to 16, so our rows are taller around the same square."
        >
            <Compare ours="controlHeight 40 · checkbox 16" stock="controlHeight 32 · checkbox 16">
                <DemoTable />
            </Compare>
        </Specimen>

        <Specimen
            id="tag"
            title="Tag"
            tokens={['Tag.borderRadiusSM']}
            note="What to look for is the shape of the ends. Ours is a full pill; antd's is a 4px rounded rectangle. The radius sits on the Tag root rather than a variant, so filled, outlined, closable and checkable all get it. The status colours differ too — our tints come from the export, antd's from its own palette."
        >
            <Compare ours="borderRadiusSM 999999 — a pill" stock="borderRadiusSM 4">
                <Tags />
            </Compare>
        </Specimen>

        <Specimen
            id="card"
            title="Card"
            note="Not overridden. The header height follows the control scale and the radius is antd's own, so the only difference is that ours is a little taller in the head."
        >
            <Compare ours="controlHeight 40" stock="controlHeight 32">
                <Cards />
            </Compare>
        </Specimen>

        <Specimen
            id="badge-avatar"
            title="Badge and Avatar"
            tokens={['Avatar.textFontSize', 'Avatar.textFontSizeLG']}
            note="What to look for is the initials inside the avatar circles, not the circles themselves — those are antd's own sizes in both columns. Ours sets the text to 18 (24 at large) against antd's flat 14, so the letters fill the circle instead of floating in it."
        >
            <Compare ours="avatar text 18 / 24" stock="avatar text 14 at every size">
                <BadgesAndAvatars />
            </Compare>
        </Specimen>

        <Specimen
            id="tabs"
            title="Tabs — card height"
            tokens={['Tabs.cardHeight', 'Tabs.cardHeightSM', 'Tabs.cardHeightLG']}
            note="Only the card variant is pinned; the line variant at the bottom takes its height from padding and is the same in every column. What to look for is the height of the tab shoulders in the top three rows, large to small. None of these three tokens is applied as a height — Ant Design spends each one on the card's vertical padding, half the difference between it and the line height. Left unpinned it derives them from controlHeightLG + 8, controlHeightLG and controlHeight, which at our scale is 56 / 48 / 40; the pins hold 48 / 40 / 32, antd's own values at a 40px large control. The small pin is the one that was missing: the design export spells the key cardHeighSM."
        >
            <UnpinnedTabs />
        </Specimen>

        <Specimen
            id="tooltip-popover"
            title="Tooltip and Popover"
            note="Not overridden. Both sit on colorBgElevated and take antd's radius; in dark mode the surface differs because the theme pins its own elevated background."
        >
            <Compare>
                <Overlays />
            </Compare>
        </Specimen>

        <Specimen
            id="collapse-descriptions"
            title="Collapse, Descriptions, Segmented and Tree"
            tokens={['colorSplit']}
            note="Every hairline in this card is colorSplit and every row height comes from the control scale. What to look for is the Segmented control, which is a full control-height strip in ours and visibly shorter in antd's, and the Tree, whose rows follow controlHeightSM."
        >
            <Compare ours="controlHeight 40" stock="controlHeight 32">
                <Containers />
            </Compare>
        </Specimen>

        <Specimen
            id="timeline-empty"
            title="Timeline and Empty"
            note="Not overridden. The dots take the status colours straight from the ramps, so the difference is entirely colour: our success green and error red against antd's."
        >
            <Compare>
                <TimelineAndEmpty />
            </Compare>
        </Specimen>
    </Section>
);
