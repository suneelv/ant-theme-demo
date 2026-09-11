import { FastColor } from '@ant-design/fast-color';

/* WCAG 2.1 thresholds for text against its background. Large is >= 18.66px bold or >= 24px. */
export const AA_LARGE_RATIO = 3;
export const AA_RATIO = 4.5;
export const AAA_RATIO = 7;

/* The offset in the WCAG contrast formula, which keeps the ratio finite for pure black. */
const LUMINANCE_OFFSET = 0.05;

export type ContrastGrade = 'AAA' | 'AA' | 'AA Large' | 'Fail';

/* Most of our text tokens are alpha colours — colorTextTertiary is rgba(0, 0, 0, 0.56), not a hex.
   getLuminance ignores alpha, so a ratio taken straight off the token would be black on white.
   Everything here composites first, and every background handed in must already be opaque. */
export const compositeOn = (color: string, background: string) =>
    new FastColor(color).onBackground(background).toHexString();

export const contrastRatio = (foreground: string, background: string) => {
    const foregroundLuminance = new FastColor(foreground).onBackground(background).getLuminance();
    const backgroundLuminance = new FastColor(background).getLuminance();
    const lighter = Math.max(foregroundLuminance, backgroundLuminance);
    const darker = Math.min(foregroundLuminance, backgroundLuminance);

    return (lighter + LUMINANCE_OFFSET) / (darker + LUMINANCE_OFFSET);
};

export const gradeContrast = (ratio: number): ContrastGrade => {
    if (ratio >= AAA_RATIO) return 'AAA';
    if (ratio >= AA_RATIO) return 'AA';
    if (ratio >= AA_LARGE_RATIO) return 'AA Large';

    return 'Fail';
};
