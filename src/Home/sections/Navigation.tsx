import { useState } from 'react';
import { Breadcrumb, Button, Dropdown, Flex, Menu, Pagination, Tabs, theme } from 'antd';
import type { MenuProps, TabsProps } from 'antd';
import {
    AppstoreOutlined,
    BankOutlined,
    DesktopOutlined,
    DownOutlined,
    EllipsisOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Demo, Group, Row, Used, Wide } from '../showcase';

const MENU_WIDTH = 260;
const COLLAPSED_WIDTH = 80;
const SMALL_TOTAL = 100;
const LARGE_TOTAL = 500;
const PAGE = 2;

const NAV_ITEMS: MenuProps['items'] = [
    { key: 'dashboard', label: 'Dashboard', icon: <HomeOutlined /> },
    { key: 'devices', label: 'Devices', icon: <DesktopOutlined /> },
    {
        key: 'people',
        label: 'People',
        icon: <TeamOutlined />,
        children: [
            { key: 'users', label: 'Users' },
            { key: 'roles', label: 'Roles' },
            {
                key: 'access',
                label: 'Access',
                children: [
                    { key: 'zones', label: 'Zones' },
                    { key: 'restrictions', label: 'Restrictions' },
                ],
            },
        ],
    },
    { type: 'divider' },
    {
        key: 'admin',
        label: 'Administration',
        type: 'group',
        children: [
            { key: 'locations', label: 'Locations', icon: <BankOutlined /> },
            { key: 'settings', label: 'Settings', icon: <SettingOutlined />, disabled: true },
        ],
    },
];

const HORIZONTAL_ITEMS: MenuProps['items'] = [
    { key: 'dashboard', label: 'Dashboard', icon: <HomeOutlined /> },
    { key: 'devices', label: 'Devices' },
    {
        key: 'reports',
        label: 'Reports',
        children: [
            { key: 'usage', label: 'Usage' },
            { key: 'audit', label: 'Audit' },
        ],
    },
    { key: 'disabled', label: 'Disabled', disabled: true },
];

