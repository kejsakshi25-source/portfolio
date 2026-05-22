import { breakpointOrder, type Breakpoint } from '../theme/breakpoints';
import { useBreakpoint } from './useBreakpoint';

/** A value that may vary by breakpoint. Either a plain value or a per-breakpoint map. */
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

function isBreakpointMap<T>(value: ResponsiveValue<T>): value is Partial<Record<Breakpoint, T>> {
  return (
    typeof value === 'object' &&
    value !== null &&
    breakpointOrder.some((bp) => bp in (value as object))
  );
}

/**
 * Resolves a responsive value for the current breakpoint.
 * Mobile-first fallback: if the active breakpoint has no entry, walks down
 * to the nearest smaller one that does.
 *
 *   useResponsiveValue(3)                          // → 3 always
 *   useResponsiveValue({ mobile: 1, desktop: 3 })  // → 1, 1, 3, 3
 */
export function useResponsiveValue<T>(value: ResponsiveValue<T>): T {
  const active = useBreakpoint();

  if (!isBreakpointMap(value)) {
    return value;
  }

  const map = value;
  const activeIndex = breakpointOrder.indexOf(active);
  for (let i = activeIndex; i >= 0; i--) {
    const candidate = map[breakpointOrder[i]];
    if (candidate !== undefined) return candidate;
  }
  // Nothing at or below the active breakpoint — fall forward to the first defined.
  for (const bp of breakpointOrder) {
    const candidate = map[bp];
    if (candidate !== undefined) return candidate;
  }
  throw new Error('useResponsiveValue: empty responsive map');
}
