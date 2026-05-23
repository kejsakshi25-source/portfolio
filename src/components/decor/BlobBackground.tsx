import { type ReactNode, useEffect } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Blob } from './Blob';
import { useTheme } from '@/src/theme/ThemeProvider';

/** One slowly drifting blob. */
function FloatingBlob({
  children,
  position,
  duration,
  drift,
}: {
  children: ReactNode;
  position: ViewStyle;
  duration: number;
  drift: { x: number; y: number };
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [progress, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: progress.value * drift.x },
      { translateY: progress.value * drift.y },
    ],
  }));

  return (
    <Animated.View style={[{ position: 'absolute' }, position, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

/**
 * Fixed, non-interactive background of three drifting blobs — the RN port of
 * the source's `.blobs` layer. Mounted once in the root layout, behind all
 * screens; sits between the sand background and the (transparent) screens.
 */
export function BlobBackground() {
  const t = useTheme();

  return (
    <Animated.View
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
      shouldRasterizeIOS
      renderToHardwareTextureAndroid>
      <FloatingBlob
        position={{ top: -100, left: -100 }}
        duration={18000}
        drift={{ x: 60, y: -40 }}>
        <Blob color={t.colors.brick} size={520} />
      </FloatingBlob>
      <FloatingBlob
        position={{ top: '30%', right: -100 }}
        duration={22000}
        drift={{ x: -50, y: 60 }}>
        <Blob color={t.colors.mustard} size={420} />
      </FloatingBlob>
      <FloatingBlob
        position={{ bottom: -100, left: '30%' }}
        duration={26000}
        drift={{ x: 40, y: 50 }}>
        <Blob color={t.colors.rust} size={380} />
      </FloatingBlob>
    </Animated.View>
  );
}
