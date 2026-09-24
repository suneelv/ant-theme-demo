import { useState } from 'react';
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Flex,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Space,
    Switch,
    TimePicker,
    TreeSelect,
    Typography,
    theme,
} from 'antd';
import { LockOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Demo, Group, Row, Used } from '../showcase';

const { Text } = Typography;
const { RangePicker } = DatePicker;

const FIELD_WIDTH = 200;
const WIDE_FIELD_WIDTH = 260;
const FORM_WIDTH = 420;
const TEXTAREA_ROWS = 3;
const NUMBER_VALUE = 42;
const PASSWORD_MIN = 8;

/* Fixed dates rather than today(), so the gallery renders identically on every visit. */
const DATE = dayjs('2026-01-12');
const DATE_RANGE: [dayjs.Dayjs, dayjs.Dayjs] = [dayjs('2026-01-12'), dayjs('2026-01-19')];
const DATE_MULTIPLE = [dayjs('2026-01-12'), dayjs('2026-01-19'), dayjs('2026-01-26')];
const TIME = dayjs('2026-01-12T09:30:00');
const TIME_RANGE: [dayjs.Dayjs, dayjs.Dayjs] = [dayjs('2026-01-12T09:00:00'), dayjs('2026-01-12T17:00:00')];

const SELECT_OPTIONS = [
    { value: 'north', label: 'North wing' },
    { value: 'south', label: 'South wing' },
    { value: 'east', label: 'East wing' },
    { value: 'west', label: 'West wing', disabled: true },
];

const GROUPED_OPTIONS = [
    {
        label: 'Building A',
        options: [
            { value: 'a-lobby', label: 'Main lobby' },
            { value: 'a-1', label: 'First floor' },
        ],
    },
    { label: 'Building B', options: [{ value: 'b-lobby', label: 'Reception desk' }] },
];

const AUTOCOMPLETE_OPTIONS = [
    { value: 'sensor-a@example.com' },
    { value: 'sensor-b@example.com' },
    { value: 'sensor-c@example.com' },
];

const CASCADER_OPTIONS = [
    {
        value: 'europe',
        label: 'Europe',
        children: [
            { value: 'helsinki', label: 'Helsinki office' },
            { value: 'berlin', label: 'Berlin office' },
        ],
    },
    { value: 'asia', label: 'Asia', children: [{ value: 'tokyo', label: 'Tokyo office' }] },
];

const CASCADER_VALUE = ['europe', 'helsinki'];

const TREE_DATA = [
    {
        value: 'building-a',
        title: 'Building A',
        children: [
            { value: 'a-lobby', title: 'Main lobby' },
            { value: 'a-floor-1', title: 'First floor' },
        ],
    },
    { value: 'building-b', title: 'Building B', children: [{ value: 'b-lobby', title: 'Reception desk' }] },
];

const CHECKBOX_OPTIONS = ['Email', 'SMS', 'Push'];

const AutoCompletes = () => {
    const [options, setOptions] = useState<{ value: string }[]>([]);

    return (
        <>
            <Row label="basic">
                <AutoComplete
                    style={{ width: FIELD_WIDTH }}
                    options={AUTOCOMPLETE_OPTIONS}
                    placeholder="Type to filter"
                    filterOption={(input, option) => option!.value.toLowerCase().includes(input.toLowerCase())}
                />
            </Row>

            <Row label="lookup">
                <AutoComplete
                    style={{ width: WIDE_FIELD_WIDTH }}
                    options={options}
                    placeholder="Suggests a domain as you type"
                    onSearch={(value) =>
                        setOptions(
                            value
                                ? ['example.com', 'ant.design'].map((domain) => ({ value: `${value}@${domain}` }))
                                : [],
                        )
                    }
                />
            </Row>

            <Row label="sizes + status">
                <AutoComplete
                    size="large"
                    style={{ width: FIELD_WIDTH }}
                    options={AUTOCOMPLETE_OPTIONS}
                    placeholder="Large"
                />
                <AutoComplete
                    size="small"
                    style={{ width: FIELD_WIDTH }}
                    options={AUTOCOMPLETE_OPTIONS}
                    placeholder="Small"
                />
                <AutoComplete
                    status="error"
                    style={{ width: FIELD_WIDTH }}
                    options={AUTOCOMPLETE_OPTIONS}
                    placeholder="Error"
                />
                <AutoComplete disabled style={{ width: FIELD_WIDTH }} placeholder="Disabled" />
            </Row>
        </>
    );
};

