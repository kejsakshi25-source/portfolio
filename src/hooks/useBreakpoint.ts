import { useWindowDimensions } from 'react-native';
import { breakpoints, breakpointOrder, type Breakpoint } from '../theme/breakpoints';

/**
 * Returns the active named breakpoint for the current window width.
 * Mobile-first: walks up the scale and keeps the largest one whose
 * min-width the window satisfies.
 */
export function useBreakpoint(): Breakpoint {
  const { width } = useWindowDimensions();
  let active: Breakpoint = 'mobile';
  for (const bp of breakpointOrder) {
    if (width >= breakpoints[bp]) active = bp;
  }
  return active;
}