const DROPDOWN_ITEMS: MenuProps['items'] = [
    { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
    { key: 'settings', label: 'Settings', icon: <SettingOutlined /> },
    { type: 'divider' },
    { key: 'disabled', label: 'Disabled action', disabled: true },
    { key: 'delete', label: 'Delete', danger: true },
];

const TAB_ITEMS = [
    { key: '1', label: 'Overview', children: 'Overview content' },
    { key: '2', label: 'Devices', children: 'Devices content' },
    { key: '3', label: 'Disabled', children: 'Never shown', disabled: true },
];

const ICON_TAB_ITEMS = [
    { key: '1', label: 'Grid', icon: <AppstoreOutlined />, children: 'Grid content' },
    { key: '2', label: 'People', icon: <TeamOutlined />, children: 'People content' },
];

const INITIAL_EDITABLE_TABS = [
    { key: '1', label: 'Tab 1', children: 'Closable tab content' },
    { key: '2', label: 'Tab 2', children: 'Closable tab content' },
];

const Breadcrumbs = () => (
    <>
        <Row label="basic">
            <Breadcrumb items={[{ title: 'Home' }, { title: 'Locations' }, { title: 'Main lobby' }]} />
        </Row>

        <Row label="with links">
            <Breadcrumb
                items={[
                    { title: <a href="#breadcrumb">Home</a> },
                    { title: <a href="#breadcrumb">Devices</a> },
                    { title: 'Sensor A' },
                ]}
            />
        </Row>

        <Row label="with icons">
            <Breadcrumb
                items={[
                    { title: <HomeOutlined />, href: '#breadcrumb' },
                    {
                        title: (
                            <>
                                <BankOutlined /> <span>Locations</span>
                            </>
                        ),
                        href: '#breadcrumb',
                    },
                    { title: 'Main lobby' },
                ]}
            />
        </Row>

        <Row label="with a menu">
            <Breadcrumb
                items={[
                    { title: 'Home' },
                    {
                        title: <a href="#breadcrumb">Buildings</a>,
                        menu: {
                            items: [
                                { key: 'a', label: 'Building A' },
                                { key: 'b', label: 'Building B' },
                            ],
                        },
                    },
                    { title: 'First floor' },
                ]}
            />
        </Row>

        <Row label="custom separator">
            <Breadcrumb separator=">" items={[{ title: 'Home' }, { title: 'Devices' }, { title: 'Sensor A' }]} />
        </Row>
    </>
);

const Dropdowns = () => (
    <>
        <Row label="triggers">
            <Dropdown menu={{ items: DROPDOWN_ITEMS }}>
                <Button>
                    Hover me <DownOutlined />
                </Button>
            </Dropdown>
            <Dropdown menu={{ items: DROPDOWN_ITEMS }} trigger={['click']}>
                <Button type="primary">
                    Click me <DownOutlined />
                </Button>
            </Dropdown>
            <Dropdown menu={{ items: DROPDOWN_ITEMS }} trigger={['contextMenu']}>
                <Button type="dashed">Right-click me</Button>
            </Dropdown>
        </Row>

        <Row label="button + icon only">
            <Dropdown.Button menu={{ items: DROPDOWN_ITEMS }}>Actions</Dropdown.Button>
            <Dropdown.Button type="primary" menu={{ items: DROPDOWN_ITEMS }}>
                Primary actions
            </Dropdown.Button>
            <Dropdown menu={{ items: DROPDOWN_ITEMS }} trigger={['click']}>
                <Button type="text" icon={<EllipsisOutlined />} />
            </Dropdown>
        </Row>

        <Row label="selectable + disabled">
            <Dropdown
                menu={{
                    items: [
                        { key: 'day', label: 'Day' },
                        { key: 'week', label: 'Week' },
                        { key: 'month', label: 'Month' },
                    ],
                    selectable: true,
                    defaultSelectedKeys: ['week'],
                }}
            >
                <Button>
                    Selectable <DownOutlined />
                </Button>
            </Dropdown>
            <Dropdown menu={{ items: DROPDOWN_ITEMS }} disabled>
                <Button>
                    Disabled <DownOutlined />
                </Button>
            </Dropdown>
        </Row>
    </>
);

const Menus = () => {
    const { token } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Row label="horizontal">
                <div style={{ width: '100%' }}>
                    <Menu mode="horizontal" defaultSelectedKeys={['dashboard']} items={HORIZONTAL_ITEMS} />
                </div>
            </Row>

            <Row label="inline">
                <div style={{ width: MENU_WIDTH }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['dashboard']}
                        defaultOpenKeys={['people', 'access']}
                        items={NAV_ITEMS}
                    />
                </div>
            </Row>

            <Row label="inline collapsed">
                <Flex vertical gap={token.marginXS}>
                    <Button
                        size="small"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed((previous) => !previous)}
                    >
                        {collapsed ? 'Expand' : 'Collapse'}
                    </Button>
                    <div style={{ width: collapsed ? COLLAPSED_WIDTH : MENU_WIDTH }}>
                        <Menu
                            mode="inline"
                            inlineCollapsed={collapsed}
                            defaultSelectedKeys={['dashboard']}
                            items={NAV_ITEMS}
                        />
                    </div>
                </Flex>
            </Row>

            <Row label="vertical + dark">
                <div style={{ width: MENU_WIDTH }}>
                    <Menu mode="vertical" defaultSelectedKeys={['devices']} items={NAV_ITEMS} />
                </div>
                <div style={{ width: MENU_WIDTH }}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} items={NAV_ITEMS} />
                </div>
            </Row>
        </>
    );
};

