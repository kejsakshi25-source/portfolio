import { BlurView } from 'expo-blur';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { useScrollY } from '@/src/components/motion/ScrollProvider';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useTheme } from '@/src/theme/ThemeProvider';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const SPRING = { damping: 16, stiffness: 210, mass: 0.7 };

export interface NavItemConfig {
  label: string;
  onPress?: () => void;
  cta?: boolean;
}

/**
 * One pill item. On hover it fills — ink (regular) or mustard (CTA) — and
 * lifts a couple of px, the source site's `.nav a:hover` behaviour.
 */
function NavButton({
  item,
  padH,
  fontSize,
}: {
  item: NavItemConfig;
  padH: number;
  fontSize: number;
}) {
  const t = useTheme();
  const h = useSharedValue(0);

  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      h.value,
      [0, 1],
      item.cta ? [t.colors.brick, t.colors.mustard] : ['rgba(45,26,20,0)', t.colors.ink],
    ),
    transform: [
      { translateY: h.value * -2 },
      { scale: 1 + h.value * (item.cta ? 0.05 : 0) },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      h.value,
      [0, 1],
      item.cta ? [t.colors.cream, t.colors.ink] : [t.colors.ink, t.colors.cream],
    ),
  }));

  return (
    <AnimatedPressable
      onPress={item.onPress}
      accessibilityRole="link"
      onHoverIn={() => {
        h.value = withSpring(1, SPRING);
      }}
      onHoverOut={() => {
        h.value = withSpring(0, SPRING);
      }}
      style={[styles.item, { paddingHorizontal: padH }, bgStyle]}>
      <Animated.Text style={[{ fontFamily: t.fonts.sans.medium, fontSize }, textStyle]}>
        {item.label}
      </Animated.Text>
    </AnimatedPressable>
  );
}

/**
 * Fixed pill navigation. Hides on scroll-down, reappears on scroll-up; the
 * pill is a frosted (blurred) translucent surface.
 * On phones it collapses to the first item + the CTA so it always fits.
 */
export function NavBar({ items }: { items: NavItemConfig[] }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const isMobile = useBreakpoint() === 'mobile';
  const scrollY = useScrollY();
  const translateY = useSharedValue(0);
  const lastY = useSharedValue(0);
  // Browsers restore scroll on refresh — that comes through as a single big
  // jump in scrollY shortly after mount. If we react to it as scroll-down the
  // navbar hides on every refresh. Suppress the hide/show logic for ~600ms
  // after mount and just keep lastY synced, so the first real scroll afterwards
  // isn't seen as a jump.
  const ready = useSharedValue(false);
  useEffect(() => {
    const id = setTimeout(() => {
      ready.value = true;
    }, 600);
    return () => clearTimeout(id);
  }, [ready]);

  useAnimatedReaction(
    () => scrollY.value,
    (y) => {
      if (!ready.value) {
        lastY.value = y;
        return;
      }
      if (y < 80) translateY.value = withTiming(0, { duration: 350 });
      else if (y > lastY.value + 6) translateY.value = withTiming(-180, { duration: 350 });
      else if (y < lastY.value - 6) translateY.value = withTiming(0, { duration: 350 });
      lastY.value = y;
    },
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Phones: keep only the first item + CTA so the pill never overflows.
  const visibleItems = isMobile ? items.filter((it, i) => i === 0 || it.cta) : items;
  const padH = isMobile ? 16 : 22;
  const fontSize = isMobile ? 13 : 14;

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[styles.wrap, { top: insets.top + 12 }, animatedStyle]}>
      <View style={[styles.pill, { borderColor: t.colors.ink }]}>
        <BlurView
          tint="light"
          intensity={40}
          style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(245,234,212,0.62)' }]}
        />
        {visibleItems.map((item) => (
          <NavButton key={item.label} item={item} padH={padH} fontSize={fontSize} />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, alignItems: 'center', zIndex: 50 },
  pill: {
    flexDirection: 'row',
    gap: 6,
    padding: 8,
    borderRadius: 50,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  item: { paddingVertical: 10, borderRadius: 30 },
});