const Cascaders = () => (
    <>
        <Row label="basic">
            <Cascader style={{ width: WIDE_FIELD_WIDTH }} options={CASCADER_OPTIONS} defaultValue={CASCADER_VALUE} />
            <Cascader style={{ width: WIDE_FIELD_WIDTH }} options={CASCADER_OPTIONS} placeholder="Pick an office" />
        </Row>

        <Row label="multiple + search">
            <Cascader
                multiple
                maxTagCount="responsive"
                style={{ width: WIDE_FIELD_WIDTH }}
                options={CASCADER_OPTIONS}
                defaultValue={[
                    ['europe', 'helsinki'],
                    ['asia', 'tokyo'],
                ]}
            />
            <Cascader showSearch style={{ width: WIDE_FIELD_WIDTH }} options={CASCADER_OPTIONS} placeholder="Search" />
        </Row>

        <Row label="sizes + states">
            <Cascader size="large" style={{ width: FIELD_WIDTH }} options={CASCADER_OPTIONS} placeholder="Large" />
            <Cascader size="small" style={{ width: FIELD_WIDTH }} options={CASCADER_OPTIONS} placeholder="Small" />
            <Cascader status="error" style={{ width: FIELD_WIDTH }} options={CASCADER_OPTIONS} placeholder="Error" />
            <Cascader disabled style={{ width: FIELD_WIDTH }} options={CASCADER_OPTIONS} placeholder="Disabled" />
        </Row>
    </>
);

const Checkboxes = () => {
    const { token } = theme.useToken();
    const [checked, setChecked] = useState<string[]>([CHECKBOX_OPTIONS[0]]);
    const allChecked = checked.length === CHECKBOX_OPTIONS.length;

    return (
        <>
            <Row label="single">
                <Checkbox>Unchecked</Checkbox>
                <Checkbox defaultChecked>Checked</Checkbox>
                <Checkbox indeterminate>Indeterminate</Checkbox>
                <Checkbox disabled>Disabled</Checkbox>
                <Checkbox disabled defaultChecked>
                    Disabled checked
                </Checkbox>
            </Row>

            <Row label="group">
                <Checkbox.Group options={CHECKBOX_OPTIONS} defaultValue={[CHECKBOX_OPTIONS[0]]} />
            </Row>

            <Row label="check all">
                <Flex vertical gap={token.marginXS}>
                    <Checkbox
                        indeterminate={checked.length > 0 && !allChecked}
                        checked={allChecked}
                        onChange={(event) => setChecked(event.target.checked ? CHECKBOX_OPTIONS : [])}
                    >
                        Check all
                    </Checkbox>
                    <Checkbox.Group
                        options={CHECKBOX_OPTIONS}
                        value={checked}
                        onChange={(next) => setChecked(next as string[])}
                    />
                </Flex>
            </Row>
        </>
    );
};

const ColorPickers = () => (
    <>
        <Row label="basic">
            <ColorPicker defaultValue="#008188" />
            <ColorPicker defaultValue="#008188" showText />
            <ColorPicker defaultValue="#008188" showText allowClear />
        </Row>

        <Row label="sizes">
            <ColorPicker size="large" defaultValue="#008188" showText />
            <ColorPicker defaultValue="#008188" showText />
            <ColorPicker size="small" defaultValue="#008188" showText />
        </Row>

        <Row label="formats + presets">
            <ColorPicker defaultValue="#008188" defaultFormat="rgb" showText />
            <ColorPicker
                defaultValue="#008188"
                showText
                presets={[{ label: 'Brand', colors: ['#e6f6f6', '#99dcdb', '#008188', '#006a70', '#003940'] }]}
            />
        </Row>

        <Row label="states">
            <ColorPicker disabled defaultValue="#008188" showText />
            <ColorPicker disabledAlpha defaultValue="#008188" showText />
        </Row>
    </>
);

