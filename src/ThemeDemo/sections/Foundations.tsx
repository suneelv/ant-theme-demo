import {
    Alert,
    Button,
    Checkbox,
    DatePicker,
    Descriptions,
    Divider,
    Flex,
    Input,
    InputNumber,
    List,
    Radio,
    Segmented,
    Select,
    Space,
    Switch,
    Tag,
    Timeline,
    Typography,
    theme,
} from 'antd';
import { Section, StatePreview, Swatch } from '../primitives';
import { Specimen } from '../Specimen';
import { Compare } from '../Compare';
import { TokenTable } from '../TokenTable';
import { useDemoStyles } from '../useDemoStyles';

const { Title, Text, Paragraph, Link } = Typography;

const STATUSES = ['success', 'warning', 'error', 'info'] as const;

type Status = (typeof STATUSES)[number];

const SIZES = ['large', 'middle', 'small'] as const;

const NUMBER_VALUE = 42;
const FIELD_WIDTH = 220;
const SELECT_WIDTH = 130;
const SHORT_FIELD_WIDTH = 150;
const DESCRIPTIONS_MIN_WIDTH = 260;
const LIST_MIN_WIDTH = 220;
const TIMELINE_MIN_WIDTH = 180;

const capitalise = (status: Status) => `${status.charAt(0).toUpperCase()}${status.slice(1)}`;

const statusTokens = (status: Status) => {
    const cap = capitalise(status);

    return [
        `color${cap}`,
        `color${cap}Bg`,
        `color${cap}BgHover`,
        `color${cap}Border`,
        `color${cap}BorderHover`,
        `color${cap}Hover`,
        `color${cap}Active`,
        `color${cap}Text`,
        `color${cap}TextHover`,
        `color${cap}TextActive`,
    ];
};

interface StatusTilesProps {
    status: Status;
}

/* Reads its values from the theme it renders under rather than taking them as props, so the same
   element placed in both columns reports each column's own ramp. */
const StatusTiles = ({ status }: StatusTilesProps) => {
    const { styles } = useDemoStyles();
    const { token } = theme.useToken();
    const read = token as unknown as Record<string, string>;
    const cap = capitalise(status);

    return (
        <div className={styles.tileGrid}>
            <StatePreview
                title="Tint background"
                hint="Hover me"
                apply="bg"
                phases={{
                    rest: { token: `color${cap}Bg`, value: read[`color${cap}Bg`] },
                    hover: { token: `color${cap}BgHover`, value: read[`color${cap}BgHover`] },
                    active: { token: `color${cap}BgHover`, value: read[`color${cap}BgHover`] },
                }}
            />
            <StatePreview
                title="Border"
                hint="Hover me"
                apply="border"
                phases={{
                    rest: { token: `color${cap}Border`, value: read[`color${cap}Border`] },
                    hover: { token: `color${cap}BorderHover`, value: read[`color${cap}BorderHover`] },
                    active: { token: `color${cap}BorderHover`, value: read[`color${cap}BorderHover`] },
                }}
            />
            <StatePreview
                title="Text"
                hint="Hover and press"
                apply="text"
                phases={{
                    rest: { token: `color${cap}Text`, value: read[`color${cap}Text`] },
                    hover: { token: `color${cap}TextHover`, value: read[`color${cap}TextHover`] },
                    active: { token: `color${cap}TextActive`, value: read[`color${cap}TextActive`] },
                }}
            />
            <StatePreview
                title="Solid fill"
                hint="Hover and press"
                apply="solid"
                phases={{
                    rest: { token: `color${cap}`, value: read[`color${cap}`] },
                    hover: { token: `color${cap}Hover`, value: read[`color${cap}Hover`] },
                    active: { token: `color${cap}Active`, value: read[`color${cap}Active`] },
                }}
            />
        </div>
    );
};

interface StatusRampProps {
    status: Status;
}

