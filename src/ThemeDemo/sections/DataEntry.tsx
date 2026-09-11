import { useState } from 'react';
import type { Key } from 'react';
import {
    Button,
    Checkbox,
    DatePicker,
    Flex,
    Form,
    Input,
    InputNumber,
    Radio,
    Rate,
    Select,
    Slider,
    Switch,
    Transfer,
    Typography,
    Upload,
    theme,
} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Section } from '../primitives';
import { Specimen } from '../Specimen';
import { Compare, CompareTrio } from '../Compare';
import {
    unpinnedInputNumber,
    unpinnedRate,
    unpinnedSlider,
    unpinnedSwitch,
    unpinnedTransfer,
    unpinnedUpload,
} from '../derivedTokens';
import { InputFontSizeComparison, InputHeightComparison } from '../InputMetrics';

const { Text } = Typography;

const SELECT_OPTIONS = [
    { value: 'one', label: 'Option one' },
    { value: 'two', label: 'Option two' },
    { value: 'three', label: 'Option three' },
];

const NUMBER_VALUE = 42;
const RATE_VALUE = 3;
const SLIDER_VALUE = 40;
const SLIDER_RANGE_START = 20;
const SLIDER_RANGE_END = 60;
const SLIDER_RANGE: [number, number] = [SLIDER_RANGE_START, SLIDER_RANGE_END];
const TEXTAREA_ROWS = 3;
const FIELD_WIDTH = 200;
const WIDE_FIELD_WIDTH = 240;
const NARROW_FIELD_WIDTH = 160;
const TRANSFER_COUNT = 6;

const TRANSFER_DATA = Array.from({ length: TRANSFER_COUNT }, (_, index) => ({
    key: String(index),
    title: `Device ${index + 1}`,
}));

const TRANSFER_TARGET = ['1', '3'];

const ValidationForm = () => (
    <Form layout="vertical">
        <Form.Item label="Default">
            <Input placeholder="Enter a value" />
        </Form.Item>
        <Form.Item label="Success" validateStatus="success" hasFeedback help="Looks good.">
            <Input defaultValue="valid@example.com" />
        </Form.Item>
        <Form.Item label="Warning" validateStatus="warning" hasFeedback help="Deprecated soon.">
            <Input defaultValue="legacy value" />
        </Form.Item>
        <Form.Item label="Error" validateStatus="error" hasFeedback help="This field is required." required>
            <Input />
        </Form.Item>
    </Form>
);

const Controls = () => {
    const { token } = theme.useToken();

    return (
        <>
            {/* flex-start, not the default stretch: the multi-select grows to two rows once it
                holds a couple of tags, and stretch would drag every control on its line up with it,
                hiding the very control height this specimen exists to show. */}
            <Flex gap={token.margin} wrap align="flex-start">
                <Input placeholder="Text input" style={{ width: FIELD_WIDTH }} />
                <Input.Password placeholder="Password" style={{ width: FIELD_WIDTH }} />
                <Input.Search placeholder="Search" style={{ width: WIDE_FIELD_WIDTH }} />
                <Input disabled defaultValue="Disabled" style={{ width: NARROW_FIELD_WIDTH }} />
                <Select defaultValue="one" style={{ width: FIELD_WIDTH }} options={SELECT_OPTIONS} />
                <Select
                    mode="multiple"
                    defaultValue={['one', 'two']}
                    style={{ width: WIDE_FIELD_WIDTH }}
                    options={SELECT_OPTIONS}
                />
                <DatePicker />
                <DatePicker.RangePicker />
            </Flex>
            <Input.TextArea rows={TEXTAREA_ROWS} placeholder="Textarea" style={{ marginTop: token.margin }} />
        </>
    );
};

