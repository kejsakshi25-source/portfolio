/**
 * Content schema — the single source of truth for the portfolio's data,
 * and the contract a future headless CMS (Sanity) must satisfy.
 *
 * Components never read these files directly; they go through the
 * ContentRepository (see repository.ts) so the local data source can be
 * swapped for an API with no consumer changes.
 */

/* ───────────────────────── primitives ───────────────────────── */

/** A responsive WebP variant pair for an image — used on web only. */
export interface ImageVariant {
  src: number; // require()'d webp module id
  w: number; // intrinsic width
}

/** Loading priority hint forwarded to expo-image. `high` also disables
 *  IntersectionObserver lazy-mounting (use for above-the-fold media). */
export type MediaPriority = 'high' | 'normal' | 'low';

/** An asset reference. `local` is bundled, `remote` is a URL (post-backend),
 *  `placeholder` is a deliberate empty slot ("Drop screenshot" in the source). */
export type MediaRef =
  | {
      kind: 'local';
      module: number;
      alt?: string;
      /** Optional WebP variants for responsive web delivery. Native ignores these. */
      variants?: ImageVariant[];
      /** Intrinsic dimensions if known — helps the browser reserve space. */
      width?: number;
      height?: number;
      /** Loading priority. `'high'` skips lazy-mount; defaults to `'normal'`. */
      priority?: MediaPriority;
    }
  | {
      kind: 'remote';
      url: string;
      alt?: string;
      variants?: ImageVariant[];
      width?: number;
      height?: number;
      priority?: MediaPriority;
    }
  | { kind: 'placeholder'; label: string };

/** Inline emphasis styles, ported from the source's decorative spans. */
export type AccentStyle =
  | 'serif' // Instrument Serif italic, brick — the `<em>` accent
  | 'pop' // brick pill background
  | 'blob' // mustard organic-blob background
  | 'squig' // rust, serif italic, hand-drawn squiggle
  | 'lora' // Lora italic
  | 'highlight' // mustard highlight box (body emphasis)
  | 'highlightAlt'; // brick highlight box

export interface TextSegment {
  text: string;
  style?: AccentStyle;
}

/** A run of text that may carry inline accents. A plain string = no accents. */
export type RichText = string | TextSegment[];

/** Accent color used to theme cards, tabs, and case studies. */
export type AccentColor = 'brick' | 'mustard' | 'rust' | 'ink';

/** Background variant for project / work cards. */
export type CardVariant = 'cream' | 'dark' | 'mustard' | 'brick';

/** Icon identifier — resolved to an SVG by the Icon component (Phase 3). */
export type IconKey = string;

/* ───────────────────────── shared ───────────────────────── */

export type ContactKind = 'mail' | 'phone' | 'whatsapp' | 'linkedin';

export interface ContactLink {
  id: string;
  kind: ContactKind;
  platform: string; // "Email"
  value: string; // display value
  href: string;
}

export interface ContactInfo {
  badge: string; // "Currently available"
  heading: RichText; // "Let's talk?"
  sub: string;
  label: string; // "Reach me at"
  links: ContactLink[];
}

/* ───────────────────────── landing ───────────────────────── */

export interface QuickFact {
  label: string;
  value: string;
}

export interface ServiceCard {
  id: string;
  category: string; // "Social"
  title: string;
  body: string;
  tools: string[];
  order: number;
}

export interface InvolvementCard {
  id: string;
  title: string;
  body: string;
  image: MediaRef;
  order: number;
}

/** A project on the landing "Work" section; links to a full CaseStudy by slug. */
export interface WorkCard {
  slug: string;
  tag: string; // "Full-time · Jun 2024 →"
  title: RichText; // "Xpert."
  role: string;
  description: string;
  image: MediaRef;
  stat?: { value: string; label: string };
  variant: CardVariant;
  reversed?: boolean; // image on the right
  order: number;
}