const StatusRamp = ({ status }: StatusRampProps) => (
    <Specimen
        id={`status-${status}`}
        title={`Status — ${status}`}
        tokens={statusTokens(status)}
        note="Hover and press each tile; the readout under it names the token it just resolved to. What to look for across the pair is the direction of travel — ours deepens on hover where antd lightens — and the border tile, which we set to the full-saturation base rather than a pale tint."
    >
        <Compare>
            <StatusTiles status={status} />
        </Compare>
    </Specimen>
);

const TypeSpecimen = () => {
    const { token } = theme.useToken();

    return (
        <>
            <Title level={3}>Title level 3</Title>
            <Title level={5}>Title level 5</Title>
            <Paragraph>
                A paragraph in the body font, carrying <Text strong>strong</Text>, <Text italic>italic</Text>,{' '}
                <Text underline>underline</Text> and <Text mark>marked</Text> runs, plus a{' '}
                <Link href="#foundations-typography">link</Link>.
            </Paragraph>
            <Paragraph>
                Monospace runs on antd&apos;s own stack: <Text code>colorPrimary = {token.colorPrimary}</Text>.
            </Paragraph>
            <Space orientation="vertical">
                <Text type="secondary">Secondary</Text>
                <Text type="success">Success</Text>
                <Text type="warning">Warning</Text>
                <Text type="danger">Danger</Text>
                <Text disabled>Disabled</Text>
            </Space>
        </>
    );
};

const TextTones = () => {
    const { styles } = useDemoStyles();
    const { token } = theme.useToken();

    return (
        <>
            <div className={styles.swatchRow}>
                <Swatch name="colorTextBase" value={token.colorTextBase} />
                <Swatch name="colorText" value={token.colorText} alpha />
                <Swatch name="colorTextSecondary" value={token.colorTextSecondary} alpha />
                <Swatch name="colorTextTertiary" value={token.colorTextTertiary} alpha />
                <Swatch name="colorTextQuaternary" value={token.colorTextQuaternary} alpha />
                <Swatch name="colorTextDescription" value={token.colorTextDescription} alpha />
                <Swatch name="colorTextDisabled" value={token.colorTextDisabled} alpha />
                <Swatch name="colorTextPlaceholder" value={token.colorTextPlaceholder} alpha />
                <Swatch name="colorIcon" value={token.colorIcon} alpha />
                <Swatch name="colorSplit" value={token.colorSplit} alpha />
            </div>
            <Flex gap={token.margin} wrap style={{ marginTop: token.margin }}>
                <Input placeholder="Placeholder text" style={{ width: FIELD_WIDTH }} />
                <Input disabled defaultValue="Disabled value" style={{ width: FIELD_WIDTH }} />
            </Flex>
        </>
    );
};

const SplitInUse = () => {
    const { token } = theme.useToken();

    return (
        <>
            <Divider />
            <Divider variant="dashed" />
            <Divider>with text</Divider>

            <Flex align="center" style={{ marginBottom: token.margin }}>
                <Text>Vertical</Text>
                <Divider type="vertical" />
                <Text>dividers</Text>
                <Divider type="vertical" />
                <Text>too</Text>
            </Flex>

            <Flex gap={token.marginLG} wrap align="flex-start">
                <Descriptions
                    bordered
                    size="small"
                    column={1}
                    style={{ minWidth: DESCRIPTIONS_MIN_WIDTH }}
                    items={[
                        { key: 'a', label: 'Cell borders', children: 'every rule is colorSplit' },
                        { key: 'b', label: 'Second row', children: 'including the row split' },
                    ]}
                />

                <List
                    size="small"
                    header="List item separators"
                    style={{ minWidth: LIST_MIN_WIDTH }}
                    dataSource={['First item', 'Second item', 'Third item']}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                />

                <Timeline
                    style={{ minWidth: TIMELINE_MIN_WIDTH }}
                    items={[
                        { content: 'The tail between dots' },
                        { content: 'is colorSplit too' },
                        { content: 'via Timeline.tailColor' },
                    ]}
                />
            </Flex>
        </>
    );
};

interface ScaleRowProps {
    size: (typeof SIZES)[number];
}

