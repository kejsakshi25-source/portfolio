import { type ReactNode, useEffect, useState } from 'react';
import { type LayoutChangeEvent, type StyleProp, View, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface MarqueeProps {
  children: ReactNode;
  /** Scroll speed in px per second. Ignored when `duration` is set. */
  speed?: number;
  /**
   * Fixed time, in ms, for one strip to scroll fully past — the RN
   * equivalent of a CSS marquee keyframe's `animation-duration`. Takes
   * precedence over `speed` so the cycle is width-independent.
   */
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Infinite horizontal marquee. The strip is rendered twice; translateX runs
 * 0 → -stripWidth on a linear loop, so the reset is seamless. Transform-only,
 * so it runs on the UI thread on native.
 */
export function Marquee({ children, speed = 60, duration, style }: MarqueeProps) {
  const [stripWidth, setStripWidth] = useState(0);
  const x = useSharedValue(0);

  useEffect(() => {
    if (stripWidth === 0) return;
    const cycleMs = duration ?? (stripWidth / speed) * 1000;
    x.value = 0;
    x.value = withRepeat(
      withTiming(-stripWidth, {
        duration: cycleMs,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [stripWidth, speed, duration, x]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));

  const onLayout = (e: LayoutChangeEvent) => setStripWidth(e.nativeEvent.layout.width);

  return (
    <View style={[{ overflow: 'hidden' }, style]}>
      <Animated.View style={[{ flexDirection: 'row' }, animatedStyle]}>
        <View style={{ flexDirection: 'row', flexShrink: 0 }} onLayout={onLayout}>
          {children}
        </View>
        {/* duplicate strip for the seamless wrap */}
        <View style={{ flexDirection: 'row', flexShrink: 0 }}>{children}</View>
      </Animated.View>
    </View>
  );
}
