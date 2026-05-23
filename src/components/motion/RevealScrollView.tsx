import { forwardRef, type ReactNode } from 'react';
import { type ScrollView, type ScrollViewProps } from 'react-native';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';

import { useScrollY } from './ScrollProvider';

/**
 * Drop-in ScrollView that publishes its scroll offset to the ScrollProvider
 * context. Place inside <ScrollProvider> so ScrollReveal / NavBar can react.
 * Forwards a ref to the underlying ScrollView (for `scrollTo` — nav anchors).
 */
export const RevealScrollView = forwardRef<
  ScrollView,
  ScrollViewProps & { children: ReactNode }
>(function RevealScrollView({ children, ...props }, ref) {
  const scrollY = useScrollY();

  const handler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <Animated.ScrollView
      ref={ref as never}
      {...props}
      onScroll={handler}
      scrollEventThrottle={32}>
      {children}
    </Animated.ScrollView>
  );
});