const Steppers = () => {
    const { token } = theme.useToken();

    return (
        <Flex gap={token.margin} wrap align="flex-start">
            <InputNumber size="small" defaultValue={NUMBER_VALUE} />
            <InputNumber defaultValue={NUMBER_VALUE} />
            <InputNumber size="large" defaultValue={NUMBER_VALUE} />
            <InputNumber defaultValue={NUMBER_VALUE} addonBefore="+" addonAfter="°C" />
        </Flex>
    );
};

const UnpinnedInputNumber = () => {
    const { token } = theme.useToken();

    return (
        <CompareTrio
            unpinned={unpinnedInputNumber(token)}
            ours="handleWidth 22 · small text 12"
            middle="handleWidth 30 — controlHeightSM − 2 · small text 14"
            stock="handleWidth 22 · small text 14"
        >
            <Steppers />
        </CompareTrio>
    );
};

const Checkboxes = () => {
    const { token } = theme.useToken();

    return (
        <Flex gap={token.marginLG} wrap align="center">
            <Checkbox>Unchecked</Checkbox>
            <Checkbox defaultChecked>Checked</Checkbox>
            <Checkbox indeterminate>Indeterminate</Checkbox>
            <Checkbox disabled>Disabled</Checkbox>
            <Radio.Group defaultValue="a">
                <Radio value="a">Radio A</Radio>
                <Radio value="b">Radio B</Radio>
                <Radio value="c" disabled>
                    Disabled
                </Radio>
            </Radio.Group>
            <Radio.Group defaultValue="x" buttonStyle="solid">
                <Radio.Button value="x">Solid X</Radio.Button>
                <Radio.Button value="y">Solid Y</Radio.Button>
            </Radio.Group>
        </Flex>
    );
};

const Switches = () => {
    const { token } = theme.useToken();

    return (
        <Flex vertical gap={token.margin}>
            <Flex gap={token.marginLG} wrap align="center">
                <Text type="secondary">small</Text>
                <Switch size="small" defaultChecked />
                <Switch size="small" />
                <Switch size="small" disabled defaultChecked />
            </Flex>
            <Flex gap={token.marginLG} wrap align="center">
                <Text type="secondary">default</Text>
                <Switch defaultChecked />
                <Switch />
                <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
            </Flex>
        </Flex>
    );
};

const UnpinnedSwitch = () => {
    const { token } = theme.useToken();

    return (
        <CompareTrio
            unpinned={unpinnedSwitch(token)}
            ours="small track 16 × 28"
            middle="small track 20 × 36 — controlHeight / 2"
            stock="small track 16 × 28"
        >
            <Switches />
        </CompareTrio>
    );
};

const Sliders = () => (
    <>
        <Slider defaultValue={SLIDER_VALUE} />
        <Slider range defaultValue={SLIDER_RANGE} />
        <Slider defaultValue={SLIDER_VALUE} disabled />
    </>
);

const UnpinnedSlider = () => {
    const { token } = theme.useToken();

    return (
        <CompareTrio
            unpinned={unpinnedSlider(token)}
            ours="handle 10, 12 on hover"
            middle="handle 12, 16 on hover — controlHeightLG / 4"
            stock="handle 10, 12 on hover"
        >
            <Sliders />
        </CompareTrio>
    );
};

const Rates = () => {
    const { token } = theme.useToken();

    return (
        <Flex vertical gap={token.margin}>
            <Rate defaultValue={RATE_VALUE} />
            <Rate defaultValue={RATE_VALUE} disabled />
            <Rate defaultValue={RATE_VALUE} allowHalf />
        </Flex>
    );
};

const UnpinnedRate = () => {
    const { token } = theme.useToken();

    return (
        <CompareTrio
            unpinned={unpinnedRate(token)}
            ours="starSize 20"
            middle="starSize 25 — controlHeight × 0.625"
            stock="starSize 20"
        >
            <Rates />
        </CompareTrio>
    );
};

