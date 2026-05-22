/**
 * Responsive breakpoints (min-width, px).
 * The source site was locked to 1440px; the RN port is mobile-first and
 * scales up to the wide editorial layout.
 */
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Ascending order — used to resolve the active breakpoint and responsive values. */
export const breakpointOrder: Breakpoint[] = ['mobile', 'tablet', 'desktop', 'wide'];

/**
 * Max content width on large screens. The source site ran at 1440px with
 * 60px page padding on each side → a 1320px content column; matching that
 * keeps cards/sections the right width at desktop/wide.
 */
export const contentMaxWidth = 1320;
