import { useState } from 'react';
import {
    Avatar,
    Badge,
    Button,
    Calendar,
    Card,
    Collapse,
    Descriptions,
    Empty,
    Popover,
    Segmented,
    Table,
    Tag,
    Tooltip,
    Tree,
    Typography,
    theme,
} from 'antd';
import type { TableColumnsType } from 'antd';
import {
    AppstoreOutlined,
    BarsOutlined,
    BellOutlined,
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { Demo, Group, Row, Used, Wide } from '../showcase';

const { Text, Paragraph } = Typography;

const STATUSES = ['success', 'processing', 'warning', 'error', 'default'] as const;

const PRESET_COLORS = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
];

const CARD_WIDTH = 300;
const CALENDAR_WIDTH = 320;
const BADGE_COUNT = 5;
const BADGE_OVERFLOW = 120;
const CALENDAR_DATE = dayjs('2026-01-12');

type RowStatus = 'success' | 'warning' | 'error';

interface DeviceRow {
    key: string;
    name: string;
    location: string;
    status: RowStatus;
    reading: number;
}

const TABLE_ROWS: DeviceRow[] = [
    { key: '1', name: 'Sensor A', location: 'Lobby', status: 'success', reading: 21.4 },
    { key: '2', name: 'Sensor B', location: 'Atrium', status: 'warning', reading: 27.9 },
    { key: '3', name: 'Sensor C', location: 'Plant room', status: 'error', reading: 34.2 },
];

const COLUMNS: TableColumnsType<DeviceRow> = [
    { title: 'Device', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        filters: [
            { text: 'Lobby', value: 'Lobby' },
            { text: 'Atrium', value: 'Atrium' },
            { text: 'Plant room', value: 'Plant room' },
        ],
        onFilter: (value, record) => record.location === value,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (value: RowStatus) => <Badge status={value} text={value} />,
    },
    {
        title: 'Tag',
        dataIndex: 'status',
        key: 'tag',
        render: (value: RowStatus) => <Tag color={value}>{value.toUpperCase()}</Tag>,
    },
    {
        title: 'Reading (°C)',
        dataIndex: 'reading',
        key: 'reading',
        align: 'right',
        sorter: (a, b) => a.reading - b.reading,
    },
    {
        title: '',
        key: 'actions',
        align: 'right',
        render: () => <Button type="text" size="small" icon={<EllipsisOutlined />} />,
    },
];

const TREE_DATA = [
    {
        title: 'Building A',
        key: 'building-a',
        children: [
            { title: 'First floor', key: 'a-1', children: [{ title: 'Room 101', key: 'a-1-101' }] },
            { title: 'Second floor', key: 'a-2' },
        ],
    },
    { title: 'Building B', key: 'building-b', children: [{ title: 'Reception', key: 'b-1' }] },
];

const COLLAPSE_ITEMS = [
    { key: '1', label: 'Connection', children: <Paragraph>Panel content.</Paragraph> },
    { key: '2', label: 'Schedule', children: <Paragraph>Panel content.</Paragraph> },
    { key: '3', label: 'Disabled', children: <Paragraph>Never shown.</Paragraph>, collapsible: 'disabled' as const },
];

const Avatars = () => (
    <>
        <Row label="sizes">
            <Avatar size={64} icon={<UserOutlined />} />
            <Avatar size="large" icon={<UserOutlined />} />
            <Avatar icon={<UserOutlined />} />
            <Avatar size="small" icon={<UserOutlined />} />
        </Row>

        <Row label="content">
            <Avatar>SA</Avatar>
            <Avatar size="large">SA</Avatar>
            <Avatar size="small">SA</Avatar>
            <Avatar style={{ backgroundColor: '#008188' }}>T</Avatar>
            <Avatar shape="square" icon={<UserOutlined />} />
        </Row>

        <Row label="group">
            <Avatar.Group max={{ count: 3 }}>
                <Avatar style={{ backgroundColor: '#008188' }}>A</Avatar>
                <Avatar style={{ backgroundColor: '#006a70' }}>B</Avatar>
                <Avatar style={{ backgroundColor: '#005258' }}>C</Avatar>
                <Avatar icon={<UserOutlined />} />
            </Avatar.Group>
        </Row>
    </>
);

