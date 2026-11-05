import { createTheme } from "@mui/material/styles";

/* ---------- Palette ----------
   Light is your original palette, unchanged. Dark swaps it around:
   your ink becomes the page, your page becomes the text, and the
   indigo accent is lifted so it stays readable on a dark ground.
   `onAccent` is the text color that sits on top of the accent. */

export const tokens = {
  light: {
    bg: "#F6F7F9",
    surface: "#FFFFFF",
    ink: "#0E1116",
    muted: "#5B6472",
    line: "#DDE1E7",
    accent: "#4F46E5",
    accentDark: "#3F38C7",
    accentSoft: "#EEF0FF",
    accentTint: "#DCE0FF",
    onAccent: "#FFFFFF",
    shadow: "rgba(14, 17, 22, 0.06)",
  },
  dark: {
    bg: "#0E1116",
    surface: "#151A22",
    ink: "#F6F7F9",
    muted: "#A0A9B8",
    line: "#2A313C",
    accent: "#9490F7",
    accentDark: "#B3B0FA",
    accentSoft: "#1A1D33",
    accentTint: "#272B4D",
    onAccent: "#0E1116",
    shadow: "rgba(0, 0, 0, 0.4)",
  },
};

/* Components import `colors` as before, but each value is now a CSS
   variable. A theme switch only changes the variables, so nothing has
   to re-render and no component needs to know which mode is active. */
export const colors = Object.fromEntries(
  Object.keys(tokens.light).map((key) => [key, `var(--c-${key})`])
);

const toVariables = (palette) =>
  Object.fromEntries(
    Object.entries(palette).map(([key, value]) => [`--c-${key}`, value])
  );

export const globalStyles = {
  ":root": { ...toVariables(tokens.light), colorScheme: "light" },
  ':root[data-theme="dark"]': { ...toVariables(tokens.dark), colorScheme: "dark" },
};

/* ---------- Type ----------
   Newsreader (a serif drawn for reading on screens) carries the text.
   Hanken Grotesk, already in your project, handles small interface
   text such as the nav, labels and buttons. */

export const serifFont =
  '"Newsreader", "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif';
export const sansFont =
  '"Hanken Grotesk", "Helvetica Neue", Arial, sans-serif';

// Kept so existing imports keep working
export const displayFont = serifFont;
export const bodyFont = serifFont;

const heading = (extra) => ({
  fontFamily: serifFont,
  fontWeight: 400,
  letterSpacing: "-0.02em",
  ...extra,
});

export const getTheme = (mode) => {
  const t = tokens[mode];

  return createTheme({
    palette: {
      mode,
      primary: { main: t.accent, dark: t.accentDark, contrastText: t.onAccent },
      text: { primary: t.ink, secondary: t.muted },
      background: { default: t.bg, paper: t.surface },
      divider: t.line,
    },

    shape: { borderRadius: 6 },

    typography: {
      fontFamily: serifFont,
      body1: { fontSize: "1.125rem", lineHeight: 1.65 },
      body2: { fontSize: "1rem", lineHeight: 1.6 },
      subtitle1: {
        fontSize: "clamp(1.2rem, 2.4vw, 1.45rem)",
        lineHeight: 1.5,
        fontStyle: "italic",
      },
      button: {
        fontFamily: sansFont,
        textTransform: "none",
        fontWeight: 600,
      },

      h1: heading({
        fontSize: "clamp(2.75rem, 7vw, 4.75rem)",
        lineHeight: 1.04,
        letterSpacing: "-0.03em",
      }),
      h2: heading({ fontSize: "clamp(1.9rem, 4vw, 2.5rem)", lineHeight: 1.12 }),
      h3: heading({ fontSize: "1.55rem", lineHeight: 1.2, fontWeight: 500 }),
      h4: heading({ fontSize: "1.25rem", lineHeight: 1.25, fontWeight: 500 }),
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: "smooth" },
          body: {
            backgroundColor: "var(--c-bg)",
            color: "var(--c-ink)",
            fontFeatureSettings: '"kern", "liga"',
            fontVariantNumeric: "oldstyle-nums",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            textRendering: "optimizeLegibility",
            transition: "background-color 0.25s ease, color 0.25s ease",
          },
          "p, li": { textWrap: "pretty" },
          "h1, h2, h3, h4": { textWrap: "balance" },
          "::selection": {
            backgroundColor: "var(--c-accent)",
            color: "var(--c-onAccent)",
          },
          ":focus-visible": {
            outline: "2px solid var(--c-accent)",
            outlineOffset: "3px",
          },
          "@media (prefers-reduced-motion: reduce)": {
            html: { scrollBehavior: "auto" },
            "*, *::before, *::after": {
              transition: "none !important",
              animation: "none !important",
            },
          },
        },
      },
    },
  });
};