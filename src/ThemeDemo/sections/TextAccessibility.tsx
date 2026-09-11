import { Alert, Flex, Tag, Typography, theme } from 'antd';
import { Section } from '../primitives';
import { Specimen } from '../Specimen';
import { ContrastTable } from '../ContrastTable';
import { useContrastRows } from '../useContrastRows';
import { AA_LARGE_RATIO, AA_RATIO, AAA_RATIO } from '../contrast';
import { useDemoStyles } from '../useDemoStyles';

const { Text, Paragraph } = Typography;

/* The four-step text scale, and nothing below it. Heading, Label, Description, Disabled,
   Placeholder and Icon all derive from these — antd emits them off the same base, and the theme
   sets none of them — so measuring them would only restate a row that is already here.
   `colorText` is the primary step: antd has no colorTextPrimary. */
const BODY_TOKENS = ['colorText', 'colorTextSecondary', 'colorTextTertiary', 'colorTextQuaternary'];

const LINK_TOKENS = [
    'colorLink',
    'colorLinkHover',
    'colorLinkActive',
    'colorPrimary',
    'colorPrimaryText',
    'colorPrimaryTextHover',
    'colorPrimaryTextActive',
];

const STATUS_TOKENS = [
    'colorSuccess',
    'colorSuccessText',
    'colorSuccessTextHover',
    'colorWarning',
    'colorWarningText',
    'colorWarningTextHover',
    'colorError',
    'colorErrorText',
    'colorErrorTextHover',
    'colorInfo',
    'colorInfoText',
    'colorInfoTextHover',
];

const ALL_TOKENS = [...BODY_TOKENS, ...LINK_TOKENS, ...STATUS_TOKENS];

/* Counts what fails on each surface so the headline number is not something you have to add up by
   reading three tables. The tinted count is the interesting one: colorFillQuaternary sits between
   the text and the white it was measured against when the tones were chosen. */
const ContrastSummary = () => {
    const { token } = theme.useToken();
    const { rows, tinted } = useContrastRows(ALL_TOKENS);

    const failsOnPlain = rows.filter((row) => row.plainRatio < AA_RATIO);
    const failsOnTinted = rows.filter((row) => row.tintedRatio < AA_RATIO);
    /* Tokens the tint alone breaks — passing on the container, failing once the fill goes under. */
    const brokenByTint = failsOnTinted.filter((row) => row.plainRatio >= AA_RATIO);

    const description = (
        <Flex vertical gap={token.marginXXS}>
            <span>
                On <Text code>colorBgContainer</Text> ({token.colorBgContainer}): {failsOnPlain.length} of{' '}
                {rows.length} below AA. On <Text code>colorFillQuaternary</Text> ({tinted}):{' '}
                {failsOnTinted.length} of {rows.length}.
            </span>
            {brokenByTint.length > 0 ? (
                <span>
                    Broken by the tint alone —{' '}
                    {brokenByTint.map((row) => (
                        <Tag key={row.name} color="warning">
                            {row.name}
                        </Tag>
                    ))}
                </span>
            ) : (
                <span>Nothing that passes on the container drops below AA once the quaternary fill goes under it.</span>
            )}
        </Flex>
    );

    return (
        <Alert
            type={failsOnTinted.length > 0 ? 'warning' : 'success'}
            showIcon
            title="Where the two surfaces disagree"
            description={description}
        />
    );
};

export const TextAccessibility = () => {
    const { styles } = useDemoStyles();

    return (
        <Section
            id="accessibility-text"
            title="Text contrast"
            summary="Every text colour in the theme measured against the two surfaces it actually lands on: the plain container, which is white in light mode, and the same container with colorFillQuaternary over it — table headers, hovered rows, filled inputs, the sidebar. Ratios are WCAG 2.1, computed after compositing, since almost every one of these tokens carries alpha and a ratio taken off the raw rgba would read as pure black on white."
        >
            <Paragraph type="secondary">
                <Text strong>AA</Text> is {AA_RATIO} for body text and <Text strong>AA Large</Text> is{' '}
                {AA_LARGE_RATIO} for text at 18.66px bold or 24px and up. <Text strong>AAA</Text> is {AAA_RATIO}. Only
                tokens the theme actually sets are measured — the derived ones (heading, label, description, disabled,
                placeholder, icon) resolve to one of the four steps below and would only repeat its row.
            </Paragraph>

            <ContrastSummary />

            <Specimen
                id="contrast-body"
                title="The text scale"
                tokens={['colorText', 'colorTextSecondary', 'colorTextTertiary', 'colorTextQuaternary']}
                note="Only tertiary and quaternary are set — colorText and colorTextSecondary are antd's own, kept for the comparison the scale is read as. Read the two Contrast columns across: the fill is one low alpha over the container, so it moves a ratio by a few percent. All four steps still clear AA on both surfaces, but quaternary clears it by a hair, so any further lightening of that alpha drops it. The tokens the same few percent actually pushes over are further down the page."
            >
                <div className={styles.compareColumn}>
                    <ContrastTable tokens={BODY_TOKENS} />
                </div>
            </Specimen>

            <Specimen
                id="contrast-link"
                title="Link and primary text"
                tokens={['colorLink', 'colorPrimary', 'colorPrimaryText']}
                note="Our teal, not antd's blue, and it is the one family where the hover and active states move far enough to cross a threshold on their own. A link that passes at rest and fails on hover is still a failure."
            >
                <div className={styles.compareColumn}>
                    <ContrastTable tokens={LINK_TOKENS} />
                </div>
            </Specimen>

            <Specimen
                id="contrast-status"
                title="Status text"
                tokens={['colorSuccess', 'colorWarning', 'colorError', 'colorInfo']}
                note="Status text is the usual problem: the base tone is picked to read as a fill or an icon, then reused as text. Warning is the one to look at — an amber chosen for a dot rarely survives being set at 14px."
            >
                <div className={styles.compareColumn}>
                    <ContrastTable tokens={STATUS_TOKENS} />
                </div>
            </Specimen>
        </Section>
    );
};
