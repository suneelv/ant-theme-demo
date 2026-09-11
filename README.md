# Ant Theme Demo

A static showcase for a custom [Ant Design 6](https://ant.design) theme, built with Vite and React 19.

Every specimen on the page is a comparison: the custom theme on the left, stock Ant Design (in the same colour
mode) on the right. Cards for sizes the design export pins add a third column showing what the raised control scale
would have derived without the pin.

## Running

```bash
npm install
npm run dev      # http://localhost:9000
npm run build    # type-check + production build into dist/
npm run preview  # serve dist/ on port 9000
```

## Theme controls

The sticky toolbar at the top of the page drives the whole theme:

- **Light / Dark / System**: the colour mode. System follows the OS preference live.
- **Use tenant theme**: builds the theme from a `ColorSchema` instead of the brand teal.
- **Configure**: edits the `ColorSchema` (primary, fonts, backgrounds).

Settings are kept in React context (`src/theme/ThemeSettingsProvider.tsx`) and remembered in `localStorage`.

## Layout

| Path | What it is |
|---|---|
| `src/theme/theme.ts` | The theme itself. `buildAppTheme(colors, colorMode)` returns the antd `ThemeConfig`. |
| `src/theme/theme.types.ts` | `ColorMode`, `ResolvedColorMode` and `ColorSchema`. |
| `src/theme/AppThemeProvider.tsx` | Applies the built theme through antd's `ConfigProvider`. |
| `src/ThemeDemo/` | The demo page: comparison primitives, the "what changed" delta table and one file per section. |
| `design-tokens/` | The raw light/dark design-token export the theme was built from, kept for reference. |