const ScaleRow = ({ size }: ScaleRowProps) => {
    const { styles } = useDemoStyles();
    const { token } = theme.useToken();

    return (
        <div className={styles.ruler}>
            <Flex gap={token.marginXS} wrap align="center">
                <Button size={size} type="primary">
                    Primary
                </Button>
                <Button size={size}>Default</Button>
                <Input size={size} placeholder="Input" style={{ width: SHORT_FIELD_WIDTH }} />
                <InputNumber size={size} defaultValue={NUMBER_VALUE} />
                <Select
                    size={size}
                    defaultValue="one"
                    style={{ width: SELECT_WIDTH }}
                    options={[
                        { value: 'one', label: 'Option one' },
                        { value: 'two', label: 'Option two' },
                    ]}
                />
                <DatePicker size={size} />
                <Segmented size={size} options={['Day', 'Week']} />
            </Flex>
        </div>
    );
};

const Interactive = () => {
    const { token } = theme.useToken();

    return (
        <Flex gap={token.marginLG} wrap align="center">
            <Checkbox>Checkbox</Checkbox>
            <Checkbox indeterminate>Indeterminate</Checkbox>
            <Checkbox defaultChecked>Checked</Checkbox>
            <Checkbox disabled>Disabled</Checkbox>
            <Radio.Group defaultValue="a">
                <Radio value="a">Radio A</Radio>
                <Radio value="b">Radio B</Radio>
            </Radio.Group>
            <Switch defaultChecked />
            <Switch size="small" defaultChecked />
        </Flex>
    );
};

const FocusRing = () => {
    const { styles } = useDemoStyles();
    const { token } = theme.useToken();

    return (
        <>
            <Flex gap={token.margin} wrap>
                <Input placeholder="Focus me" style={{ width: FIELD_WIDTH }} />
                <Input status="error" placeholder="Error focus" style={{ width: FIELD_WIDTH }} />
                <Input status="warning" placeholder="Warning focus" style={{ width: FIELD_WIDTH }} />
                <Button>Focus me</Button>
            </Flex>
            <div className={styles.swatchRow} style={{ marginTop: token.margin }}>
                <Swatch name="controlOutline" value={token.controlOutline} alpha />
                <Swatch name="colorErrorOutline" value={token.colorErrorOutline} alpha />
                <Swatch name="colorWarningOutline" value={token.colorWarningOutline} alpha />
            </div>
        </>
    );
};

const PrimaryRamp = () => {
    const { styles } = useDemoStyles();
    const { token } = theme.useToken();

    return (
        <>
            <div className={styles.swatchRow}>
                <Swatch name="colorPrimaryBg" value={token.colorPrimaryBg} />
                <Swatch name="colorPrimaryBgHover" value={token.colorPrimaryBgHover} />
                <Swatch name="colorPrimaryBorder" value={token.colorPrimaryBorder} />
                <Swatch name="colorPrimaryBorderHover" value={token.colorPrimaryBorderHover} />
                <Swatch name="colorPrimary" value={token.colorPrimary} />
                <Swatch name="colorPrimaryHover" value={token.colorPrimaryHover} />
                <Swatch name="colorPrimaryActive" value={token.colorPrimaryActive} />
                <Swatch name="colorLink" value={token.colorLink} />
                <Swatch name="colorLinkHover" value={token.colorLinkHover} />
                <Swatch name="controlItemBgActive" value={token.controlItemBgActive} />
            </div>
            <Flex gap={token.marginXS} wrap style={{ marginTop: token.margin }}>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="link">Link</Button>
                <Button type="primary" ghost>
                    Ghost
                </Button>
            </Flex>
        </>
    );
};

const Radii = () => {
    const { token } = theme.useToken();

    return (
        <Flex gap={token.marginXS} wrap align="center">
            <Tag color="success">Tag</Tag>
            <Tag>default</Tag>
            <Button>Button</Button>
            <Input placeholder="Input" style={{ width: SHORT_FIELD_WIDTH }} />
        </Flex>
    );
};