const Transferrer = () => {
    const [target, setTarget] = useState<Key[]>(TRANSFER_TARGET);

    return (
        <Transfer
            dataSource={TRANSFER_DATA}
            targetKeys={target}
            render={(item) => item.title}
            onChange={(next) => setTarget(next)}
        />
    );
};

const UnpinnedTransfer = () => {
    const { token } = theme.useToken();

    return (
        <CompareTrio
            unpinned={unpinnedTransfer(token)}
            ours="itemPaddingBlock 5"
            middle="itemPaddingBlock 9 — (controlHeight − line height) / 2"
            stock="itemPaddingBlock 5"
        >
            <Transferrer />
        </CompareTrio>
    );
};

const Uploads = () => {
    const { token } = theme.useToken();

    return (
        <Flex gap={token.margin} wrap align="flex-start">
            <Upload>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
            <Upload listType="picture-card" beforeUpload={() => false}>
                <PlusOutlined />
            </Upload>
        </Flex>
    );
};

const UnpinnedUpload = () => {
    const { token } = theme.useToken();

    return (
        <CompareTrio
            unpinned={unpinnedUpload(token)}
            ours="pictureCardSize 102"
            middle="pictureCardSize 122.4 — controlHeightLG × 2.55"
            stock="pictureCardSize 102"
        >
            <Uploads />
        </CompareTrio>
    );
};

