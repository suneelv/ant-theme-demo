import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Card, Tag, Typography } from 'antd';
import { CoverageContext, useCoverage, useCoverageRegistry } from './coverage';
import { OVERRIDE_NOTES } from './themeOverrides';
import { useDemoStyles } from './useDemoStyles';

const { Paragraph } = Typography;

interface CoverageProviderProps {
    children: ReactNode;
}

export const CoverageProvider = ({ children }: CoverageProviderProps) => {
    const { coverage } = useCoverageRegistry();

    return <CoverageContext.Provider value={coverage}>{children}</CoverageContext.Provider>;
};

interface SpecimenProps {
    /* Stable DOM id — the delta table links to it. */
    id: string;
    title: string;
    /* Token names this specimen demonstrates. Drives the coverage marks in the delta table. */
    tokens?: string[];
    /* Short "why" line. Reserve it for decisions the specimen cannot show on its own. */
    note?: string;
    extra?: ReactNode;
    children: ReactNode;
}

export const Specimen = ({ id, title, tokens = [], note, extra, children }: SpecimenProps) => {
    const { styles } = useDemoStyles();
    const { register } = useCoverage();
    const tokenKey = tokens.join('|');

    useEffect(() => {
        register(tokenKey ? tokenKey.split('|') : [], id);
    }, [register, tokenKey, id]);

    /* A component-token note authored in themeOverrides.ts wins over a locally written one, so the
       rationale for an override lives in exactly one place. */
    const inherited = tokens.map((name) => OVERRIDE_NOTES[name]).find(Boolean);
    const body = note ?? inherited;

    return (
        <Card id={id} className={styles.specimen} size="small" title={title} extra={extra} variant="outlined">
            {tokens.length > 0 ? (
                <div className={styles.specimenTokens}>
                    {tokens.map((name) => (
                        <Tag key={name} variant="filled">
                            {name}
                        </Tag>
                    ))}
                </div>
            ) : null}
            {/* Above the specimen, not below it: the note says what changed and what to look for,
                which is only useful before you look. */}
            {body ? <Paragraph type="secondary">{body}</Paragraph> : null}
            {children}
        </Card>
    );
};
