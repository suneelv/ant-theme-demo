import { useState } from 'react';
import { Alert, App, Button, Drawer, Flex, Modal, Popconfirm, Result, Skeleton, Space, Spin, Typography } from 'antd';
import type { DrawerProps } from 'antd';
import { DeleteOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { Demo, Group, Row, Used } from '../showcase';

const { Paragraph, Text } = Typography;

const ALERT_TYPES = ['success', 'info', 'warning', 'error'] as const;
const DRAWER_PLACEMENTS: DrawerProps['placement'][] = ['left', 'right', 'top', 'bottom'];
const RESULT_MIN_WIDTH = 220;
const SKELETON_ROWS = 3;
const NOTIFICATION_DURATION = 3;

const Alerts = () => (
    <>
        <Row label="types">
            <Space orientation="vertical" style={{ width: '100%' }}>
                {ALERT_TYPES.map((type) => (
                    <Alert key={type} type={type} showIcon title={`${type} alert`} />
                ))}
            </Space>
        </Row>

        <Row label="without an icon">
            <Space orientation="vertical" style={{ width: '100%' }}>
                {ALERT_TYPES.map((type) => (
                    <Alert key={type} type={type} title={`${type} alert`} />
                ))}
            </Space>
        </Row>

        <Row label="with a description">
            <Space orientation="vertical" style={{ width: '100%' }}>
                <Alert
                    type="error"
                    showIcon
                    closable
                    title="With description"
                    description="The tint background is colorErrorBg and the border is the full-saturation base tone."
                />
                <Alert
                    type="info"
                    showIcon
                    title="With an action"
                    description="Alerts can carry their own controls."
                    action={
                        <Space orientation="vertical">
                            <Button size="small" type="primary">
                                Accept
                            </Button>
                            <Button size="small" danger>
                                Decline
                            </Button>
                        </Space>
                    }
                />
            </Space>
        </Row>

        <Row label="banner">
            <Space orientation="vertical" style={{ width: '100%' }}>
                <Alert banner type="warning" title="Banner variant — square corners, full bleed" />
                <Alert banner type="error" title="Banner with a close button" closable />
            </Space>
        </Row>
    </>
);

const Messages = () => {
    const { message } = App.useApp();

    return (
        <>
            <Row label="types">
                <Button onClick={() => message.info('Settings saved as a draft.')}>info</Button>
                <Button onClick={() => message.success('Device added.')}>success</Button>
                <Button onClick={() => message.warning('The connection is unstable.')}>warning</Button>
                <Button onClick={() => message.error('Could not reach the device.')}>error</Button>
                <Button onClick={() => message.loading('Syncing…')}>loading</Button>
            </Row>

            <Row label="duration + content">
                <Button onClick={() => message.success({ content: 'Sticks around for 10s', duration: 10 })}>
                    long duration
                </Button>
                <Button
                    onClick={() => message.open({ type: 'success', content: 'Custom icon', icon: <SmileOutlined /> })}
                >
                    custom icon
                </Button>
                <Button onClick={() => message.destroy()}>dismiss all</Button>
            </Row>
        </>
    );
};

const Modals = () => {
    const { modal } = App.useApp();
    const [open, setOpen] = useState(false);
    const [noFooterOpen, setNoFooterOpen] = useState(false);

    return (
        <>
            <Row label="basic">
                <Button type="primary" onClick={() => setOpen(true)}>
                    Open modal
                </Button>
                <Button onClick={() => setNoFooterOpen(true)}>Without a footer</Button>
                <Modal
                    open={open}
                    title="Modal title"
                    okText="Save"
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                >
                    <Paragraph>
                        The title line height is pinned to 1.375 against antd&apos;s 1.5, which tightens the header. The
                        footer buttons show the raised control height.
                    </Paragraph>
                </Modal>
                <Modal open={noFooterOpen} title="No footer" footer={null} onCancel={() => setNoFooterOpen(false)}>
                    <Paragraph>The body owns its own actions.</Paragraph>
                </Modal>
            </Row>

            <Row label="confirm dialogs">
                <Button
                    onClick={() =>
                        modal.confirm({
                            title: 'Delete this device?',
                            content: 'This cannot be undone.',
                            okButtonProps: { danger: true },
                        })
                    }
                >
                    confirm
                </Button>
                <Button onClick={() => modal.info({ title: 'Firmware 4.2.1', content: 'Released two weeks ago.' })}>
                    info
                </Button>
                <Button onClick={() => modal.success({ title: 'Device added', content: 'Sensor A is now online.' })}>
                    success
                </Button>
                <Button onClick={() => modal.warning({ title: 'Nearly out of storage', content: '92% used.' })}>
                    warning
                </Button>
                <Button
                    onClick={() => modal.error({ title: 'Could not save', content: 'The device rejected the change.' })}
                >
                    error
                </Button>
            </Row>
        </>
    );
};

const Drawers = () => {
    const [placement, setPlacement] = useState<DrawerProps['placement']>();
    const [large, setLarge] = useState(false);

    return (
        <>
            <Row label="placements">
                {DRAWER_PLACEMENTS.map((value) => (
                    <Button key={value} onClick={() => setPlacement(value)}>
                        {value}
                    </Button>
                ))}
                <Drawer
                    title="Drawer title"
                    placement={placement}
                    open={Boolean(placement)}
                    onClose={() => setPlacement(undefined)}
                >
                    <Paragraph>The body inherits the surface and text tokens.</Paragraph>
                </Drawer>
            </Row>

            <Row label="large, with a footer">
                <Button type="primary" onClick={() => setLarge(true)}>
                    Open a large drawer
                </Button>
                <Drawer
                    open={large}
                    size="large"
                    title="Device settings"
                    extra={<Button size="small">Reset</Button>}
                    footer={
                        <Flex justify="flex-end" gap={8}>
                            <Button onClick={() => setLarge(false)}>Cancel</Button>
                            <Button type="primary" onClick={() => setLarge(false)}>
                                Save
                            </Button>
                        </Flex>
                    }
                    onClose={() => setLarge(false)}
                >
                    <Paragraph>A full-height drawer with its own footer actions.</Paragraph>
                </Drawer>
            </Row>
        </>
    );
};

const Notifications = () => {
    const { notification } = App.useApp();

    return (
        <>
            <Row label="types">
                <Button
                    onClick={() =>
                        notification.info({
                            message: 'Firmware available',
                            description: 'Version 4.2.1 is ready to install.',
                        })
                    }
                >
                    info
                </Button>
                <Button
                    onClick={() =>
                        notification.success({ message: 'Device added', description: 'Sensor A is now reporting.' })
                    }
                >
                    success
                </Button>
                <Button
                    onClick={() => notification.warning({ message: 'Battery low', description: 'Sensor C is at 8%.' })}
                >
                    warning
                </Button>
                <Button
                    onClick={() =>
                        notification.error({ message: 'Connection lost', description: 'Sensor C stopped reporting.' })
                    }
                >
                    error
                </Button>
            </Row>

            <Row label="placement + actions">
                <Button
                    onClick={() =>
                        notification.open({
                            message: 'Bottom right',
                            placement: 'bottomRight',
                            duration: NOTIFICATION_DURATION,
                        })
                    }
                >
                    bottomRight
                </Button>
                <Button
                    onClick={() =>
                        notification.open({
                            message: 'Top left',
                            placement: 'topLeft',
                            duration: NOTIFICATION_DURATION,
                        })
                    }
                >
                    topLeft
                </Button>
                <Button
                    onClick={() =>
                        notification.open({
                            message: 'Update ready',
                            description: 'Install it now or schedule it for tonight.',
                            btn: (
                                <Button type="primary" size="small">
                                    Install
                                </Button>
                            ),
                        })
                    }
                >
                    with an action
                </Button>
                <Button onClick={() => notification.destroy()}>dismiss all</Button>
            </Row>
        </>
    );
};

const Popconfirms = () => (
    <>
        <Row label="basic">
            <Popconfirm title="Delete this device?" onConfirm={() => undefined}>
                <Button danger>Delete</Button>
            </Popconfirm>
            <Popconfirm
                title="Delete this device?"
                description="Its history goes with it."
                okText="Delete"
                okButtonProps={{ danger: true }}
                cancelText="Keep"
            >
                <Button danger icon={<DeleteOutlined />}>
                    With a description
                </Button>
            </Popconfirm>
        </Row>

        <Row label="variations">
            <Popconfirm title="Apply to every device?" placement="right">
                <Button>Right placement</Button>
            </Popconfirm>
            <Popconfirm title="Nothing to confirm" disabled>
                <Button disabled>Disabled</Button>
            </Popconfirm>
            <Popconfirm title="Acknowledged?" showCancel={false} okText="Got it">
                <Button>Without cancel</Button>
            </Popconfirm>
        </Row>
    </>
);

const Results = () => (
    <>
        <Row label="statuses">
            <Flex wrap style={{ width: '100%' }}>
                <Result
                    status="success"
                    title="Success"
                    subTitle="The device was added."
                    style={{ flex: 1, minWidth: RESULT_MIN_WIDTH }}
                />
                <Result
                    status="error"
                    title="Error"
                    subTitle="The device rejected the change."
                    style={{ flex: 1, minWidth: RESULT_MIN_WIDTH }}
                />
                <Result status="info" title="Info" style={{ flex: 1, minWidth: RESULT_MIN_WIDTH }} />
                <Result status="warning" title="Warning" style={{ flex: 1, minWidth: RESULT_MIN_WIDTH }} />
            </Flex>
        </Row>

        <Row label="http statuses">
            <Flex wrap style={{ width: '100%' }}>
                <Result
                    status="403"
                    title="403"
                    subTitle="You are not allowed in here."
                    style={{ flex: 1, minWidth: RESULT_MIN_WIDTH }}
                />
                <Result
                    status="404"
                    title="404"
                    subTitle="Nothing at this address."
                    style={{ flex: 1, minWidth: RESULT_MIN_WIDTH }}
                />
                <Result
                    status="500"
                    title="500"
                    subTitle="Something went wrong on our side."
                    extra={<Button type="primary">Back home</Button>}
                    style={{ flex: 1, minWidth: RESULT_MIN_WIDTH }}
                />
            </Flex>
        </Row>
    </>
);

const Skeletons = () => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <Row label="paragraph">
                <div style={{ width: '100%' }}>
                    <Skeleton active title paragraph={{ rows: SKELETON_ROWS }} />
                </div>
            </Row>

            <Row label="with an avatar">
                <div style={{ width: '100%' }}>
                    <Skeleton active avatar title paragraph={{ rows: 2 }} />
                    <Skeleton avatar title={false} paragraph={{ rows: 1 }} />
                </div>
            </Row>

            <Row label="element shapes">
                <Skeleton.Button active />
                <Skeleton.Button active shape="circle" />
                <Skeleton.Input active />
                <Skeleton.Avatar active size="large" />
                <Skeleton.Image active />
                <Skeleton.Node active style={{ width: 120, height: 60 }} />
            </Row>

            <Row label="wrapping content">
                <div style={{ width: '100%' }}>
                    <Skeleton loading={loading} active>
                        <Paragraph>The real content, once it has arrived.</Paragraph>
                    </Skeleton>
                    <Button size="small" onClick={() => setLoading((previous) => !previous)}>
                        {loading ? 'Show content' : 'Show skeleton'}
                    </Button>
                </div>
            </Row>
        </>
    );
};

