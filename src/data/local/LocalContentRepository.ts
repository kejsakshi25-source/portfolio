import type { ContentRepository } from '../repository';
import type { CaseStudy, LandingContent, WorkCard } from '../types';
import { caseStudies } from './caseStudies';
import { landing } from './landing';

/**
 * ContentRepository backed by bundled local data. When the backend lands,
 * a SanityContentRepository implementing the same interface replaces this.
 */
export class LocalContentRepository implements ContentRepository {
  async getLanding(): Promise<LandingContent> {
    return landing;
  }

  async getWork(): Promise<WorkCard[]> {
    return [...landing.work.items].sort((a, b) => a.order - b.order);
  }

  async getCaseStudy(slug: string): Promise<CaseStudy | null> {
    return this.getCaseStudySync(slug);
  }

  /* Synchronous reads — the data is bundled, so it needs no await. These let
     routes render real content during the static web export. */

  getLandingSync(): LandingContent {
    return landing;
  }

  getCaseStudySync(slug: string): CaseStudy | null {
    return caseStudies.find((study) => study.slug === slug) ?? null;
  }
}

/** Shared singleton — the default repository injected by ContentProvider. */
export const localContentRepository = new LocalContentRepository();
