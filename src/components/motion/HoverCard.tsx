import { createContext, useContext, type ReactNode } from 'react';
import { Platform, Pressable, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';

import { colors } from '@/src/theme/tokens';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Smooth spring with a hint of overshoot — the RN counterpart of the source
 * site's `cubic-bezier(.34,1.6,.64,1)` "spring" easing used on every hover.
 */
const SPRING = { damping: 16, stiffness: 210, mass: 0.7 };

const HoverContext = createContext<SharedValue<number> | null>(null);

/** Hover progress (0→1) of the nearest HoverCard, or null outside one. */
export function useHoverProgress() {
  return useContext(HoverContext);
}

interface HoverCardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  /** Upward lift on hover, px. */
  lift?: number;
  /** Resting tilt that the card sits at, deg. */
  baseRotate?: number;
  /** Rotation added on hover, deg — pass the negative of `baseRotate` to straighten. */
  rotate?: number;
  /** Peak scale on hover. */
  scaleTo?: number;
  /** Border radius used to shape the hover drop-shadow. */
  radius?: number;
  /** Fade a soft drop shadow in on hover. */
  shadow?: boolean;
  accessibilityLabel?: string;
}

/**
 * Wraps a card with the source site's hover signature: a springy lift, a
 * slight tilt, a gentle scale-up, and a soft drop shadow that fades in.
 * On touch platforms (no hover) it gives a subtle press-in instead.
 * Exposes its hover progress via context so children (e.g. icons) can react.
 */
export function HoverCard({
  children,
  style,
  onPress,
  lift = -8,
  baseRotate = 0,
  rotate = 0,
  scaleTo = 1.02,
  radius = 0,
  shadow = true,
  accessibilityLabel,
}: HoverCardProps) {
  const hover = useSharedValue(0);
  const press = useSharedValue(0);
  const isNative = Platform.OS !== 'web';

  const animatedStyle = useAnimatedStyle(() => {
    const h = hover.value;
    return {
      transform: [
        { translateY: h * lift },
        { rotate: `${baseRotate + h * rotate}deg` },
        { scale: 1 + h * (scaleTo - 1) - press.value * 0.03 },
      ],
      shadowColor: colors.ink,
      shadowOffset: { width: 0, height: 4 + h * 14 },
      shadowOpacity: shadow ? h * 0.22 : 0,
      shadowRadius: h * 30,
      elevation: shadow ? h * 10 : 0,
    };
  });

  return (
    <HoverContext.Provider value={hover}>
      <AnimatedPressable
        onPress={onPress}
        accessible={onPress ? undefined : false}
        accessibilityRole={onPress ? 'button' : undefined}
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
        }}
        style={[{ borderRadius: radius }, style, animatedStyle]}>
        {children}
      </AnimatedPressable>
    </HoverContext.Provider>
  );
}