const Spins = () => {
    const [spinning, setSpinning] = useState(true);

    return (
        <>
            <Row label="sizes">
                <Spin size="large" />
                <Spin />
                <Spin size="small" />
            </Row>

            <Row label="indicators">
                {/* The app pins the circle indicator through ConfigProvider, so every spinner on
                    this page is a circle; this one asks for it explicitly. */}
                <Spin indicator={<LoadingOutlined spin />} />
                <Spin percent="auto" />
                <Spin description="Loading devices…">
                    <div style={{ padding: 24, width: 260 }}>
                        <Text type="secondary">Content behind the mask.</Text>
                    </div>
                </Spin>
            </Row>

            <Row label="toggled">
                <div style={{ width: '100%' }}>
                    <Spin spinning={spinning}>
                        <Paragraph style={{ padding: 24, margin: 0 }}>Wrapped content.</Paragraph>
                    </Spin>
                    <Button size="small" onClick={() => setSpinning((previous) => !previous)}>
                        {spinning ? 'Stop' : 'Start'}
                    </Button>
                </div>
            </Row>
        </>
    );
};

export const Feedback = () => (
    <Group
        id="group-feedback"
        title="Feedback"
        summary="Where the status ramps land in practice, and where the export pins the loading affordances back down."
    >
        <Demo
            id="alert"
            title="Alert"
            note="The border is the change to look at: the theme sets colorXBorder to the full-saturation base tone, so each alert is outlined in the status colour itself where antd uses a pale tint. The tint backgrounds come from the design export too."
            extra={<Used>error and warning with an icon, at the top of a form</Used>}
        >
            <Alerts />
        </Demo>

        <Demo
            id="message"
            title="Message"
            note="Reached through App.useApp() rather than the static import, so it renders inside this theme's ConfigProvider."
            extra={<Used>success and error after a save</Used>}
        >
            <Messages />
        </Demo>

        <Demo
            id="modal"
            title="Modal"
            note="titleLineHeight is pinned to 1.375 against antd's 1.5. Everything else — the mask, the radius, the elevated surface — is inherited, and the footer buttons carry the raised control height."
            extra={<Used>form dialogs and a danger confirm before a delete</Used>}
        >
            <Modals />
        </Demo>

        <Demo
            id="drawer"
            title="Drawer"
            note="Not overridden; it inherits the surface and text tokens. Every drawer here opens over the page, the way it does in the app."
            extra={<Used>right placement, large size, with a footer</Used>}
        >
            <Drawers />
        </Demo>

        <Demo
            id="notification"
            title="Notification"
            note="Also taken from App.useApp(). The icons carry the status ramps, so this is the clearest look at the success green and error red at size."
        >
            <Notifications />
        </Demo>

        <Demo
            id="popconfirm"
            title="Popconfirm"
            note="Not overridden. Its buttons are the same raised controls as everywhere else, which is why the popup is taller than stock."
            extra={<Used>a danger confirm on row-level delete actions</Used>}
        >
            <Popconfirms />
        </Demo>

        <Demo
            id="result"
            title="Result"
            note="Not overridden. The icon takes the status base tone straight from the ramp."
        >
            <Results />
        </Demo>

        <Demo
            id="skeleton"
            title="Skeleton"
            note="titleHeight and paragraphLiHeight are pinned to 16 where the raised scale would derive 20 — so the placeholder is the size of the text it stands in for."
            extra={<Used>active, with a paragraph, while a page loads</Used>}
        >
            <Skeletons />
        </Demo>

        <Demo
            id="spin"
            title="Spin"
            note="The app pins the circle indicator globally through ConfigProvider, so every spinner here is a circle unless it asks for antd 6's dots. dotSize is pinned to 20 against the 24 the raised scale would derive."
            extra={<Used>the circle indicator at every size</Used>}
        >
            <Spins />
        </Demo>
    </Group>
);
