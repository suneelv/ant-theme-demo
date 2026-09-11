import { Button, Flex, Space, theme } from 'antd';
import { DeleteOutlined, DownloadOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Section } from '../primitives';
import { Specimen } from '../Specimen';
import { Compare, CompareTrio } from '../Compare';

const SIZES = ['large', 'middle', 'small'] as const;

const Types = () => {
    const { token } = theme.useToken();

    return (
        <Flex gap={token.marginXS} wrap>
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="text">Text</Button>
            <Button type="link">Link</Button>
            <Button type="primary" ghost>
                Ghost
            </Button>
        </Flex>
    );
};

const States = () => {
    const { token } = theme.useToken();

    return (
        <Flex gap={token.marginXS} wrap>
            <Button type="primary" danger>
                Danger
            </Button>
            <Button danger>Danger default</Button>
            <Button disabled>Disabled</Button>
            <Button type="primary" disabled>
                Disabled primary
            </Button>
            <Button loading>Loading</Button>
            <Button type="primary" loading>
                Loading primary
            </Button>
            <Button icon={<PlusOutlined />} />
            <Button type="primary" icon={<DownloadOutlined />}>
                With icon
            </Button>
        </Flex>
    );
};

const Sizes = () => {
    const { token } = theme.useToken();

    return (
        <Space orientation="vertical">
            {SIZES.map((size) => (
                <Flex key={size} gap={token.marginXS} align="center" wrap>
                    <Button size={size} type="primary">
                        Primary {size}
                    </Button>
                    <Button size={size}>Default {size}</Button>
                </Flex>
            ))}
        </Space>
    );
};

const Shadowed = () => {
    const { token } = theme.useToken();

    return (
        <Flex gap={token.marginXS} wrap>
            <Button type="primary">Primary</Button>
            <Button type="primary" danger>
                Danger
            </Button>
        </Flex>
    );
};

/* The Button scope lifted, so the buttons take the global focus-ring alpha the rest of the app
   uses. That is what the scope exists to prevent, and it is only visible on a solid button. */
const UnscopedShadow = () => {
    const { token } = theme.useToken();

    return (
        <CompareTrio
            unpinned={{ Button: { controlOutline: token.controlOutline, colorErrorOutline: token.colorErrorOutline } }}
            ours="0.11 alpha — a hairline"
            middle="the global 0.66 / 0.88 — a solid slab"
            stock="antd's own 0.1 blue"
        >
            <Shadowed />
        </CompareTrio>
    );
};

/* Icon-only means no children at all: that is the branch antd sizes with onlyIconSize. Real app
   glyphs alongside an antd one, because both render through the same .anticon and so both are
   driven by the token. */
const IconOnly = () => {
    const { token } = theme.useToken();

    return (
        <Space orientation="vertical">
            {SIZES.map((size) => (
                <Flex key={size} gap={token.marginXS} align="center" wrap>
                    <Button size={size} type="primary" icon={<EditOutlined />} />
                    <Button size={size} icon={<DeleteOutlined />} />
                    <Button size={size} type="text" icon={<SearchOutlined />} />
                    <Button size={size} shape="circle" icon={<PlusOutlined />} />
                    {/* The control against which to read the three above: with a label the button
                        is no longer icon-only, so the glyph falls back to the button's fontSize. */}
                    <Button size={size} icon={<EditOutlined />}>
                        {size} with label
                    </Button>
                </Flex>
            ))}
        </Space>
    );
};

/* 'inherit' is not a formula, it is antd's literal default for all three sizes — so the middle
   column is our theme with the glyph handed back to the button's own font size. */
const InheritedIconSize = () => (
    <CompareTrio
        unpinned={{ Button: { onlyIconSize: 'inherit', onlyIconSizeSM: 'inherit', onlyIconSizeLG: 'inherit' } }}
        ours="18 / 16 / 14 glyphs in 48 / 40 / 32 buttons"
        middle="16 / 14 / 14 — the label's font size"
        stock="16 / 14 / 14 in 40 / 32 / 24 buttons"
    >
        <IconOnly />
    </CompareTrio>
);

export const General = () => (
    <Section
        id="group-general"
        title="General"
        summary="The most-used component in the app by a wide margin. Button shows the raised control height and the teal ramp together."
    >
        <Specimen
            id="button-types"
            title="Types"
            tokens={['colorPrimary', 'colorPrimaryHover', 'colorPrimaryActive', 'controlHeight']}
            note="Two changes at once. Every button is 40px tall against Ant Design's 32 — compare the two rows against each other, not against the label. And the fill is the brand teal where antd is blue; hover a primary button in each column and watch the direction: ours deepens to #006a70, antd lightens."
        >
            <Compare ours="controlHeight 40 · teal ramp" stock="controlHeight 32 · antd blue">
                <Types />
            </Compare>
        </Specimen>

        <Specimen
            id="button-states"
            title="States"
            note="What to look for: the danger red. Ours is #eb1212 from the design export, a harder red than antd's #ff4d4f. Disabled and loading are inherited — the only difference there is the height."
        >
            <Compare ours="colorError #eb1212" stock="colorError #ff4d4f">
                <States />
            </Compare>
        </Specimen>

        <Specimen
            id="button-sizes"
            title="Sizes"
            tokens={['controlHeightLG', 'controlHeightSM']}
            note="The whole scale sits one step up: 48 / 40 / 32 against antd's 40 / 32 / 24. Our small button is the size of antd's default, which is the single most visible consequence of the theme."
        >
            <Compare ours="48 / 40 / 32" stock="40 / 32 / 24">
                <Sizes />
            </Compare>
        </Specimen>

        <Specimen
            id="button-icon-only"
            title="Icon-only buttons — onlyIconSize"
            tokens={['Button.onlyIconSize', 'Button.onlyIconSizeSM', 'Button.onlyIconSizeLG']}
            note="Compare the left and middle columns, which have identical button sizes and differ only in the glyph: ours is 16px in a default button and 18 in a large one, where Ant Design leaves the icon at 'inherit' and it comes out the size of the label, 14 and 16. Small is 14 either way. The last button in each row carries a label, so it is not icon-only and the token does not reach it — that is the reference for how much bigger the lone glyphs are."
        >
            <InheritedIconSize />
        </Specimen>

        <Specimen
            id="button-shadow"
            title="The bar under a solid button — Button.controlOutline"
            tokens={['Button.controlOutline', 'Button.colorErrorOutline']}
            note="Nothing here is an outline, despite the token name: Ant Design feeds controlOutline to primaryShadow, the flat 2px bar under the bottom edge of a solid button. This theme raises the global controlOutline to 0.66 for the focus ring, which would paint that bar as a solid slab, so Button scopes it back to 0.11. What to look for is the bottom edge of each button — the middle column is the same theme with the scope lifted."
        >
            <UnscopedShadow />
        </Specimen>
    </Section>
);