const DatePickers = () => (
    <>
        <Row label="basic">
            <DatePicker defaultValue={DATE} />
            <DatePicker placeholder="No value" />
            <DatePicker showTime defaultValue={DATE} />
        </Row>

        <Row label="picker modes">
            <DatePicker picker="week" />
            <DatePicker picker="month" />
            <DatePicker picker="quarter" />
            <DatePicker picker="year" />
        </Row>

        <Row label="range">
            <RangePicker defaultValue={DATE_RANGE} />
            <RangePicker showTime />
            <RangePicker picker="month" />
        </Row>

        <Row label="multiple">
            <DatePicker
                multiple
                defaultValue={DATE_MULTIPLE}
                style={{ width: WIDE_FIELD_WIDTH }}
                maxTagCount="responsive"
            />
        </Row>

        <Row label="sizes">
            <DatePicker size="large" defaultValue={DATE} />
            <DatePicker defaultValue={DATE} />
            <DatePicker size="small" defaultValue={DATE} />
        </Row>

        <Row label="variants + states">
            <DatePicker variant="filled" defaultValue={DATE} />
            <DatePicker variant="borderless" defaultValue={DATE} />
            <DatePicker variant="underlined" defaultValue={DATE} />
            <DatePicker status="error" defaultValue={DATE} />
            <DatePicker disabled defaultValue={DATE} />
        </Row>
    </>
);

const TimePickers = () => (
    <>
        <Row label="basic">
            <TimePicker defaultValue={TIME} />
            <TimePicker placeholder="No value" />
            <TimePicker use12Hours format="h:mm a" defaultValue={TIME} />
        </Row>

        <Row label="range + steps">
            <TimePicker.RangePicker defaultValue={TIME_RANGE} />
            <TimePicker minuteStep={15} format="HH:mm" defaultValue={TIME} />
        </Row>

        <Row label="sizes + states">
            <TimePicker size="large" defaultValue={TIME} />
            <TimePicker size="small" defaultValue={TIME} />
            <TimePicker status="error" defaultValue={TIME} />
            <TimePicker disabled defaultValue={TIME} />
        </Row>
    </>
);

const Inputs = () => (
    <>
        <Row label="basic">
            <Input style={{ width: FIELD_WIDTH }} placeholder="Text input" />
            <Input style={{ width: FIELD_WIDTH }} allowClear defaultValue="Clearable" />
            <Input style={{ width: FIELD_WIDTH }} disabled defaultValue="Disabled" />
            <Input style={{ width: FIELD_WIDTH }} readOnly defaultValue="Read only" />
        </Row>

        <Row label="affixes + addons">
            <Input style={{ width: FIELD_WIDTH }} prefix={<UserOutlined />} placeholder="Username" />
            <Input style={{ width: FIELD_WIDTH }} suffix={<Text type="secondary">°C</Text>} defaultValue="21.4" />
            <Input style={{ width: WIDE_FIELD_WIDTH }} addonBefore="https://" addonAfter=".com" defaultValue="tenant" />
            <Input style={{ width: WIDE_FIELD_WIDTH }} showCount maxLength={20} defaultValue="Counted" />
        </Row>

        <Row label="password + search">
            <Input.Password style={{ width: FIELD_WIDTH }} prefix={<LockOutlined />} placeholder="Password" />
            <Input.Search style={{ width: WIDE_FIELD_WIDTH }} placeholder="Search devices" enterButton />
            <Input.Search style={{ width: WIDE_FIELD_WIDTH }} placeholder="Search" prefix={<SearchOutlined />} />
        </Row>

        <Row label="sizes">
            <Input size="large" style={{ width: FIELD_WIDTH }} placeholder="Large" />
            <Input style={{ width: FIELD_WIDTH }} placeholder="Default" />
            <Input size="small" style={{ width: FIELD_WIDTH }} placeholder="Small — 12px text" />
        </Row>

        <Row label="variants + status">
            <Input variant="outlined" style={{ width: FIELD_WIDTH }} placeholder="Outlined" />
            <Input variant="filled" style={{ width: FIELD_WIDTH }} placeholder="Filled" />
            <Input variant="borderless" style={{ width: FIELD_WIDTH }} placeholder="Borderless" />
            <Input variant="underlined" style={{ width: FIELD_WIDTH }} placeholder="Underlined" />
            <Input status="error" style={{ width: FIELD_WIDTH }} placeholder="Error" />
            <Input status="warning" style={{ width: FIELD_WIDTH }} placeholder="Warning" />
        </Row>

        <Row label="textarea">
            <Flex vertical gap={8} style={{ width: '100%' }}>
                <Input.TextArea rows={TEXTAREA_ROWS} placeholder="Textarea" />
                <Input.TextArea
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    showCount
                    maxLength={200}
                    placeholder="Auto-sizing, counted"
                />
            </Flex>
        </Row>

        <Row label="compact">
            <Space.Compact>
                <Input style={{ width: FIELD_WIDTH }} defaultValue="Compact input" />
                <Button type="primary">Apply</Button>
            </Space.Compact>
        </Row>
    </>
);

