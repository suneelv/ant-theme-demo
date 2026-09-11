import { Button, Dropdown, Flex, Menu, Pagination, Steps, Typography, theme } from 'antd';
import { BankOutlined, DesktopOutlined, DownOutlined, HomeOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { Section } from '../primitives';
import { Specimen } from '../Specimen';
import { Compare, CompareTrio } from '../Compare';
import { unpinnedDropdown, unpinnedMenu, unpinnedSteps } from '../derivedTokens';
import { useDemoStyles } from '../useDemoStyles';

const { Text, Paragraph } = Typography;

/* Real glyphs rather than bare labels, because the gap between icon and label
   is a component override and only reads correctly at the icon sizes the app actually ships. */
const MENU_ITEMS = [
    { key: 'dashboard', label: 'Dashboard', icon: <HomeOutlined /> },
    { key: 'devices', label: 'Devices', icon: <DesktopOutlined /> },
    { key: 'locations', label: 'Locations', icon: <BankOutlined /> },
    {
        key: 'group',
        label: 'People',
        icon: <TeamOutlined />,
        children: [
            { key: 'nested-1', label: 'Users' },
            { key: 'nested-2', label: 'Roles' },
            { key: 'nested-3', label: 'Permissions' },
            {
                key: 'nested-group',
                label: 'Access',
                children: [
                    { key: 'deep-1', label: 'Zones' },
                    { key: 'deep-2', label: 'Restrictions' },
                ],
            },
        ],
    },
    { key: 'disabled', label: 'Disabled', disabled: true, icon: <SettingOutlined /> },
];

/* Both levels open, so the nested panel — the only thing subMenuItemBg paints — is a large enough
   area to actually judge. */
const OPEN_KEYS = ['group', 'nested-group'];

const DROPDOWN_ITEMS = [
    { key: '1', label: 'First action' },
    { key: '2', label: 'Second action' },
    { type: 'divider' as const },
    { key: '3', label: 'Danger action', danger: true },
];

const STEP_ITEMS = [{ title: 'Finished' }, { title: 'In progress' }, { title: 'Waiting' }];

const CURRENT_STEP = 1;
const PAGE = 2;
const SMALL_TOTAL = 100;
const LARGE_TOTAL = 500;

const InlineMenu = () => {
    const { styles } = useDemoStyles();

    return (
        <div className={styles.menuBox}>
            <Menu mode="inline" defaultSelectedKeys={['dashboard']} defaultOpenKeys={OPEN_KEYS} items={MENU_ITEMS} />
        </div>
    );
};

const UnpinnedMenu = () => {
    const { token } = theme.useToken();

    return (
        <CompareTrio
            unpinned={unpinnedMenu(token)}
            ours="itemHeight 40 · icon gap 10"
            middle="itemHeight 48 · icon gap 18 — controlHeightLG and controlHeightSM − fontSize"
            stock="itemHeight 40 · icon gap 10"
        >
            <InlineMenu />
        </CompareTrio>
    );
};

const Dropdowns = () => {
    const { token } = theme.useToken();

    return (
        <Flex gap={token.margin} wrap>
            <Dropdown menu={{ items: DROPDOWN_ITEMS }}>
                <Button>
                    Hover me <DownOutlined />
                </Button>
            </Dropdown>
            <Dropdown menu={{ items: DROPDOWN_ITEMS }} trigger={['click']}>
                <Button type="primary">Click me</Button>
            </Dropdown>
        </Flex>
    );
};

const UnpinnedDropdown = () => {
    const { token } = theme.useToken();

    return (
        <CompareTrio
            unpinned={unpinnedDropdown(token)}
            ours="paddingBlock 5"
            middle="paddingBlock 9 — (controlHeight − line height) / 2"
            stock="paddingBlock 5"
        >
            <Dropdowns />
        </CompareTrio>
    );
};

const Pagers = () => {
    const { token } = theme.useToken();

    return (
        <Flex vertical gap={token.margin}>
            <Pagination defaultCurrent={PAGE} total={SMALL_TOTAL} />
            <Pagination defaultCurrent={PAGE} total={SMALL_TOTAL} size="small" />
            <Pagination defaultCurrent={PAGE} total={LARGE_TOTAL} showSizeChanger showQuickJumper />
        </Flex>
    );
};

const Dots = () => {
    const { token } = theme.useToken();

    return (
        <Flex vertical gap={token.marginLG}>
            <Steps progressDot current={CURRENT_STEP} items={STEP_ITEMS} />
            <Steps current={CURRENT_STEP} items={[...STEP_ITEMS, { title: 'Error', status: 'error' as const }]} />
        </Flex>
    );
};

const UnpinnedSteps = () => {
    const { token } = theme.useToken();

    return (
        <CompareTrio
            unpinned={unpinnedSteps(token)}
            ours="dot 8 · current 10"
            middle="dot 10 · current 12 — controlHeight / 4"
            stock="dot 8 · current 10"
        >
            <Dots />
        </CompareTrio>
    );
};

export const Navigation = () => {
    const { token } = theme.useToken();

    return (
        <Section
            id="group-navigation"
            title="Navigation"
            summary="Menu carries the most component-level overrides of anything in the theme — it is the app's primary chrome."
        >
            <Specimen
                id="menu-inline"
                title="Menu — inline"
                tokens={['Menu.iconMarginInlineEnd', 'Menu.itemHeight', 'Menu.itemSelectedColor', 'Menu.subMenuItemBg']}
                note="Two of these changes are size pins and one is not. Rows are 40px and the glyph-to-label gap is 10px — both of which Ant Design would have derived as 48 and 18 from our raised scale, so the middle column is where they show. The sub-menu panel is the real difference against stock: ours is transparent where antd washes each expanded level 2% darker, so compare the block behind Users / Roles / Permissions in the left and right columns. The selected row also labels itself in the deep teal where antd uses the base."
            >
                <UnpinnedMenu />
                <Paragraph type="secondary" style={{ marginTop: token.margin, marginBottom: 0 }}>
                    <Text code>subMenuItemBg</Text> paints one thing only: the panel behind an expanded sub-menu, and
                    only in <Text code>mode=&quot;inline&quot;</Text>. antd defaults it to{' '}
                    <Text code>colorFillAlter</Text>, recessing each nested level by 2%, so depth reads as progressively
                    darker bands. Ours is <Text code>transparent</Text>, so every level sits on the same surface and
                    depth reads from indentation alone. The app&apos;s side nav is inline, so this is live on every
                    expanded section.
                </Paragraph>
            </Specimen>

            <Specimen
                id="dropdown"
                title="Dropdown — paddingBlock"
                tokens={['Dropdown.paddingBlock']}
                extra={<Text type="secondary">open a menu in each column</Text>}
                note="Open the menu in all three columns and compare the space above and below each label. Ant Design derives it as (controlHeight − line height) / 2, which at our 40px control is 9 and makes every dropdown row 40px tall. The pin holds 5, its value at a 32px control, so menu rows stay compact while the buttons that open them grow. Pinned and stock agree — the middle column is what the pin displaces."
            >
                <UnpinnedDropdown />
            </Specimen>

            <Specimen
                id="pagination"
                title="Pagination"
                tokens={['controlHeight']}
                note="Nothing here is overridden. Every item box, the page-size select and the quick-jump input take controlHeight straight from the scale, so the whole strip is one step taller than antd's."
            >
                <Compare ours="controlHeight 40" stock="controlHeight 32">
                    <Pagers />
                </Compare>
            </Specimen>

            <Specimen
                id="steps"
                title="Steps"
                tokens={['Steps.dotSize', 'Steps.dotCurrentSize']}
                note="The dot variant on top is what the tokens govern; the numbered variant below inherits the control scale. What to look for is the size of the dots on the rail — antd would derive 10 and 12 from our raised scale, and the pin holds 8 and 10. The circles in the numbered row are not pinned, so they stay at controlHeight and grow with the theme."
            >
                <UnpinnedSteps />
            </Specimen>
        </Section>
    );
};
