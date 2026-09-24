import { Button, Divider, Flex, FloatButton, Space, Typography, theme } from 'antd';
import {
    CommentOutlined,
    CustomerServiceOutlined,
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
    SettingOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { Demo, Group, Row, Used } from '../showcase';
import { useShowcaseStyles } from '../useShowcaseStyles';

const { Title, Text, Paragraph, Link } = Typography;

const SIZES = ['large', 'middle', 'small'] as const;

const BADGE_COUNT = 3;
const ELLIPSIS_WIDTH = 320;

const Buttons = () => {
    const { token } = theme.useToken();

    return (
        <>
            <Row label="types">
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="text">Text</Button>
                <Button type="link">Link</Button>
                <Button type="primary" ghost>
                    Ghost
                </Button>
            </Row>

            <Row label="colour + variant">
                <Button color="primary" variant="solid">
                    solid
                </Button>
                <Button color="primary" variant="outlined">
                    outlined
                </Button>
                <Button color="primary" variant="dashed">
                    dashed
                </Button>
                <Button color="primary" variant="filled">
                    filled
                </Button>
                <Button color="primary" variant="text">
                    text
                </Button>
                <Button color="primary" variant="link">
                    link
                </Button>
            </Row>

            <Row label="danger">
                <Button type="primary" danger>
                    Primary danger
                </Button>
                <Button danger>Default danger</Button>
                <Button type="text" danger>
                    Text danger
                </Button>
                {/* The pair the tenant dialog's reset button uses. */}
                <Button color="danger" variant="outlined">
                    danger / outlined
                </Button>
                <Button color="danger" variant="filled">
                    danger / filled
                </Button>
            </Row>

            <Row label="states">
                <Button disabled>Disabled</Button>
                <Button type="primary" disabled>
                    Disabled primary
                </Button>
                <Button loading>Loading</Button>
                <Button type="primary" loading>
                    Loading primary
                </Button>
                <Button type="primary" loading={{ icon: <SearchOutlined /> }}>
                    Custom loading icon
                </Button>
            </Row>

            <Row label="sizes">
                <Flex vertical gap={token.marginXS}>
                    {SIZES.map((size) => (
                        <Flex key={size} gap={token.marginXS} align="center" wrap>
                            <Button size={size} type="primary">
                                Primary {size}
                            </Button>
                            <Button size={size}>Default {size}</Button>
                            <Button size={size} icon={<EditOutlined />} />
                        </Flex>
                    ))}
                </Flex>
            </Row>

            <Row label="icons">
                <Button type="primary" icon={<DownloadOutlined />}>
                    Leading icon
                </Button>
                <Button icon={<DownloadOutlined />} iconPosition="end">
                    Trailing icon
                </Button>
                <Button type="primary" icon={<PlusOutlined />} />
                <Button icon={<DeleteOutlined />} danger />
                <Button type="text" icon={<SearchOutlined />} />
            </Row>

            <Row label="shapes">
                <Button type="primary" shape="round">
                    Round
                </Button>
                <Button shape="circle" icon={<PlusOutlined />} />
                <Button type="primary" shape="circle" icon={<SearchOutlined />} />
            </Row>

            <Row label="grouped + block">
                <Flex vertical gap={token.marginXS} style={{ width: '100%' }}>
                    <Space.Compact>
                        <Button>Left</Button>
                        <Button>Middle</Button>
                        <Button>Right</Button>
                    </Space.Compact>
                    <Button type="primary" block>
                        Block
                    </Button>
                </Flex>
            </Row>

            <Row label="as a link">
                <Button type="link" href="https://ant.design" target="_blank">
                    External link
                </Button>
                <Button href="https://ant.design" target="_blank" icon={<UploadOutlined />}>
                    Link button
                </Button>
            </Row>
        </>
    );
};

const FloatButtons = () => {
    const { styles } = useShowcaseStyles();

    return (
        <div className={styles.floatStage}>
            <FloatButton icon={<QuestionCircleOutlined />} tooltip="Help" style={{ insetInlineEnd: 24 }} />
            <FloatButton
                type="primary"
                icon={<CustomerServiceOutlined />}
                badge={{ count: BADGE_COUNT }}
                style={{ insetInlineEnd: 88 }}
            />
            <FloatButton shape="square" icon={<SettingOutlined />} content="Square" style={{ insetInlineEnd: 152 }} />
            <FloatButton.Group trigger="hover" type="primary" icon={<PlusOutlined />} style={{ insetInlineEnd: 216 }}>
                <FloatButton icon={<CommentOutlined />} tooltip="Comment" />
                <FloatButton icon={<EditOutlined />} tooltip="Edit" />
            </FloatButton.Group>
        </div>
    );
};

const Typographies = () => (
    <>
        <Row label="titles">
            <Flex vertical>
                <Title level={1}>Heading level 1</Title>
                <Title level={2}>Heading level 2</Title>
                <Title level={3}>Heading level 3</Title>
                <Title level={4}>Heading level 4</Title>
                <Title level={5}>Heading level 5</Title>
            </Flex>
        </Row>

        <Row label="text types">
            <Text>Default</Text>
            <Text type="secondary">Secondary</Text>
            <Text type="success">Success</Text>
            <Text type="warning">Warning</Text>
            <Text type="danger">Danger</Text>
            <Text disabled>Disabled</Text>
        </Row>

        <Row label="text decoration">
            <Text strong>Strong</Text>
            <Text italic>Italic</Text>
            <Text underline>Underline</Text>
            <Text delete>Deleted</Text>
            <Text mark>Marked</Text>
            <Text code>colorPrimary</Text>
            <Text keyboard>Esc</Text>
            <Link href="https://ant.design" target="_blank">
                Link
            </Link>
        </Row>

        <Row label="interactive">
            <Text copyable>Copyable value</Text>
            <Text editable>Editable value</Text>
            <Text copyable={{ text: 'https://ant.design' }}>Copy a different value</Text>
        </Row>

        <Row label="paragraph">
            <Flex vertical style={{ width: '100%' }}>
                <Paragraph>
                    A paragraph of body copy at the theme&apos;s base font size and line height. Everything that reads
                    as running text in the app — help text, dialog bodies, empty-state copy — lands here.
                </Paragraph>
                <Paragraph type="secondary" style={{ width: ELLIPSIS_WIDTH }} ellipsis={{ rows: 2, tooltip: true }}>
                    A secondary paragraph clamped to two rows, which is how long descriptions behave in a table cell or
                    a card body. The rest is reachable from the tooltip.
                </Paragraph>
            </Flex>
        </Row>
    </>
);

const Dividers = () => {
    const { token } = theme.useToken();

    return (
        <>
            <Row label="horizontal">
                <Flex vertical style={{ width: '100%' }}>
                    <Divider />
                    <Divider variant="dashed" />
                    <Divider variant="dotted" />
                </Flex>
            </Row>

            <Row label="with a title">
                <Flex vertical style={{ width: '100%' }}>
                    <Divider>Centred</Divider>
                    <Divider titlePlacement="start">Start</Divider>
                    <Divider titlePlacement="end">End</Divider>
                    <Divider plain>Plain</Divider>
                </Flex>
            </Row>

            <Row label="vertical">
                <Flex align="center" gap={token.marginXS} style={{ height: 24 }}>
                    <Text>Edit</Text>
                    <Divider orientation="vertical" />
                    <Text>Duplicate</Text>
                    <Divider orientation="vertical" />
                    <Text type="danger">Delete</Text>
                </Flex>
            </Row>
        </>
    );
};

export const General = () => (
    <Group
        id="group-general"
        title="General"
        summary="Button, FloatButton, Typography and Divider — the pieces that carry the raised control height and the brand ramp everywhere else inherits."
    >
        <Demo
            id="button"
            title="Button"
            note="40px tall at default size, 48 large and 32 small — one step above stock Ant Design. The fill is the brand teal and the danger red is the harder #eb1212 from the design export. Icon-only buttons get a pinned glyph size, so the icon fills the button rather than matching the label."
            extra={<Used>primary, default, text and icon-only, all at default size</Used>}
        >
            <Buttons />
        </Demo>

        <Demo
            id="float-button"
            title="FloatButton"
            note="Not overridden — it takes the primary colour and the elevated surface. The buttons below are pinned inside the grey stage rather than the viewport corner."
        >
            <FloatButtons />
        </Demo>

        <Demo
            id="typography"
            title="Typography"
            note="The type scale is Ant Design's, on the app's own font family. The muted tones are the visible change: colorTextTertiary and colorTextQuaternary sit at 0.54–0.58 alpha where antd uses 0.45 and 0.25, so secondary and disabled text is darker than stock."
            extra={<Used>Title 2–5, Text secondary and Paragraph</Used>}
        >
            <Typographies />
        </Demo>

        <Demo
            id="divider"
            title="Divider"
            note="Every hairline here is colorSplit, which this theme sets to 6% of the text colour rather than antd's derived grey — so dividers follow a tenant's font colour."
        >
            <Dividers />
        </Demo>
    </Group>
);
