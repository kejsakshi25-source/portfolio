import { type ReactNode } from 'react';
import { Platform, Pressable, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface MagneticPressableProps {
  children: ReactNode;
  onPress?: () => void;
  /** Upward lift on hover (web), px. */
  lift?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const SPRING = { damping: 14, stiffness: 180, mass: 0.6 };

/**
 * Interactive wrapper with platform-aware feedback:
 *  - web: lifts and scales up on hover
 *  - native: scales down on press
 *
 * (True cursor-follow magnetism is deferred to Phase 8 polish; hover-lift is
 * the robust 90% version and needs no pointer-coordinate math.)
 */
export function MagneticPressable({
  children,
  onPress,
  lift = -4,
  style,
  accessibilityLabel,
}: MagneticPressableProps) {
  const hover = useSharedValue(0);
  const press = useSharedValue(0);
  const isNative = Platform.OS !== 'web';

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: hover.value * lift },
      { scale: 1 + hover.value * 0.04 - press.value * 0.04 },
    ],
  }));

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onHoverIn={() => {
        hover.value = withSpring(1, SPRING);
      }}
      onHoverOut={() => {
        hover.value = withSpring(0, SPRING);
      }}
      onPressIn={() => {
        if (isNative) press.value = withSpring(1, SPRING);
      }}
      onPressOut={() => {
        if (isNative) press.value = withSpring(0, SPRING);
      }}>
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
}