const Badges = () => (
    <>
        <Row label="count + dot">
            <Badge count={BADGE_COUNT}>
                <Avatar shape="square" icon={<UserOutlined />} />
            </Badge>
            <Badge count={BADGE_OVERFLOW} overflowCount={99}>
                <Avatar shape="square" icon={<BellOutlined />} />
            </Badge>
            <Badge dot>
                <Button icon={<BellOutlined />} />
            </Badge>
            <Badge count={0} showZero>
                <Avatar shape="square" icon={<UserOutlined />} />
            </Badge>
        </Row>

        <Row label="status">
            {STATUSES.map((status) => (
                <Badge key={status} status={status} text={status} />
            ))}
        </Row>

        <Row label="standalone + colour">
            <Badge count={BADGE_COUNT} />
            <Badge count={BADGE_COUNT} color="#008188" />
            <Badge count="new" />
            <Badge count={BADGE_COUNT} size="small" />
        </Row>

        <Row label="ribbon">
            <Badge.Ribbon text="Online">
                <Card size="small" style={{ width: CARD_WIDTH }}>
                    Card with a ribbon.
                </Card>
            </Badge.Ribbon>
        </Row>
    </>
);

const Calendars = () => {
    const { token } = theme.useToken();

    return (
        <>
            <Row label="compact">
                {/* The compact calendar draws no outline of its own, so it needs a box to sit in. */}
                <div
                    style={{
                        width: CALENDAR_WIDTH,
                        border: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
                        borderRadius: token.borderRadiusLG,
                    }}
                >
                    <Calendar fullscreen={false} defaultValue={CALENDAR_DATE} />
                </div>
            </Row>

            <Row label="full">
                <Wide>
                    <Calendar defaultValue={CALENDAR_DATE} />
                </Wide>
            </Row>
        </>
    );
};

const Cards = () => {
    const { token } = theme.useToken();
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <>
            <Row label="sizes + extra">
                <Card title="Default card" extra={<Button type="link">More</Button>} style={{ width: CARD_WIDTH }}>
                    Card body text.
                </Card>
                <Card
                    size="small"
                    title="Small card"
                    extra={<Button type="link">More</Button>}
                    style={{ width: CARD_WIDTH }}
                >
                    Card body text.
                </Card>
            </Row>

            <Row label="variants">
                <Card variant="borderless" title="Borderless" style={{ width: CARD_WIDTH }}>
                    No outline; leans on the surface behind it.
                </Card>
                <Card title="Outlined" style={{ width: CARD_WIDTH }}>
                    <Card type="inner" title="Inner card" extra={<Button type="link">Edit</Button>}>
                        Nested body.
                    </Card>
                </Card>
            </Row>

            <Row label="actions + loading">
                <Card
                    title="With actions"
                    style={{ width: CARD_WIDTH }}
                    actions={[
                        <SettingOutlined key="settings" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="more" />,
                    ]}
                >
                    Card body text.
                </Card>
                <Card loading title="Loading" style={{ width: CARD_WIDTH }}>
                    Never shown while loading.
                </Card>
            </Row>

            <Row label="with tabs">
                <Card
                    style={{ width: CARD_WIDTH * 2 }}
                    tabList={[
                        { key: 'overview', label: 'Overview' },
                        { key: 'history', label: 'History' },
                    ]}
                    activeTabKey={activeTab}
                    onTabChange={setActiveTab}
                >
                    <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                        {activeTab} panel
                    </Text>
                </Card>
            </Row>
        </>
    );
};

const Collapses = () => (
    <>
        <Row label="basic">
            <Wide>
                <Collapse defaultActiveKey={['1']} items={COLLAPSE_ITEMS} />
            </Wide>
        </Row>

        <Row label="accordion + ghost">
            <Wide>
                <Collapse accordion defaultActiveKey={['1']} items={COLLAPSE_ITEMS} />
                <Collapse ghost defaultActiveKey={['1']} items={COLLAPSE_ITEMS} />
            </Wide>
        </Row>

        <Row label="sizes + borderless">
            <Wide>
                <Collapse size="large" defaultActiveKey={['1']} items={COLLAPSE_ITEMS} />
                <Collapse size="small" defaultActiveKey={['1']} items={COLLAPSE_ITEMS} />
                <Collapse bordered={false} defaultActiveKey={['1']} items={COLLAPSE_ITEMS} />
            </Wide>
        </Row>

        <Row label="icon at the end">
            <Wide>
                <Collapse expandIconPosition="end" defaultActiveKey={['1']} items={COLLAPSE_ITEMS} />
            </Wide>
        </Row>
    </>
);

const DescriptionLists = () => {
    const { token } = theme.useToken();

    const items = [
        { key: '1', label: 'Device', children: 'Sensor A' },
        { key: '2', label: 'Location', children: 'Main lobby' },
        { key: '3', label: 'Status', children: <Badge status="success" text="Online" /> },
        { key: '4', label: 'Last reading', children: `${token.controlHeight} °C` },
    ];

    return (
        <>
            <Row label="bordered">
                <Wide>
                    <Descriptions bordered column={2} items={items} title="Device details" />
                </Wide>
            </Row>

            <Row label="plain + sizes">
                <Wide>
                    <Descriptions column={2} items={items} />
                    <Descriptions bordered size="small" column={1} items={items} />
                </Wide>
            </Row>

            <Row label="vertical">
                <Wide>
                    <Descriptions bordered layout="vertical" column={4} items={items} />
                </Wide>
            </Row>
        </>
    );
};

