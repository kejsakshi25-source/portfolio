import type { ViewStyle } from 'react-native';

/**
 * Design tokens — ported from the CSS custom properties of the source site.
 * Warm earthy "Soft Internet" palette.
 */
export const colors = {
  sand: '#e8dac6',
  linen: '#efe2cc',
  cream: '#f5ead4',
  ink: '#2d1a14',
  brick: '#c84e3d',
  rust: '#8b2e26',
  mustard: '#d99a3e',
} as const;

export type ColorName = keyof typeof colors;

/** Accent colors used to theme cards / tabs / case studies. */
export type AccentColor = 'brick' | 'mustard' | 'rust' | 'ink';

/** Border radii — the source mixes many values; this is the consolidated scale. */
export const radii = {
  xs: 4,
  sm: 10,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 36,
  pill: 50,
} as const;

/** Spacing scale — section padding in the source is ~60px. */
export const spacing = {
  xs: 6,
  sm: 12,
  md: 24,
  lg: 40,
  xl: 60,
  xxl: 80,
} as const;

/**
 * Hard offset shadow — replaces the source's `box-shadow: 8px 8px 0 ink`.
 * Note: iOS honors `shadowRadius: 0` for a hard edge; Android `elevation`
 * cannot do offset hard shadows, so decorative hard shadows are rendered
 * as a duplicate offset View (see the OffsetShadow component in Phase 3).
 * This helper covers the iOS/web soft-shadow case.
 */
export const offsetShadow = (
  dx = 6,
  dy = 6,
  color: string = colors.ink,
): ViewStyle => ({
  shadowColor: color,
  shadowOffset: { width: dx, height: dy },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 0,
});

/** Soft drop shadow for hover/lifted cards (web + iOS). */
export const softShadow = (opacity = 0.2): ViewStyle => ({
  shadowColor: colors.ink,
  shadowOffset: { width: 0, height: 16 },
  shadowOpacity: opacity,
  shadowRadius: 32,
  elevation: 8,
});
