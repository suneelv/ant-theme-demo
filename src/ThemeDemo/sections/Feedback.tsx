import { useState } from 'react';
import { Alert, Button, Drawer, Flex, Modal, Progress, Result, Skeleton, Space, Spin, Typography, theme } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Section } from '../primitives';
import { Specimen } from '../Specimen';
import { Compare, CompareTrio } from '../Compare';
import { unpinnedSkeleton, unpinnedSpin } from '../derivedTokens';

const { Paragraph } = Typography;

const STATUSES = ['success', 'warning', 'error', 'info'] as const;

const PROGRESS_LOW = 30;
const PROGRESS_MID = 50;
const PROGRESS_HIGH = 70;
const PROGRESS_CIRCLE = 75;
const PROGRESS_FULL = 100;
const SKELETON_ROWS = 3;
const RESULT_MIN_WIDTH = 220;

const Alerts = () => (
    <Space orientation="vertical" style={{ width: '100%' }}>
        {STATUSES.map((status) => (
            <Alert key={status} type={status} showIcon title={`${status} alert`} />
        ))}
        <Alert
            type="error"
            showIcon
            closable
            title="With description"
            description="The tint background is colorXBg and the border is colorXBorder."
        />
        <Alert banner type="warning" title="Banner variant" />
    </Space>
);

const Progresses = () => {
    const { token } = theme.useToken();

    return (
        <>
            <Progress percent={PROGRESS_LOW} />
            <Progress percent={PROGRESS_HIGH} status="active" />
            <Progress percent={PROGRESS_FULL} status="success" />
            <Progress percent={PROGRESS_MID} status="exception" />
            <Flex gap={token.marginLG} wrap style={{ marginTop: token.margin }}>
                <Progress type="circle" percent={PROGRESS_CIRCLE} />
                <Progress type="dashboard" percent={PROGRESS_LOW} />
            </Flex>
        </>
    );
};

const Spinners = () => {
    const { token } = theme.useToken();

    return (
        <Flex gap={token.marginLG} wrap align="center">
            <Spin size="small" indicator={<LoadingOutlined spin />} />
            <Spin indicator={<LoadingOutlined spin />} />
            <Spin size="large" indicator={<LoadingOutlined spin />} />
            {/* antd 6 defaults Spin to its dots indicator; the app only uses the circle, so the
                spinners above are pinned to it. This one is left on the default because the dots
                are what dotSize actually sizes. */}
            <Spin size="small" />
            <Spin />
        </Flex>
    );
};

const UnpinnedSpin = () => {
    const { token } = theme.useToken();

    return (
        <CompareTrio
            unpinned={unpinnedSpin(token)}
            ours="dotSize 20 · SM 14"
            middle="dotSize 24 · SM 16.8 — controlHeightLG / 2"
            stock="dotSize 20 · SM 14"
        >
            <Spinners />
        </CompareTrio>
    );
};

const Skeletons = () => (
    <>
        <Skeleton active title paragraph={{ rows: SKELETON_ROWS }} />
        <Skeleton active avatar title paragraph={{ rows: 2 }} />
    </>
);

const UnpinnedSkeleton = () => {
    const { token } = theme.useToken();

    return (
        <CompareTrio
            unpinned={unpinnedSkeleton(token)}
            ours="titleHeight 16 · line 16"
            middle="titleHeight 20 · line 20 — controlHeight / 2"
            stock="titleHeight 16 · line 16"
        >
            <Skeletons />
        </CompareTrio>
    );
};

/* Its own component rather than section state: Compare renders its children once per column, so
   each column needs its own open flag or one button would open both dialogs. */
const Dialogs = () => {
    const { token } = theme.useToken();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    return (
        <Flex gap={token.margin} wrap>
            <Button type="primary" onClick={() => setModalOpen(true)}>
                Open modal
            </Button>
            <Button onClick={() => setDrawerOpen(true)}>Open drawer</Button>
            <Modal
                open={isModalOpen}
                title="Modal title"
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
            >
                <Paragraph>
                    The title line height is 1.375 against antd&apos;s 1.5, and the footer buttons show the raised
                    control height. The header background is inherited: antd leaves it transparent so it follows the
                    modal surface.
                </Paragraph>
            </Modal>
            <Drawer title="Drawer title" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
                <Paragraph>Drawer body inherits the surface and text tokens.</Paragraph>
            </Drawer>
        </Flex>
    );
};

const Results = () => (
    <Flex wrap>
        <Result status="success" title="Success" style={{ flex: 1, minWidth: RESULT_MIN_WIDTH }} />
        <Result status="error" title="Error" style={{ flex: 1, minWidth: RESULT_MIN_WIDTH }} />
    </Flex>
);

export const Feedback = () => (
    <Section
        id="group-feedback"
        title="Feedback"
        summary="Where the status ramps land in practice, and where the export pins two of the loading affordances back down."
    >
        <Specimen
            id="alert"
            title="Alert"
            tokens={['colorSuccessBg', 'colorWarningBg', 'colorErrorBg', 'colorInfoBg']}
            note="What to look for is the border, not the fill. The theme sets colorXBorder to the full-saturation base tone, so each alert is outlined in the status colour itself, where antd uses a pale tint two steps lighter than its icon. The tint backgrounds differ too — ours come from the design export rather than antd's derived palette."
        >
            <Compare ours="border = the status base tone" stock="border = a pale derived tint">
                <Alerts />
            </Compare>
        </Specimen>

        <Specimen
            id="progress"
            title="Progress"
            note="Not overridden. The bar colour is colorInfo, so it follows our blue rather than antd's, and the success and exception states follow the status ramps."
        >
            <Compare>
                <Progresses />
            </Compare>
        </Specimen>

        <Specimen
            id="spin"
            title="Spin — dot size"
            tokens={['Spin.dotSize', 'Spin.dotSizeSM']}
            note="The first three spinners are pinned to the circle indicator, which the app uses everywhere and which ignores these tokens. The last two are antd's default dots, which is what dotSize actually sizes — those are the ones to compare. Ant Design derives the dot as controlHeightLG / 2, so our raised scale would give 24; the pin holds 20."
        >
            <UnpinnedSpin />
        </Specimen>

        <Specimen
            id="skeleton"
            title="Skeleton — line height"
            tokens={['Skeleton.titleHeight', 'Skeleton.paragraphLiHeight']}
            note="What to look for is the thickness of each grey bar and, with it, the overall height of the block. Ant Design derives both the title and the paragraph lines as controlHeight / 2, which at our scale is 20 — noticeably heavier than the text they stand in for. The pin holds 16, close to the real line height of body text, so the placeholder is the size of what replaces it."
        >
            <UnpinnedSkeleton />
        </Specimen>

        <Specimen
            id="modal-drawer"
            title="Modal and Drawer"
            tokens={['Modal.titleLineHeight']}
            note="Open the modal from each column and compare the space the title takes: ours is 1.375 against antd's 1.5, which tightens the header. The footer buttons show the raised control height. Everything else — the mask, the radius, the elevated surface — is inherited."
        >
            <Compare ours="titleLineHeight 1.375" stock="titleLineHeight 1.5">
                <Dialogs />
            </Compare>
        </Specimen>

        <Specimen
            id="result"
            title="Result"
            note="Not overridden. The icon takes the status base tone straight from the ramp, so this is the clearest look at our success green and error red at size."
        >
            <Compare>
                <Results />
            </Compare>
        </Specimen>
    </Section>
);