const InputNumbers = () => (
    <>
        <Row label="basic">
            <InputNumber defaultValue={NUMBER_VALUE} />
            <InputNumber min={0} max={100} defaultValue={NUMBER_VALUE} />
            <InputNumber step={0.1} defaultValue={21.4} />
            <InputNumber controls={false} defaultValue={NUMBER_VALUE} />
        </Row>

        <Row label="affixes + addons">
            <InputNumber prefix="€" defaultValue={NUMBER_VALUE} />
            <InputNumber suffix="°C" defaultValue={21.4} />
            <InputNumber addonBefore="+" addonAfter="°C" defaultValue={NUMBER_VALUE} />
            <InputNumber<number>
                style={{ width: FIELD_WIDTH }}
                defaultValue={1000}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                parser={(value) => Number(value?.replace(/\s/g, '') ?? 0)}
            />
        </Row>

        <Row label="sizes + states">
            <InputNumber size="large" defaultValue={NUMBER_VALUE} />
            <InputNumber defaultValue={NUMBER_VALUE} />
            <InputNumber size="small" defaultValue={NUMBER_VALUE} />
            <InputNumber status="error" defaultValue={NUMBER_VALUE} />
            <InputNumber disabled defaultValue={NUMBER_VALUE} />
        </Row>
    </>
);

const Radios = () => (
    <>
        <Row label="group">
            <Radio.Group defaultValue="a">
                <Radio value="a">Option A</Radio>
                <Radio value="b">Option B</Radio>
                <Radio value="c" disabled>
                    Disabled
                </Radio>
            </Radio.Group>
        </Row>

        <Row label="vertical">
            <Radio.Group
                defaultValue="a"
                options={[
                    { value: 'a', label: 'Every hour' },
                    { value: 'b', label: 'Every day' },
                    { value: 'c', label: 'Every week' },
                ]}
                style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
            />
        </Row>

        <Row label="buttons">
            <Radio.Group defaultValue="day">
                <Radio.Button value="day">Day</Radio.Button>
                <Radio.Button value="week">Week</Radio.Button>
                <Radio.Button value="month">Month</Radio.Button>
            </Radio.Group>
            <Radio.Group defaultValue="day" buttonStyle="solid">
                <Radio.Button value="day">Day</Radio.Button>
                <Radio.Button value="week">Week</Radio.Button>
                <Radio.Button value="month">Month</Radio.Button>
            </Radio.Group>
        </Row>

        <Row label="button sizes">
            <Radio.Group size="large" defaultValue="day" buttonStyle="solid">
                <Radio.Button value="day">Large</Radio.Button>
                <Radio.Button value="week">Large</Radio.Button>
            </Radio.Group>
            <Radio.Group size="small" defaultValue="day" buttonStyle="solid">
                <Radio.Button value="day">Small</Radio.Button>
                <Radio.Button value="week">Small</Radio.Button>
            </Radio.Group>
        </Row>
    </>
);

