import type { Breakpoint } from './breakpoints';

/**
 * Font family strings — these match the keys passed to `useFonts` in the
 * root layout (the export names from the @expo-google-fonts packages).
 *
 * - sans   → Bricolage Grotesque (headings, body, UI)
 * - serif  → Instrument Serif    (italic accents)
 * - display→ Anton               (oversized stat numbers)
 * - mono   → PT Mono             (eyebrows, labels)
 * - quote  → Lora italic         (pull quotes)
 */
export const fonts = {
  sans: {
    regular: 'BricolageGrotesque_400Regular',
    medium: 'BricolageGrotesque_500Medium',
    semibold: 'BricolageGrotesque_600SemiBold',
    bold: 'BricolageGrotesque_700Bold',
    extrabold: 'BricolageGrotesque_800ExtraBold',
  },
  serif: {
    regular: 'InstrumentSerif_400Regular',
    italic: 'InstrumentSerif_400Regular_Italic',
  },
  display: 'Anton_400Regular',
  mono: 'PTMono_400Regular',
  quote: 'Lora_400Regular_Italic',
} as const;

/**
 * Responsive type scale (font sizes per breakpoint) — replaces the CSS
 * `clamp()` values; the `wide` column matches the source's 1440px design.
 * Resolve with `useResponsiveValue(typeScale.<name>)`.
 */
export const typeScale: Record<string, Record<Breakpoint, number>> = {
  /** Landing section headings (`.sh h2`, 84px) */
  heading: { mobile: 40, tablet: 56, desktop: 72, wide: 84 },
  /** Case-study section headings (`.sec-heading`, 56px) */
  caseHeading: { mobile: 30, tablet: 44, desktop: 52, wide: 56 },
  /** Hero / case-study title (`.hero h1`, `.case-title`) */
  hero: { mobile: 52, tablet: 84, desktop: 110, wide: 128 },
  /** Intro-hero name (`.mock-name`, 151px) */
  heroName: { mobile: 58, tablet: 96, desktop: 130, wide: 150 },
  /** Cover-scale display (`.cover-name`) */
  display: { mobile: 64, tablet: 110, desktop: 160, wide: 196 },
  /** Project card title (`.proj h3`, 76px) */
  projectTitle: { mobile: 42, tablet: 56, desktop: 68, wide: 76 },
  /** Role-card title (`.role-title`, 60px) */
  roleTitle: { mobile: 34, tablet: 48, desktop: 56, wide: 60 },
  /** Takeaway quote (`.takeaway-quote`, 40px) */
  takeawayQuote: { mobile: 26, tablet: 32, desktop: 36, wide: 40 },
  /** Big stat numbers (`.stat`, Anton) */
  stat: { mobile: 56, tablet: 80, desktop: 96, wide: 108 },
  /** Sub-headings */
  subheading: { mobile: 24, tablet: 30, desktop: 36, wide: 40 },
  /** Lead paragraph (`.intro-p`, 25px) */
  lead: { mobile: 19, tablet: 22, desktop: 25, wide: 25 },
  /** Body copy */
  body: { mobile: 15, tablet: 15, desktop: 16, wide: 16 },
  /** Small / caption */
  small: { mobile: 12, tablet: 13, desktop: 13, wide: 13 },
  /** Mono eyebrow / label */
  mono: { mobile: 10, tablet: 11, desktop: 11, wide: 11 },
};

export type TypeScaleName = keyof typeof typeScale;
