import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { navMemory } from '@/src/data/navMemory';
import { useTheme } from '@/src/theme/ThemeProvider';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const SPRING = { damping: 16, stiffness: 210, mass: 0.7 };

/** Fixed "← Portfolio" button on case-study screens — frosted, fills ink on hover. */
export function BackNav() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const h = useSharedValue(0);

  const goBack = () => {
    // Land back on the Work section the case study was opened from.
    navMemory.returnSection = 'work';
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  const liftStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: h.value * -2 }],
  }));
  const fillStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(h.value, [0, 1], ['rgba(245,234,212,0)', t.colors.ink]),
  }));
  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(h.value, [0, 1], [t.colors.ink, t.colors.cream]),
  }));

  return (
    <View
      style={{ position: 'absolute', top: insets.top + 12, left: 20, zIndex: 50 }}
      pointerEvents="box-none">
      <AnimatedPressable
        onPress={goBack}
        accessibilityRole="button"
        accessibilityLabel="Back to portfolio"
        onHoverIn={() => {
          h.value = withSpring(1, SPRING);
        }}
        onHoverOut={() => {
          h.value = withSpring(0, SPRING);
        }}
        style={[styles.btn, { borderColor: t.colors.ink }, liftStyle]}>
        <BlurView
          tint="light"
          intensity={40}
          style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(245,234,212,0.55)' }]}
        />
        <Animated.View style={[StyleSheet.absoluteFill, fillStyle]} />
        <Animated.Text
          style={[
            { fontFamily: t.fonts.sans.bold, fontSize: 14 },
            textStyle,
          ]}>
          ←
        </Animated.Text>
        <Animated.Text
          style={[
            { fontFamily: t.fonts.mono, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' },
            textStyle,
          ]}>
          Portfolio
        </Animated.Text>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
});