export const DataEntry = () => (
    <Section
        id="group-data-entry"
        title="Data entry"
        summary="Every form control, at the raised height scale. This is where the theme's sizing decisions are most visible — and where the design export pins the most sizes back."
    >
        <Specimen
            id="form-layout"
            title="Form — validation states"
            tokens={['colorError', 'colorWarning', 'colorSuccess', 'controlHeight']}
            note="Field height, label spacing and the focus ring all come from the raised control scale, so the whole form runs taller. What to look for beyond that is the status colours: our error red is harder than antd's and the warning amber is deeper. Tab into the error field in each column — our focus ring is 4px at 0.66 alpha against antd's 3px at 0.1."
        >
            <Compare ours="controlHeight 40 · lineWidthFocus 4" stock="controlHeight 32 · lineWidthFocus 3">
                <ValidationForm />
            </Compare>
        </Specimen>

        <Specimen
            id="input-height"
            title="Input height — paddingBlock vs the button beside it"
            tokens={['Input.paddingBlock', 'Input.paddingBlockSM', 'Input.paddingBlockLG']}
            note="What to look for: in each column the input and the button should share a top and bottom edge. Ant Design gives a text input no height rule at all, so its height is paddingBlock × 2 + font line-height + 2px of border. The button takes controlHeight directly. Pinning paddingBlock from the export without also pinning controlHeight would leave the input short, and the readout names the gap — so the export's paddingBlock values are deliberately left out."
        >
            <InputHeightComparison />
        </Specimen>

        <Specimen
            id="input-font-size"
            title="Small input text — inputFontSizeSM"
            tokens={['Input.inputFontSizeSM']}
            note="What to look for: the text inside the small input. This theme sets 12px, matching fontSizeSM, while Ant Design uses the same 14px it uses at default size. Compare each small field against the default field under it — only the left column steps down. This is the one input token in the export Ant Design cannot arrive at on its own."
        >
            <InputFontSizeComparison />
        </Specimen>

        <Specimen
            id="inputs"
            title="Input, Select and the pickers"
            tokens={['controlHeight']}
            note="Nothing here is overridden — this is the raised control scale on everything built out of the input box. What to look for is the multi-select: its tags size off controlHeight, so they grow with the field rather than staying put."
        >
            <Compare ours="controlHeight 40" stock="controlHeight 32">
                <Controls />
            </Compare>
        </Specimen>

        <Specimen
            id="input-number"
            title="InputNumber — handleWidth"
            tokens={['InputNumber.handleWidth', 'InputNumber.inputFontSizeSM']}
            extra={<Text type="secondary">hover a field to reveal the steppers</Text>}
            note="Hover each field: the up/down steppers only appear on hover. What to look for is the width of that stepper column against the field's own width. Ant Design derives it as controlHeightSM − 2 borders, which at our 32px small control is 30 — a third of a 90px field. The pin holds 22, its value at a 24px small control. The pinned and stock columns agree; the middle column is what the pin displaces. The small field also carries the 12px input text from the Input block."
        >
            <UnpinnedInputNumber />
        </Specimen>

        <Specimen
            id="checkbox-radio"
            title="Checkbox and Radio"
            tokens={['controlInteractiveSize', 'Radio.dotSize']}
            note="The checkbox square is pinned to 16 where Ant Design would derive controlHeight / 2, so it stays put while everything around it grows — which is why it looks small against our 40px fields and normal against antd's 32px ones. The radio dot goes the other way: 8 against antd's 6, because a taller row needs a heavier checked state."
        >
            <Compare ours="controlInteractiveSize 16 · dotSize 8" stock="controlInteractiveSize 16 · dotSize 6">
                <Checkboxes />
            </Compare>
        </Specimen>

        <Specimen
            id="switch"
            title="Switch — the small track"
            tokens={[
                'Switch.trackHeightSM',
                'Switch.trackMinWidthSM',
                'Switch.handleSizeSM',
                'Switch.innerMinMarginSM',
                'Switch.innerMaxMarginSM',
            ]}
            note="Only the small switch is pinned. Ant Design sizes it as controlHeight / 2, which at 40 gives a 20 × 36 track — as tall as its own default switch. The pin holds the whole small set at antd's 32px-control values, so the small switch stays genuinely small. What to look for is the top row: the default switch below it is untouched and takes fontSize × lineHeight, so it is the same in every column."
        >
            <UnpinnedSwitch />
        </Specimen>

        <Specimen
            id="slider"
            title="Slider — handle size"
            tokens={['Slider.handleSize', 'Slider.controlSize', 'Slider.handleSizeHover']}
            extra={<Text type="secondary">hover a handle</Text>}
            note="What to look for is the diameter of the handle, then hover it — the handle grows on hover and that size is pinned too. Ant Design derives the resting handle as controlHeightLG / 4 (12 at our scale) and the hover handle as controlHeightSM / 2 (16). The pins hold 10 and 12. The rail itself is a fixed 4px in every column, so the handle is the only thing moving."
        >
            <UnpinnedSlider />
        </Specimen>

        <Specimen
            id="rate"
            title="Rate — star size"
            tokens={['Rate.starSize', 'Rate.starSizeSM', 'Rate.starSizeLG']}
            note="Ant Design sizes a star as controlHeight × 0.625, so our raised scale would give 25px stars against its own 20. The pin holds 20 at every size. What to look for is simply how much room the row of stars takes — the middle column is noticeably wider than the other two."
        >
            <UnpinnedRate />
        </Specimen>

        <Specimen
            id="transfer"
            title="Transfer — itemPaddingBlock"
            tokens={['Transfer.itemPaddingBlock']}
            note="What to look for is the height of each row in the two lists, and how many rows fit before the list scrolls. Ant Design derives the padding as (controlHeight − line height) / 2, which at our scale is 9 and makes every row 40px. The pin holds 5, keeping rows compact so the fixed 200px list still shows the same number of devices it did at antd's control height. The list box itself is not overridden."
        >
            <UnpinnedTransfer />
        </Specimen>

        <Specimen
            id="upload"
            title="Upload — pictureCardSize"
            tokens={['Upload.pictureCardSize']}
            note="What to look for is the dashed square. Ant Design derives it as controlHeightLG × 2.55, which at our 48px large control is 122.4; the pin holds 102, its value at a 40px large control. The button-style uploader beside it is not pinned, so it grows with the control scale."
        >
            <UnpinnedUpload />
        </Specimen>
    </Section>
);