const Pagers = () => (
    <>
        <Row label="basic">
            <Pagination defaultCurrent={PAGE} total={SMALL_TOTAL} />
        </Row>

        <Row label="small">
            <Pagination size="small" defaultCurrent={PAGE} total={SMALL_TOTAL} />
        </Row>

        <Row label="simple">
            <Pagination simple defaultCurrent={PAGE} total={SMALL_TOTAL} />
        </Row>

        <Row label="full">
            <Pagination
                defaultCurrent={PAGE}
                total={LARGE_TOTAL}
                showSizeChanger
                showQuickJumper
                showTotal={(total, range) => `${range[0]}–${range[1]} of ${total}`}
            />
        </Row>

        <Row label="disabled">
            <Pagination disabled defaultCurrent={PAGE} total={SMALL_TOTAL} />
        </Row>
    </>
);

const TabSets = () => {
    const [editableTabs, setEditableTabs] = useState(INITIAL_EDITABLE_TABS);

    const onEdit: NonNullable<TabsProps['onEdit']> = (targetKey, action) => {
        if (action === 'add') {
            const key = String(Date.now());

            setEditableTabs((previous) => [
                ...previous,
                { key, label: `Tab ${previous.length + 1}`, children: 'New tab content' },
            ]);

            return;
        }

        setEditableTabs((previous) => previous.filter((tab) => tab.key !== targetKey));
    };

    return (
        <>
            <Row label="line">
                <Wide>
                    <Tabs items={TAB_ITEMS} />
                </Wide>
            </Row>

            <Row label="card sizes">
                <Wide>
                    <Tabs type="card" size="large" items={TAB_ITEMS} />
                    <Tabs type="card" items={TAB_ITEMS} />
                    <Tabs type="card" size="small" items={TAB_ITEMS} />
                </Wide>
            </Row>

            <Row label="editable card">
                <Wide>
                    <Tabs type="editable-card" items={editableTabs} onEdit={onEdit} />
                </Wide>
            </Row>

            <Row label="with icons + centred">
                <Wide>
                    <Tabs items={ICON_TAB_ITEMS} />
                    <Tabs centered items={TAB_ITEMS} />
                </Wide>
            </Row>

            <Row label="start placement">
                <Wide>
                    <Tabs tabPlacement="start" items={TAB_ITEMS} />
                </Wide>
            </Row>

            <Row label="with extra content">
                <Wide>
                    <Tabs items={TAB_ITEMS} tabBarExtraContent={<Button size="small">Action</Button>} />
                </Wide>
            </Row>
        </>
    );
};

export const Navigation = () => (
    <Group
        id="group-navigation"
        title="Navigation"
        summary="Breadcrumb, Dropdown, Menu, Pagination and Tabs. Menu carries more component-level overrides than anything else in the theme — it is the app's primary chrome."
    >
        <Demo
            id="breadcrumb"
            title="Breadcrumb"
            note="Not overridden. The active crumb takes colorText and the rest colorTextDescription."
        >
            <Breadcrumbs />
        </Demo>

        <Demo
            id="dropdown"
            title="Dropdown"
            note="Dropdown.paddingBlock is pinned to 5, which Ant Design would otherwise derive from the raised control height and land on 9 — menu rows stay compact while the buttons that open them grow."
            extra={<Used>click-triggered menus off a text or icon button</Used>}
        >
            <Dropdowns />
        </Demo>

        <Demo
            id="menu"
            title="Menu"
            note="Rows are pinned to 40px and the glyph-to-label gap to 10px. The sub-menu panel is transparent where antd washes each expanded level 2% darker, so depth reads from indentation alone; the selected row labels itself in the deep teal, or in the tenant's own primary."
            extra={<Used>inline side nav and the horizontal bar above this page</Used>}
        >
            <Menus />
        </Demo>

        <Demo
            id="pagination"
            title="Pagination"
            note="Not overridden. Every item box, the page-size select and the quick-jump input take controlHeight straight from the scale, so the whole strip is one step taller than antd's."
            extra={<Used>the full variant under every table</Used>}
        >
            <Pagers />
        </Demo>

        <Demo
            id="tabs"
            title="Tabs"
            note="The card variant's height is pinned to 48 / 40 / 32; the line variant takes its height from padding and is untouched."
            extra={<Used>line tabs for page sections, card tabs inside panels</Used>}
        >
            <TabSets />
        </Demo>
    </Group>
);
