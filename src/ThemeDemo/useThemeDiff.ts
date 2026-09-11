import { useMemo } from 'react';
import { theme } from 'antd';
import { COMPONENT_OVERRIDES } from './themeOverrides';
import { useStockToken } from './useStockToken';

const { useToken } = theme;

export interface ThemeDelta {
    /* Token name — `colorPrimary` for a global, `Table.headerBg` for a component token. */
    name: string;
    ours: string;
    antd: string;
    isColor: boolean;
}

export interface DeltaGroup {
    id: string;
    title: string;
    hint: string;
    deltas: ThemeDelta[];
}

export interface UseThemeDiff {
    groups: DeltaGroup[];
    total: number;
    /* Every changed token name, for the coverage check in the delta table. */
    names: string[];
}

const FOCUS_TOKENS = new Set(['lineWidthFocus', 'controlOutline', 'colorErrorOutline', 'colorWarningOutline']);

type GroupId = 'focus' | 'colour' | 'sizing' | 'typography' | 'other';

const GROUP_META: Record<GroupId, { title: string; hint: string }> = {
    focus: { title: 'Focus', hint: 'The focus ring — a wider band in a brand tint.' },
    colour: { title: 'Colour', hint: 'The teal ramp, the status ramps and the muted text tones.' },
    sizing: { title: 'Sizing', hint: 'Control heights and everything antd derives from them.' },
    typography: { title: 'Typography', hint: 'Font families. Sizes and weights are left to antd.' },
    other: { title: 'Other', hint: 'Changed tokens that fit none of the groups above.' },
};

const GROUP_ORDER: GroupId[] = ['colour', 'sizing', 'typography', 'focus', 'other'];

const classify = (name: string): GroupId => {
    if (FOCUS_TOKENS.has(name)) return 'focus';
    if (name.startsWith('color')) return 'colour';
    if (name.startsWith('font') || name.startsWith('lineHeight')) return 'typography';
    if (/^(control|size|padding|margin|borderRadius|lineWidth|height|width)/.test(name)) return 'sizing';

    return 'other';
};

const isColorValue = (value: string) => value.startsWith('#') || value.startsWith('rgb');

/* Diffs the live theme against stock Ant Design in the SAME colour mode, so the only variable
   between the two columns is the theme itself. Nothing here imports src/theme — the applied token
   comes from the live ConfigProvider, which is what the page is meant to be documenting anyway. */
export const useThemeDiff = (): UseThemeDiff => {
    const { token } = useToken();
    const { stock } = useStockToken();

    return useMemo(() => {
        const live = token as unknown as Record<string, unknown>;

        const buckets = new Map<GroupId, ThemeDelta[]>();

        for (const name of Object.keys(stock)) {
            const ours = String(live[name]);
            const antd = String(stock[name]);

            if (ours === antd) continue;

            const delta: ThemeDelta = { name, ours, antd, isColor: isColorValue(ours) && isColorValue(antd) };
            const group = classify(name);

            buckets.set(group, [...(buckets.get(group) ?? []), delta]);
        }

        const groups: DeltaGroup[] = GROUP_ORDER.filter((id) => buckets.get(id)?.length).map((id) => ({
            id,
            title: GROUP_META[id].title,
            hint: GROUP_META[id].hint,
            deltas: buckets.get(id) ?? [],
        }));

        /* Component tokens live in a hand-maintained module: they sit in the ConfigProvider config,
           which useToken() cannot see, so there is nothing to diff them against at runtime. */
        const componentDeltas: ThemeDelta[] = COMPONENT_OVERRIDES.map((entry) => ({
            name: `${entry.component}.${entry.token}`,
            ours: entry.ours,
            antd: entry.antd,
            isColor: isColorValue(entry.ours) && isColorValue(entry.antd),
        }));

        const allGroups: DeltaGroup[] = [
            ...groups,
            {
                id: 'components',
                title: 'Component tokens',
                hint: 'Per-component overrides. Hand-maintained — useToken() cannot introspect these.',
                deltas: componentDeltas,
            },
        ];

        const total = allGroups.reduce((sum, group) => sum + group.deltas.length, 0);
        const names = allGroups.flatMap((group) => group.deltas.map((delta) => delta.name));

        return { groups: allGroups, total, names };
    }, [token, stock]);
};
