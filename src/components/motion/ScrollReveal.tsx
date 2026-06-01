import { type ReactNode, useEffect } from 'react';
import { Dimensions, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  measure,
  runOnUI,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { useScrollY } from './ScrollProvider';

const WINDOW_HEIGHT = Dimensions.get('window').height;

interface ScrollRevealProps {
  children: ReactNode;
  /** Stagger index — each step adds ~65ms of delay. */
  index?: number;
  /** Travel distance of the upward slide-in, px. */
  distance?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Reveals its children (slide up + fade + slight scale) when scrolled into
 * view — the RN replacement for GSAP ScrollTrigger. Triggered by measuring
 * the element's on-screen position on every scroll frame (UI thread).
 *
 * A safety timeout guarantees content becomes visible even if measurement
 * never reports it in-viewport, so nothing can get stuck invisible.
 */
export function ScrollReveal({ children, index = 0, distance = 44, style }: ScrollRevealProps) {
  const scrollY = useScrollY();
  const ref = useAnimatedRef<Animated.View>();
  const progress = useSharedValue(0);
  const revealed = useSharedValue(0);
  // Tracks whether the FIRST reveal call has happened yet. If the element is
  // already in viewport on first measure (initial paint / page refresh), we
  // snap to visible with no animation — matching the source's IntersectionObserver
  // which only animates elements that *enter* the viewport, not ones already there.
  const firstMeasure = useSharedValue(true);

  const reveal = () => {
    'worklet';
    if (revealed.value === 1) return;
    if (progress.value > 0) return;
    const m = measure(ref);
    if (m === null) return;
    const inView = m.pageY < WINDOW_HEIGHT * 0.92;
    if (firstMeasure.value) {
      firstMeasure.value = false;
      if (inView) {
        revealed.value = 1;
        progress.value = 1;
      }
      return;
    }
    if (inView) {
      revealed.value = 1;
      progress.value = withDelay(
        index * 65,
        withSpring(1, { damping: 15, stiffness: 120, mass: 0.85 }),
      );
    }
  };

  // Re-check whenever the shared scroll offset changes.
  useAnimatedReaction(
    () => scrollY.value,
    () => reveal(),
  );

  // Safety net — never leave content invisible.
  useEffect(() => {
    const id = setTimeout(() => {
      if (progress.value === 0) progress.value = withTiming(1, { duration: 400 });
    }, 2500);
    return () => clearTimeout(id);
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { translateY: (1 - progress.value) * distance },
      { scale: 0.97 + progress.value * 0.03 },
    ],
  }));

  return (
    <Animated.View ref={ref} onLayout={() => runOnUI(reveal)()} style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}
