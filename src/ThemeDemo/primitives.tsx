import { useState } from 'react';
import type { ReactNode } from 'react';
import { Flex, Tag, Typography, theme } from 'antd';
import { useDemoStyles } from './useDemoStyles';

const { Title, Text, Paragraph } = Typography;

interface SectionProps {
    id: string;
    title: string;
    summary: string;
    children: ReactNode;
}

export const Section = ({ id, title, summary, children }: SectionProps) => {
    const { styles } = useDemoStyles();

    return (
        <section id={id} className={styles.section}>
            <Title level={3}>{title}</Title>
            <Paragraph type="secondary">{summary}</Paragraph>
            <Flex vertical gap={12}>
                {children}
            </Flex>
        </section>
    );
};

interface SwatchProps {
    name: string;
    value: string;
    alpha?: boolean;
}

export const Swatch = ({ name, value, alpha }: SwatchProps) => {
    const { styles, cx } = useDemoStyles();

    return (
        <div className={styles.swatch}>
            <div
                className={cx(styles.chip, alpha && styles.alphaChip)}
                style={alpha ? undefined : { background: value }}
            >
                {alpha ? <div style={{ width: '100%', height: '100%', background: value }} /> : null}
            </div>
            <Flex vertical gap={0}>
                <Text style={{ fontSize: 12 }}>{name}</Text>
                <span className={styles.mono}>{value}</span>
            </Flex>
        </div>
    );
};

type Phase = 'rest' | 'hover' | 'active';

interface PhaseValue {
    token: string;
    value: string;
}

interface StatePreviewProps {
    title: string;
    hint: string;
    apply: 'bg' | 'border' | 'text' | 'solid';
    phases: Record<Phase, PhaseValue>;
}

/* One tile you can hover and press. It paints itself with the token for the current phase and
   names that token underneath, so the mapping from interaction to token is visible, not inferred. */
export const StatePreview = ({ title, hint, apply, phases }: StatePreviewProps) => {
    const { styles } = useDemoStyles();
    const { token } = theme.useToken();
    const [phase, setPhase] = useState<Phase>('rest');
    const current = phases[phase];

    const paint = () => {
        switch (apply) {
            case 'bg':
                return { background: current.value, color: token.colorText, border: `1px solid ${token.colorSplit}` };
            case 'border':
                return {
                    background: token.colorBgContainer,
                    color: token.colorText,
                    border: `${token.lineWidth * 2}px solid ${current.value}`,
                };
            case 'text':
                return {
                    background: token.colorFillQuaternary,
                    color: current.value,
                    border: `1px solid ${token.colorSplit}`,
                };
            default:
                return { background: current.value, color: token.colorWhite, border: '1px solid transparent' };
        }
    };

    return (
        <div>
            <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                {title}
            </Text>
            <button
                type="button"
                className={styles.tile}
                style={{ ...paint(), borderRadius: token.borderRadiusLG }}
                onPointerEnter={() => setPhase('hover')}
                onPointerLeave={() => setPhase('rest')}
                onPointerDown={() => setPhase('active')}
                onPointerUp={() => setPhase('hover')}
                onFocus={() => setPhase('hover')}
                onBlur={() => setPhase('rest')}
            >
                {hint}
            </button>
            {/* One line rather than two: the phase, the token it resolves to and its value together. */}
            <div className={styles.tileReadout} title={`${current.token} = ${current.value}`}>
                <Tag
                    color={phase === 'rest' ? 'default' : 'processing'}
                    style={{ marginInlineEnd: 0, fontSize: token.fontSizeSM }}
                >
                    {phase}
                </Tag>
                <Text type="secondary" ellipsis style={{ fontSize: token.fontSizeSM }}>
                    {current.token}
                </Text>
                <span style={{ color: token.colorTextTertiary }}>{current.value}</span>
            </div>
        </div>
    );
};