const Empties = () => (
    <>
        <Row label="default">
            <Empty />
        </Row>

        <Row label="simple + custom">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            <Empty description="No devices in this wing yet">
                <Button type="primary">Add device</Button>
            </Empty>
            <Empty description={false} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Row>
    </>
);

const Popovers = () => (
    <>
        <Row label="triggers">
            <Popover title="Popover title" content="Popover content sits on colorBgElevated.">
                <Button>Hover</Button>
            </Popover>
            <Popover title="Popover title" content="Click to open, click outside to close." trigger="click">
                <Button>Click</Button>
            </Popover>
            <Popover content={<Button type="text">An action inside the popover</Button>} trigger="click">
                <Button type="primary">Interactive content</Button>
            </Popover>
        </Row>

        <Row label="placements">
            {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
                <Popover key={placement} placement={placement} title={placement} content="Popover content">
                    <Button>{placement}</Button>
                </Popover>
            ))}
        </Row>
    </>
);

const Segmenteds = () => (
    <>
        <Row label="basic">
            <Segmented options={['Day', 'Week', 'Month']} defaultValue="Week" />
            <Segmented options={['Day', 'Week', 'Month']} disabled />
        </Row>

        <Row label="with icons">
            <Segmented
                options={[
                    { value: 'list', icon: <BarsOutlined /> },
                    { value: 'grid', icon: <AppstoreOutlined /> },
                ]}
            />
            <Segmented
                options={[
                    { value: 'list', label: 'List', icon: <BarsOutlined /> },
                    { value: 'grid', label: 'Grid', icon: <AppstoreOutlined /> },
                ]}
            />
        </Row>

        <Row label="sizes + shape">
            <Segmented size="large" options={['Day', 'Week', 'Month']} />
            <Segmented options={['Day', 'Week', 'Month']} />
            <Segmented size="small" options={['Day', 'Week', 'Month']} />
            <Segmented shape="round" options={['Day', 'Week', 'Month']} />
        </Row>

        <Row label="block + vertical">
            <Wide>
                <Segmented block options={['Day', 'Week', 'Month']} />
            </Wide>
            <Segmented vertical options={['Day', 'Week', 'Month']} />
        </Row>
    </>
);

const Tables = () => (
    <>
        <Row label="default">
            <Wide>
                <Table<DeviceRow>
                    columns={COLUMNS}
                    dataSource={TABLE_ROWS}
                    rowSelection={{}}
                    pagination={{ pageSize: 5, showSizeChanger: true }}
                />
            </Wide>
        </Row>

        <Row label="sizes + bordered">
            <Wide>
                <Table<DeviceRow> size="small" bordered columns={COLUMNS} dataSource={TABLE_ROWS} pagination={false} />
                <Table<DeviceRow>
                    size="middle"
                    columns={COLUMNS}
                    dataSource={TABLE_ROWS}
                    pagination={false}
                    title={() => 'Table title'}
                    footer={() => 'Table footer'}
                />
            </Wide>
        </Row>

        <Row label="expandable + loading">
            <Wide>
                <Table<DeviceRow>
                    size="small"
                    columns={COLUMNS}
                    dataSource={TABLE_ROWS}
                    pagination={false}
                    expandable={{ expandedRowRender: (record) => <Text type="secondary">{record.name} history</Text> }}
                />
                <Table<DeviceRow> size="small" loading columns={COLUMNS} dataSource={TABLE_ROWS} pagination={false} />
            </Wide>
        </Row>

        <Row label="empty">
            <Wide>
                <Table<DeviceRow> size="small" columns={COLUMNS} dataSource={[]} pagination={false} />
            </Wide>
        </Row>
    </>
);

const Tags = () => (
    <>
        <Row label="status">
            <Tag color="success">success</Tag>
            <Tag color="processing">processing</Tag>
            <Tag color="warning">warning</Tag>
            <Tag color="error">error</Tag>
            <Tag color="default">default</Tag>
        </Row>

        <Row label="variants">
            <Tag>outlined (the app default)</Tag>
            <Tag variant="filled" color="success">
                filled
            </Tag>
            <Tag variant="solid" color="success">
                solid
            </Tag>
        </Row>

        <Row label="preset colours">
            {PRESET_COLORS.map((color) => (
                <Tag key={color} color={color}>
                    {color}
                </Tag>
            ))}
        </Row>

        <Row label="closable + checkable">
            <Tag closable>closable</Tag>
            <Tag color="error" closable>
                closable error
            </Tag>
            <Tag icon={<UserOutlined />} color="processing">
                with icon
            </Tag>
            <Tag.CheckableTag checked>checked</Tag.CheckableTag>
            <Tag.CheckableTag checked={false}>unchecked</Tag.CheckableTag>
        </Row>
    </>
);

