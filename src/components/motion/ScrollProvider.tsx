import { createContext, useContext, type ReactNode } from 'react';
import { type SharedValue, useSharedValue } from 'react-native-reanimated';

/**
 * Shares one scroll offset (a Reanimated SharedValue) across a screen, so
 * RevealScrollView, ScrollReveal, and NavBar can all react to the same
 * scroll position on the UI thread.
 */
const ScrollContext = createContext<SharedValue<number> | null>(null);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const scrollY = useSharedValue(0);
  return <ScrollContext.Provider value={scrollY}>{children}</ScrollContext.Provider>;
}

/** The shared scroll offset. Returns a standalone value if there's no provider. */
export function useScrollY(): SharedValue<number> {
  const ctx = useContext(ScrollContext);
  // Always created to keep hook order stable; only used as a fallback.
  const fallback = useSharedValue(0);
  return ctx ?? fallback;
}
