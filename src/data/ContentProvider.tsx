import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { localContentRepository } from './local/LocalContentRepository';
import type { ContentRepository } from './repository';
import type { CaseStudy, LandingContent } from './types';

interface ContentContextValue {
  repository: ContentRepository;
  landing: LandingContent | null;
}

const ContentContext = createContext<ContentContextValue | null>(null);

/**
 * Provides the ContentRepository to the tree and eagerly loads the landing
 * content. A different repository (e.g. a CMS-backed one) can be injected
 * via the `repository` prop without changing any consumer.
 */
export function ContentProvider({
  children,
  repository = localContentRepository,
}: {
  children: ReactNode;
  repository?: ContentRepository;
}) {
  // Seed synchronously when the repository supports it (the local source
  // does) — so the landing content is present on the very first render,
  // including the static web export where effects never run.
  const [landing, setLanding] = useState<LandingContent | null>(
    () => repository.getLandingSync?.() ?? null,
  );

  useEffect(() => {
    if (repository.getLandingSync) {
      setLanding(repository.getLandingSync());
      return;
    }
    let active = true;
    repository.getLanding().then((data) => {
      if (active) setLanding(data);
    });
    return () => {
      active = false;
    };
  }, [repository]);

  return (
    <ContentContext.Provider value={{ repository, landing }}>{children}</ContentContext.Provider>
  );
}

function useContentContext(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error('useLanding / useCaseStudy must be used within <ContentProvider>');
  }
  return ctx;
}

/** Landing content — `null` until the first async load resolves. */
export function useLanding(): LandingContent | null {
  return useContentContext().landing;
}

/** Loads a single case study by slug, with loading state. */
export function useCaseStudy(slug: string): { data: CaseStudy | null; loading: boolean } {
  const { repository } = useContentContext();
  // Seed synchronously for the local source so case-study routes render real
  // content on first paint and in the static web export.
  const [state, setState] = useState<{ data: CaseStudy | null; loading: boolean }>(() =>
    repository.getCaseStudySync
      ? { data: repository.getCaseStudySync(slug), loading: false }
      : { data: null, loading: true },
  );

  useEffect(() => {
    if (repository.getCaseStudySync) {
      setState({ data: repository.getCaseStudySync(slug), loading: false });
      return;
    }
    let active = true;
    setState({ data: null, loading: true });
    repository.getCaseStudy(slug).then((data) => {
      if (active) setState({ data, loading: false });
    });
    return () => {
      active = false;
    };
  }, [repository, slug]);

  return state;
}

/** Direct repository access, for screens that need `getWork()` etc. */
export function useRepository(): ContentRepository {
  return useContentContext().repository;
}