export const Foundations = () => {
    const { token } = theme.useToken();

    return (
        <>
            <Section
                id="foundations-typography"
                title="Typography"
                summary="Only the font family changes. Every size, weight and line height is left to Ant Design."
            >
                <Specimen
                    id="typography-family"
                    title="Font family"
                    tokens={['fontFamily']}
                    note="What to look for is letterform, not size — every size, weight and line height in both columns is identical. Ours is Google Sans Flex; antd's is the system UI stack, so on a Mac the right column is San Francisco. The status text colours differ too, since they come from the ramps."
                >
                    <Compare ours="Google Sans Flex" stock="system-ui stack">
                        <TypeSpecimen />
                    </Compare>
                </Specimen>
            </Section>

            <Section
                id="foundations-text"
                title="Text and surface colours"
                summary="The muted tones run darker than antd's for contrast on a white canvas. Description, Disabled, Placeholder and Icon are derived, not set."
            >
                <Specimen
                    id="text-tones"
                    title="Text tones"
                    tokens={[
                        'colorTextBase',
                        'colorText',
                        'colorTextTertiary',
                        'colorTextQuaternary',
                        'colorTextDescription',
                        'colorTextDisabled',
                        'colorTextPlaceholder',
                        'colorIcon',
                        'colorSplit',
                    ]}
                    note="Only two of these are set — tertiary and quaternary — and everything below them derives. What to look for is the bottom half of each swatch column and the two fields under it: our placeholder and disabled text are much closer to body text than antd's, which reads as better contrast and a weaker disabled affordance at the same time."
                >
                    <Compare ours="tertiary 0.56 · quaternary 0.54" stock="tertiary 0.45 · quaternary 0.25">
                        <TextTones />
                    </Compare>
                    <Alert
                        style={{ marginTop: token.margin }}
                        type="warning"
                        showIcon
                        title="Tertiary and Quaternary have nearly collapsed"
                        description="antd's defaults are 0.45 / 0.25; ours are 0.56 / 0.54. Disabled and placeholder text now read almost identically to description text."
                    />
                </Specimen>
            </Section>

            <Section
                id="foundations-split"
                title="colorSplit in use"
                summary="The swatch above shows the colour; these are the components that actually draw with it. Every hairline below is colorSplit — nothing here sets a border of its own."
            >
                <Specimen
                    id="split-in-use"
                    title="Dividers, separators and rules"
                    tokens={['colorSplit']}
                    note="In light mode the theme no longer sets colorSplit, so both columns resolve it the same way and the only difference is row height. Switch the app to dark mode and look again: dark still pins it, at half antd's alpha, and the dividers there run visibly fainter than the Descriptions cell borders beside them."
                >
                    <Compare ours="light: derived · dark: pinned at half alpha" stock="derived in both modes">
                        <SplitInUse />
                    </Compare>
                </Specimen>
            </Section>

            <Section
                id="foundations-heights"
                title="Control heights"
                summary={`controlHeight ${token.controlHeight}, LG ${token.controlHeightLG}, SM ${token.controlHeightSM}, XS ${token.controlHeightXS} — one step above antd's 32 / 40 / 24 / 16. The striped backdrop is an 8px grid.`}
            >
                <Specimen
                    id="heights-scale"
                    title="The scale"
                    tokens={[
                        'controlHeight',
                        'controlHeightLG',
                        'controlHeightSM',
                        'controlHeightXS',
                        'controlInteractiveSize',
                    ]}
                    note="This table is the comparison — both columns of numbers are live, ours against stock Ant Design in the same colour mode. controlInteractiveSize is the one that breaks the pattern: Ant Design would derive it as controlHeight / 2, giving 20, but design pinned it to 16, so the checkbox square stays put while the controls around it grow."
                >
                    <TokenTable
                        tokens={[
                            'controlHeight',
                            'controlHeightLG',
                            'controlHeightSM',
                            'controlHeightXS',
                            'controlInteractiveSize',
                        ]}
                    />
                </Specimen>

                {SIZES.map((size) => (
                    <Specimen
                        key={size}
                        id={`heights-${size}`}
                        title={`size="${size}"`}
                        note="Every control on the row is the same height as every other, in both columns — the point is that the whole row steps up together. Count the 8px stripes behind them: ours spans one more than antd's at every size."
                    >
                        <Compare>
                            <ScaleRow size={size} />
                        </Compare>
                    </Specimen>
                ))}

                <Specimen
                    id="heights-interactive"
                    title="Checkbox, radio and switch"
                    tokens={['controlInteractiveSize']}
                    note="These are the controls that do NOT follow the scale. The checkbox is pinned to 16, which is also what antd resolves at its own control height, so the squares match across the pair while nothing else does. Radio sizes both circle and dot off fontSizeLG, and Switch has its own track and handle tokens — so the whole row is near-identical in both columns even though the fields above it are not."
                >
                    <Compare ours="controlInteractiveSize 16 (pinned)" stock="controlInteractiveSize 16 (derived)">
                        <Interactive />
                    </Compare>
                </Specimen>
            </Section>

            <Section
                id="foundations-focus"
                title="Focus ring"
                summary={`lineWidthFocus is ${token.lineWidthFocus} against antd's 3, and the outline tints follow the brand rather than antd's blue. Tab into the controls to see it.`}
            >
                <Specimen
                    id="focus-ring"
                    title="Tab through these"
                    tokens={['lineWidthFocus', 'controlOutline', 'colorErrorOutline', 'colorWarningOutline']}
                    note="Click into the first field in each column and tab along. What to look for is the weight of the ring: ours is 4px at 0.66 alpha, a solid band in the brand teal, where antd draws 3px at roughly 0.1 in blue — barely a glow. The error and warning fields carry the same treatment in their own hue."
                >
                    <Compare ours="4px at 0.66 alpha, teal" stock="3px at ~0.1 alpha, blue">
                        <FocusRing />
                    </Compare>
                </Specimen>
            </Section>

            <Section
                id="foundations-primary"
                title="Primary — the brand teal ramp"
                summary="The whole ramp is pinned rather than generated. Note the direction: hover DEEPENS, where antd would go lighter."
            >
                <Specimen
                    id="primary-ramp"
                    title="The ramp"
                    tokens={[
                        'colorPrimary',
                        'colorPrimaryBg',
                        'colorPrimaryBgHover',
                        'colorPrimaryBorder',
                        'colorPrimaryBorderHover',
                        'colorPrimaryHover',
                        'colorPrimaryActive',
                        'colorPrimaryText',
                        'colorPrimaryTextHover',
                        'colorPrimaryTextActive',
                        'colorLink',
                        'colorLinkHover',
                        'colorLinkActive',
                        'controlItemBgActive',
                        'controlItemBgActiveHover',
                    ]}
                    note="Compare the two swatch grids stop for stop. Ours is every stop of the brand teal, pinned from the export; antd's is its blue, generated from a single seed. Then hover the primary button in each column: colorPrimaryHover is DEEPER than colorPrimary in ours and lighter in antd's, so the two ramps run in opposite directions."
                >
                    <Compare ours="teal, pinned stop by stop" stock="blue, generated from one seed">
                        <PrimaryRamp />
                    </Compare>
                </Specimen>
            </Section>

            <Section
                id="foundations-status"
                title="Status colours"
                summary="Each status resolves to four stops: a tint background, a hover tint, the base tone for border and text, and a deep tone for hover, active and pressed."
            >
                {STATUSES.map((status) => (
                    <StatusRamp key={status} status={status} />
                ))}
            </Section>

            <Section
                id="foundations-radius"
                title="Radius"
                summary="Inherited wholesale from Ant Design — the theme pins no global radius. Only Tag and a few component tokens carry radius intent."
            >
                <Specimen
                    id="radius-scale"
                    title="The inherited scale"
                    note="The table is the comparison for the scale itself, and every row should read as inherited. Tag is the exception, and the controls beside it show what unchanged radius looks like at two different heights."
                >
                    <TokenTable tokens={['borderRadiusXS', 'borderRadiusSM', 'borderRadius', 'borderRadiusLG']} />
                    <div style={{ marginTop: token.margin }}>
                        <Compare ours="Tag pinned to a pill" stock="Tag at borderRadiusSM 4">
                            <Radii />
                        </Compare>
                    </div>
                </Specimen>
            </Section>
        </>
    );
};