const Tooltips = () => (
    <>
        <Row label="placements">
            {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
                <Tooltip key={placement} placement={placement} title={`Tooltip on the ${placement}`}>
                    <Button>{placement}</Button>
                </Tooltip>
            ))}
        </Row>

        <Row label="colour + arrow">
            <Tooltip title="Brand teal" color="#008188">
                <Button>Coloured</Button>
            </Tooltip>
            <Tooltip title="No arrow" arrow={false}>
                <Button>Arrowless</Button>
            </Tooltip>
            <Tooltip title="On a disabled control">
                <span>
                    <Button disabled>Disabled</Button>
                </span>
            </Tooltip>
        </Row>
    </>
);

const Trees = () => (
    <>
        <Row label="basic + checkable">
            <Tree defaultExpandAll treeData={TREE_DATA} />
            <Tree checkable defaultExpandAll defaultCheckedKeys={['a-1']} treeData={TREE_DATA} />
        </Row>

        <Row label="selectable + lines">
            <Tree defaultExpandAll multiple defaultSelectedKeys={['a-1', 'a-2']} treeData={TREE_DATA} />
            <Tree showLine defaultExpandAll treeData={TREE_DATA} />
        </Row>

        <Row label="directory">
            <Tree.DirectoryTree defaultExpandAll treeData={TREE_DATA} />
        </Row>
    </>
);

export const DataDisplay = () => (
    <Group
        id="group-data-display"
        title="Data display"
        summary="Almost nothing here is overridden — this group is mostly the global tokens landing on components that never asked for them."
    >
        <Demo
            id="avatar"
            title="Avatar"
            note="The circle keeps antd's own sizes; the initials inside are pinned to 18px (24 at large) against antd's flat 14, so the letters fill the circle instead of floating in it."
        >
            <Avatars />
        </Demo>

        <Demo
            id="badge"
            title="Badge"
            note="Not overridden. The status dots take the design export's ramps rather than antd's palette."
        >
            <Badges />
        </Demo>

        <Demo
            id="calendar"
            title="Calendar"
            note="Shares the picker's panel metrics, so cell size and header height follow the same export values the date picker uses."
        >
            <Calendars />
        </Demo>

        <Demo
            id="card"
            title="Card"
            note="Not overridden. The head is a little taller than stock because its height follows the control scale."
            extra={<Used>small cards as page panels — every card on this page is one</Used>}
        >
            <Cards />
        </Demo>

        <Demo
            id="collapse"
            title="Collapse"
            note="Not overridden. Every hairline is colorSplit and the header height follows the control scale."
        >
            <Collapses />
        </Demo>

        <Demo
            id="descriptions"
            title="Descriptions"
            note="Not overridden. The label column tint and the cell borders both come from the neutral fills."
        >
            <DescriptionLists />
        </Demo>

        <Demo
            id="empty"
            title="Empty"
            note="Not overridden. The description takes colorTextDescription, which this theme darkens."
        >
            <Empties />
        </Demo>

        <Demo
            id="popover"
            title="Popover"
            note="Not overridden. Sits on colorBgElevated, which the theme pins in dark mode."
        >
            <Popovers />
        </Demo>

        <Demo
            id="segmented"
            title="Segmented"
            note="Not overridden, so it is a full control-height strip — visibly taller than stock antd's."
            extra={<Used>the colour-mode switch in the toolbar above</Used>}
        >
            <Segmenteds />
        </Demo>

        <Demo
            id="table"
            title="Table"
            note="Header, footer and sorted-column tints all derive from colorTextBase, so they follow a tenant's font colour rather than a pinned grey. Row height follows the control scale; the selection checkbox does not, because it is pinned to 16."
            extra={<Used>middle size, row selection, sortable columns and a footer</Used>}
        >
            <Tables />
        </Demo>

        <Demo
            id="tag"
            title="Tag"
            note="Two changes. The radius is a full pill against antd's 4px rounded rectangle, and the app sets outlined as the default variant through ConfigProvider where antd 6 defaults to filled."
            extra={<Used>outlined status tags in table cells</Used>}
        >
            <Tags />
        </Demo>

        <Demo id="tooltip" title="Tooltip" note="Not overridden.">
            <Tooltips />
        </Demo>

        <Demo
            id="tree"
            title="Tree"
            note="Not overridden. Rows follow controlHeightSM, and the checkbox is the same pinned 16px square as everywhere else."
        >
            <Trees />
        </Demo>
    </Group>
);
