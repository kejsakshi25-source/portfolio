import type { CaseStudy, LandingContent, WorkCard } from './types';

/**
 * Content access contract. The app depends only on this interface — the
 * concrete source (bundled local data today, a headless CMS / API later)
 * is injected via ContentProvider, so swapping it touches no consumers.
 *
 * All methods are async by design: the local implementation resolves
 * synchronously, but keeping the Promise signature means introducing a
 * network call later is not a breaking change.
 */
export interface ContentRepository {
  /** Full landing-page content. */
  getLanding(): Promise<LandingContent>;
  /** Project summaries for the landing "Work" section, ordered. */
  getWork(): Promise<WorkCard[]>;
  /** A single case study by slug, or null if not found. */
  getCaseStudy(slug: string): Promise<CaseStudy | null>;

  /**
   * Optional synchronous reads. A bundled/local source can answer these
   * during the same render pass, which lets routes ship real content in the
   * static web export (`expo export`) and paint instantly — `useEffect`-based
   * loading never runs during static rendering. A network-backed repository
   * simply omits them and the app falls back to the async path.
   */
  getLandingSync?(): LandingContent;
  getCaseStudySync?(slug: string): CaseStudy | null;
}
