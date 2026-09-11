import { Button, Flex, Input, Tag, Typography, theme } from 'antd';
import { Compare } from './Compare';
import { useMeasuredSize } from './useMeasuredSize';
import { useDemoStyles } from './useDemoStyles';

const { Text } = Typography;

type ControlSize = 'small' | 'middle' | 'large';

/* Sub-pixel rounding means an aligned pair can still differ by a fraction. */
const ALIGNED_WITHIN_PX = 0.6;
const INPUT_WIDTH = 168;
const GAP = 8;
const FIELD_WIDTH = 200;

const SIZES: { size: ControlSize; label: string }[] = [
    { size: 'small', label: 'small' },
    { size: 'middle', label: 'default' },
    { size: 'large', label: 'large' },
];

interface PairProps {
    size: ControlSize;
    label: string;
    /* The height the control is supposed to reach, read from the theme it renders under. */
    target: number;
}

/* One input beside one button at the same size. The button honours controlHeight directly, so it
   is the reference: when the two edges do not line up, the input's padding is the reason. */
const Pair = ({ size, label, target }: PairProps) => {
    const { styles, cx } = useDemoStyles();
    const { measure: measureInput, size: inputSize } = useMeasuredSize();
    const { measure: measureButton, size: buttonSize } = useMeasuredSize();
    const inputHeight = inputSize?.height ?? null;
    const buttonHeight = buttonSize?.height ?? null;
    const matches = inputHeight !== null && Math.abs(inputHeight - target) < ALIGNED_WITHIN_PX;
    const shortfall = inputHeight === null ? '?' : Math.round(target - inputHeight);

    return (
        <div className={styles.metricRow}>
            <Text type="secondary" className={styles.metricLabel}>
                {label}
            </Text>
            <Flex gap={GAP} align="center">
                <span ref={measureInput} className={styles.metricProbe}>
                    <Input size={size} placeholder="Sample text" style={{ width: INPUT_WIDTH }} />
                </span>
                <span ref={measureButton} className={styles.metricProbe}>
                    <Button size={size}>Button</Button>
                </span>
            </Flex>
            <Text className={cx(styles.mono, matches ? undefined : styles.metricBad)}>
                input {inputHeight ?? '—'} · button {buttonHeight ?? '—'} · target {target}
            </Text>
            <Tag color={matches ? 'success' : 'error'} variant="filled">
                {matches ? 'aligned' : `short by ${shortfall}px`}
            </Tag>
        </div>
    );
};

/* Reads its targets from the theme it renders under, so each column judges itself against its own
   control scale rather than against the page's. */
const Pairs = () => {
    const { token } = theme.useToken();

    const targets: Record<ControlSize, number> = {
        small: token.controlHeightSM,
        middle: token.controlHeight,
        large: token.controlHeightLG,
    };

    return (
        <>
            {SIZES.map(({ size, label }) => (
                <Pair key={size} size={size} label={label} target={targets[size]} />
            ))}
        </>
    );
};

export const InputHeightComparison = () => (
    <Compare
        ours="paddingBlock left to antd, derived from our 40px control"
        stock="paddingBlock derived from its own 32px control"
    >
        <Pairs />
    </Compare>
);

const Fields = () => (
    <>
        <Input size="small" defaultValue="Small input text" style={{ width: FIELD_WIDTH }} />
        <Input defaultValue="Default input text" style={{ width: FIELD_WIDTH }} />
    </>
);

/* inputFontSizeSM is the one input token in the export that Ant Design cannot derive: its own
   default is fontSize (14) at every size, and the export asks for fontSizeSM (12). */
export const InputFontSizeComparison = () => (
    <Compare ours="inputFontSizeSM 12" stock="inputFontSizeSM 14">
        <Fields />
    </Compare>
);
