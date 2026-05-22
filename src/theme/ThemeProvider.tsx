import { createContext, useContext, type ReactNode } from 'react';

import { colors, offsetShadow, radii, softShadow, spacing } from './tokens';
import { fonts, typeScale } from './typography';

/**
 * The app theme. Single light theme (the portfolio has no dark mode).
 * Exposed through Context so a future themed/CMS-driven variant can be
 * swapped in without touching consumers.
 */
export const theme = {
  colors,
  radii,
  spacing,
  fonts,
  typeScale,
  offsetShadow,
  softShadow,
} as const;

export type Theme = typeof theme;

const ThemeContext = createContext<Theme>(theme);

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

/** Access design tokens, fonts, and the responsive type scale. */
export function useTheme(): Theme {
  return useContext(ThemeContext);
}