export interface LandingContent {
  intro: {
    polaroid: { image: MediaRef; caption: string };
    name: RichText; // "Sakshi Kejriwal."
    bio: RichText;
    note: string; // "welcome to the portfolio ↓"
  };
  manifesto: { headline: RichText };
  marquee: string[];
  about: {
    num: string; // "01 · About"
    heading: RichText;
    paragraphs: RichText[];
    pullQuote: string;
    card: { tag: string; title: string; facts: QuickFact[] };
  };
  services: { num: string; heading: RichText; items: ServiceCard[] };
  work: { num: string; heading: RichText; items: WorkCard[] };
  passion: {
    num: string;
    heading: RichText;
    description: string;
    tags: string[];
    images: MediaRef[];
  };
  involvement: { num: string; heading: RichText; items: InvolvementCard[] };
  contact: ContactInfo;
}

/* ───────────────────────── case studies ───────────────────────── */

export interface RoleCard {
  label: string; // "My role"
  title: string; // "Social Media Marketing"
  sub: string; // "Visual storytelling & brand voice"
  bullets: string[];
}

export interface SkillCard {
  id: string;
  name: string;
  tag: string;
  icon: IconKey;
}

export interface PostItem {
  id: string;
  type: 'carousel' | 'image' | 'video';
  caption: string;
  cover: MediaRef; // grid thumbnail
  slides?: MediaRef[]; // carousel pages
  video?: MediaRef; // video file
}

export interface BrandBox {
  id: string;
  icon: IconKey;
  sector: string;
  name: string;
  /** Tile background — ported from the source's per-sector brand-box palette. */
  color: string;
}

/** Section blocks for the `sections` case-study layout. */
export interface SkillsSection {
  kind: 'skills';
  label: string; // "02 · Skills"
  heading: RichText;
  items: SkillCard[];
}
export interface PostsSection {
  kind: 'posts';
  label: string;
  heading: RichText;
  hint?: string;
  items: PostItem[];
}
export interface TakeawaySection {
  kind: 'takeaway';
  label: string;
  heading: RichText;
  quote: RichText;
  strip: { heading: string; boxes: BrandBox[] };
}
export type CaseSection = SkillsSection | PostsSection | TakeawaySection;

/** Cards inside the xpert tabbed layout — generic enough to cover every tab. */
export interface CaseCard {
  id: string;
  kind: 'linkedin' | 'sample' | 'blog' | 'case-study' | 'creative' | 'ai';
  category?: string; // ai category / sample type / writing type
  title?: string;
  body?: string;
  meta?: string; // stat value, e.g. "—K", "+238%"
  metaLabel?: string; // "Impressions"
  site?: string; // "xpert.chat"
  tags?: string[];
  icon?: IconKey;
  media?: MediaRef;
  href?: string;
  placeholder?: boolean; // a deliberate empty slot in the source
  status?: 'live' | 'wip';
}

export interface ProcessStep {
  num: string;
  name: string;
  description: string;
}

export interface ProcessBlock {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
  tools: string[];
}

export interface CaseTab {
  id: string;
  label: string;
  icon: IconKey;
  accent: AccentColor;
  description: string;
  process?: ProcessBlock; // email tab only
  items: CaseCard[];
}

interface CaseStudyMeta {
  slug: string;
  eyebrow: string; // "Full-time · Jun 2024 →"
  title: RichText; // "Xpert."
  caseDesc: string; // hero paragraph
  accent: AccentColor;
}

export interface TabbedCaseStudy extends CaseStudyMeta {
  layout: 'tabbed';
  role: string; // "Digital Marketing Strategist"
  /** Optional "Skills & Tools" block shown above the work tabs. */
  skillsIntro?: {
    label: string;
    heading: RichText;
    items: SkillCard[];
    tools: string[];
  };
  workIntro: { label: string; heading: RichText; subline: string };
  tabs: CaseTab[];
}

export interface SectionsCaseStudy extends CaseStudyMeta {
  layout: 'sections';
  roleCard: RoleCard;
  sections: CaseSection[];
}

export type CaseStudy = TabbedCaseStudy | SectionsCaseStudy;