const Selects = () => (
    <>
        <Row label="single">
            <Select style={{ width: FIELD_WIDTH }} defaultValue="north" options={SELECT_OPTIONS} />
            <Select style={{ width: FIELD_WIDTH }} placeholder="Pick a wing" options={SELECT_OPTIONS} allowClear />
            <Select style={{ width: FIELD_WIDTH }} showSearch placeholder="Searchable" options={SELECT_OPTIONS} />
        </Row>

        <Row label="multiple + tags">
            <Select
                mode="multiple"
                style={{ width: WIDE_FIELD_WIDTH }}
                defaultValue={['north', 'south']}
                options={SELECT_OPTIONS}
            />
            <Select
                mode="multiple"
                maxTagCount="responsive"
                style={{ width: WIDE_FIELD_WIDTH }}
                defaultValue={['north', 'south', 'east']}
                options={SELECT_OPTIONS}
            />
            <Select
                mode="tags"
                style={{ width: WIDE_FIELD_WIDTH }}
                placeholder="Free-form tags"
                options={SELECT_OPTIONS}
            />
        </Row>

        <Row label="grouped + prefix">
            <Select style={{ width: WIDE_FIELD_WIDTH }} placeholder="Grouped options" options={GROUPED_OPTIONS} />
            <Select
                style={{ width: WIDE_FIELD_WIDTH }}
                prefix={<SearchOutlined />}
                placeholder="With a prefix"
                options={SELECT_OPTIONS}
            />
        </Row>

        <Row label="sizes">
            <Select size="large" style={{ width: FIELD_WIDTH }} defaultValue="north" options={SELECT_OPTIONS} />
            <Select style={{ width: FIELD_WIDTH }} defaultValue="north" options={SELECT_OPTIONS} />
            <Select size="small" style={{ width: FIELD_WIDTH }} defaultValue="north" options={SELECT_OPTIONS} />
        </Row>

        <Row label="variants + states">
            <Select variant="filled" style={{ width: FIELD_WIDTH }} defaultValue="north" options={SELECT_OPTIONS} />
            <Select variant="borderless" style={{ width: FIELD_WIDTH }} defaultValue="north" options={SELECT_OPTIONS} />
            <Select variant="underlined" style={{ width: FIELD_WIDTH }} defaultValue="north" options={SELECT_OPTIONS} />
            <Select status="error" style={{ width: FIELD_WIDTH }} defaultValue="north" options={SELECT_OPTIONS} />
            <Select loading style={{ width: FIELD_WIDTH }} placeholder="Loading" options={SELECT_OPTIONS} />
            <Select disabled style={{ width: FIELD_WIDTH }} defaultValue="north" options={SELECT_OPTIONS} />
        </Row>
    </>
);

const TreeSelects = () => (
    <>
        <Row label="basic">
            <TreeSelect
                style={{ width: WIDE_FIELD_WIDTH }}
                treeData={TREE_DATA}
                defaultValue="a-lobby"
                treeDefaultExpandAll
            />
            <TreeSelect
                style={{ width: WIDE_FIELD_WIDTH }}
                treeData={TREE_DATA}
                placeholder="Pick a location"
                allowClear
            />
        </Row>

        <Row label="multiple + checkable">
            <TreeSelect
                multiple
                style={{ width: WIDE_FIELD_WIDTH }}
                treeData={TREE_DATA}
                defaultValue={['a-lobby', 'a-floor-1']}
                treeDefaultExpandAll
                maxTagCount="responsive"
            />
            <TreeSelect
                treeCheckable
                showCheckedStrategy={TreeSelect.SHOW_PARENT}
                style={{ width: WIDE_FIELD_WIDTH }}
                treeData={TREE_DATA}
                defaultValue={['building-b']}
                treeDefaultExpandAll
            />
        </Row>

        <Row label="search + states">
            <TreeSelect showSearch style={{ width: WIDE_FIELD_WIDTH }} treeData={TREE_DATA} placeholder="Search" />
            <TreeSelect status="error" style={{ width: FIELD_WIDTH }} treeData={TREE_DATA} placeholder="Error" />
            <TreeSelect disabled style={{ width: FIELD_WIDTH }} treeData={TREE_DATA} placeholder="Disabled" />
        </Row>
    </>
);

