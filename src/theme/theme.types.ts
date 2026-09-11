export enum ColorMode {
    Light = 'light',
    Dark = 'dark',
    System = 'system',
}

export const isColorMode = (value: unknown): value is ColorMode =>
    typeof value === 'string' && Object.values<string>(ColorMode).includes(value);

export type ResolvedColorMode = ColorMode.Light | ColorMode.Dark;

export type ColorSchema = {
    primary: string;
    primaryFont: string;
    primaryBackground: string;
    secondaryFont: string;
    secondaryBackground: string;
};
