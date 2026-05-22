import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '@/src/theme/tokens';

/**
 * A slowly spinning star stamp — ports the source hero's `@keyframes spin`
 * rotating ★ badge. Decorative; pin it to a corner with absolute positioning.
 */
export function StarStamp({ size = 46 }: { size?: number }) {
  const spin = useSharedValue(0);

  useEffect(() => {
    spin.value = withRepeat(withTiming(1, { duration: 8000, easing: Easing.linear }), -1, false);
  }, [spin]);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value * 360}deg` }],
  }));

  return (
    <Animated.View style={style}>
      <Svg width={size} height={size} viewBox="0 0 48 48">
        <Circle cx={24} cy={24} r={22} fill={colors.cream} stroke={colors.ink} strokeWidth={2.5} />
        <Path
          d="M24 12 L26.94 19.95 L35.41 20.29 L28.76 25.55 L31.05 33.71 L24 29 L16.95 33.71 L19.24 25.55 L12.59 20.29 L21.06 19.95 Z"
          fill={colors.brick}
        />
      </Svg>
    </Animated.View>
  );
}