const Switches = () => (
    <>
        <Row label="sizes">
            <Switch defaultChecked />
            <Switch />
            <Switch size="small" defaultChecked />
            <Switch size="small" />
        </Row>

        <Row label="with text + loading">
            <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
            <Switch checkedChildren="1" unCheckedChildren="0" />
            <Switch loading defaultChecked />
            <Switch loading size="small" />
        </Row>

        <Row label="disabled">
            <Switch disabled defaultChecked />
            <Switch disabled />
        </Row>
    </>
);

const Forms = () => {
    const [form] = Form.useForm();

    return (
        <>
            <Row label="vertical + rules">
                <Form
                    form={form}
                    layout="vertical"
                    style={{ width: FORM_WIDTH }}
                    requiredMark
                    initialValues={{ wing: 'north', notify: true }}
                    onFinish={() => undefined}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, type: 'email', message: 'Enter a valid email address.' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="name@example.com" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        extra={`At least ${PASSWORD_MIN} characters.`}
                        rules={[{ required: true, min: PASSWORD_MIN, message: `At least ${PASSWORD_MIN} characters.` }]}
                    >
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item name="wing" label="Wing" rules={[{ required: true }]}>
                        <Select options={SELECT_OPTIONS} />
                    </Form.Item>
                    <Form.Item name="notify" label="Notify on alarm" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                            <Button htmlType="button" onClick={() => form.resetFields()}>
                                Reset
                            </Button>
                            <Button type="text" onClick={() => form.validateFields()}>
                                Validate
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Row>

            <Row label="validation states">
                <Form layout="vertical" style={{ width: FORM_WIDTH }}>
                    <Form.Item label="Success" validateStatus="success" hasFeedback help="Looks good.">
                        <Input defaultValue="valid@example.com" />
                    </Form.Item>
                    <Form.Item label="Warning" validateStatus="warning" hasFeedback help="Deprecated soon.">
                        <Input defaultValue="legacy value" />
                    </Form.Item>
                    <Form.Item label="Error" validateStatus="error" hasFeedback help="This field is required." required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Validating" validateStatus="validating" hasFeedback help="Checking…">
                        <Input defaultValue="checking" />
                    </Form.Item>
                </Form>
            </Row>

            <Row label="horizontal">
                <Form
                    layout="horizontal"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ width: FORM_WIDTH }}
                >
                    <Form.Item label="Device name" required>
                        <Input placeholder="Sensor A" />
                    </Form.Item>
                    <Form.Item label="Sample interval">
                        <InputNumber addonAfter="min" defaultValue={15} />
                    </Form.Item>
                    <Form.Item label="Enabled" valuePropName="checked" initialValue>
                        <Switch />
                    </Form.Item>
                </Form>
            </Row>

            <Row label="inline">
                <Form layout="inline">
                    <Form.Item label="Wing">
                        <Select style={{ width: FIELD_WIDTH }} defaultValue="north" options={SELECT_OPTIONS} />
                    </Form.Item>
                    <Form.Item label="From">
                        <DatePicker defaultValue={DATE} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" icon={<SearchOutlined />}>
                            Search
                        </Button>
                    </Form.Item>
                </Form>
            </Row>

            <Row label="dynamic list">
                <Form layout="vertical" style={{ width: FORM_WIDTH }} initialValues={{ contacts: ['ops@example.com'] }}>
                    <Form.List name="contacts">
                        {(fields, { add, remove }) => (
                            <Flex vertical gap={8}>
                                {fields.map((field) => (
                                    <Flex key={field.key} gap={8}>
                                        <Form.Item name={field.name} noStyle>
                                            <Input placeholder="Contact email" />
                                        </Form.Item>
                                        <Button danger onClick={() => remove(field.name)}>
                                            Remove
                                        </Button>
                                    </Flex>
                                ))}
                                <Button type="dashed" onClick={() => add()} block>
                                    Add contact
                                </Button>
                            </Flex>
                        )}
                    </Form.List>
                </Form>
            </Row>
        </>
    );
};

export const DataEntry = () => (
    <Group
        id="group-data-entry"
        title="Data entry"
        summary="Every form control at the raised height scale — 40px at default size. This is where the theme's sizing decisions are most visible, and where the design export pins the most sizes back down."
    >
        <Demo
            id="auto-complete"
            title="AutoComplete"
            note="Renders through Select's styles, so it takes the same control height and popup surface."
        >
            <AutoCompletes />
        </Demo>

        <Demo
            id="cascader"
            title="Cascader"
            note="Also built on Select. Its tags size off multipleItemHeight, which follows the control scale rather than a pin."
        >
            <Cascaders />
        </Demo>

        <Demo
            id="checkbox"
            title="Checkbox"
            note="The square is pinned to 16px where Ant Design would derive controlHeight / 2 — so it stays put while the fields around it grow to 40."
            extra={<Used>row selection in tables and grouped filter lists</Used>}
        >
            <Checkboxes />
        </Demo>

        <Demo
            id="color-picker"
            title="ColorPicker"
            note="Not overridden. The trigger takes the control height, so it lines up with the inputs beside it."
            extra={<Used>showText, in the tenant theme dialog</Used>}
        >
            <ColorPickers />
        </Demo>

        <Demo
            id="date-picker"
            title="DatePicker"
            note="The picker's cell and panel metrics come from the design export; the field itself takes the raised control height. In multiple mode the picked dates render as tags that grow with the field."
            extra={<Used>single date, range and multiple, all three sizes</Used>}
        >
            <DatePickers />
        </Demo>

        <Demo
            id="time-picker"
            title="TimePicker"
            note="Ant Design has no separate TimePicker theme key — it renders through the DatePicker token set, so every pin on the date picker reaches it too."
        >
            <TimePickers />
        </Demo>

        <Demo
            id="input"
            title="Input"
            note="Ant Design gives a text input no height rule at all: its height is paddingBlock × 2 plus the line height. The theme pins the small input's text to 12px — the one input token antd cannot arrive at on its own — so a small field steps down where stock keeps 14px."
            extra={<Used>outlined, with prefix, password and search</Used>}
        >
            <Inputs />
        </Demo>

        <Demo
            id="input-number"
            title="InputNumber"
            note="handleWidth is pinned to 22 against the 30 the raised scale would derive, so the stepper column does not eat a third of a narrow field. Hover a field to reveal the steppers."
        >
            <InputNumbers />
        </Demo>

        <Demo
            id="radio"
            title="Radio"
            note="The checked dot is pinned to 8px against antd's 6 — a taller row needs a heavier checked state."
        >
            <Radios />
        </Demo>

        <Demo
            id="select"
            title="Select"
            note="Not overridden beyond the control scale. The tags in multiple mode size off controlHeight, so they grow with the field rather than staying put."
            extra={<Used>single and multiple, with maxTagCount responsive</Used>}
        >
            <Selects />
        </Demo>

        <Demo
            id="tree-select"
            title="TreeSelect"
            note="Select's trigger with Tree's popup — both follow the control scale."
        >
            <TreeSelects />
        </Demo>

        <Demo
            id="switch"
            title="Switch"
            note="Only the small switch is pinned. Ant Design sizes it as controlHeight / 2, which at 40 would make the small switch as tall as its own default one; the pin holds the whole small set at antd's 32px-control values."
            extra={<Used>the tenant toggle in the toolbar above</Used>}
        >
            <Switches />
        </Demo>

        <Demo
            id="form"
            title="Form"
            note="Field height, label spacing and the focus ring all come from the raised control scale. The focus ring is the loud one: 4px at 0.66 alpha against antd's 3px at 0.1. Status colours are the design export's — a harder error red and a deeper warning amber."
            extra={<Used>vertical layout with rules, inline layout for filter bars</Used>}
        >
            <Forms />
        </Demo>
    </Group>
);
