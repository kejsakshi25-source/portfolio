import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { OffsetShadow } from '@/src/components/decor/OffsetShadow';
import { StarStamp } from '@/src/components/decor/StarStamp';
import { RemoteImage } from '@/src/components/media/RemoteImage';
import type { MediaRef } from '@/src/data/types';
import { useTheme } from '@/src/theme/ThemeProvider';

interface PolaroidCardProps {
  image: MediaRef;
  caption: string;
  rotation?: number;
  /** Gently sway in place — the source hero's idle motion. */
  float?: boolean;
  /** Pin a slowly spinning star stamp to the top corner. */
  stamp?: boolean;
}

/** A polaroid-framed photo with a tape strip and caption — the source hero. */
export function PolaroidCard({
  image,
  caption,
  rotation = -4,
  float = false,
  stamp = false,
}: PolaroidCardProps) {
  const t = useTheme();
  const drift = useSharedValue(0);

  useEffect(() => {
    if (!float) return;
    drift.value = withRepeat(
      withTiming(1, { duration: 7000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [float, drift]);

  const animatedStyle = useAnimatedStyle(() => {
    if (!float) return { transform: [{ rotate: `${rotation}deg` }] };
    return {
      transform: [
        { rotate: `${rotation + interpolate(drift.value, [0, 1], [-1.3, 1.3])}deg` },
        { translateY: interpolate(drift.value, [0, 1], [-5, 5]) },
      ],
    };
  });

  return (
    <Animated.View style={[{ maxWidth: 380, width: '100%' }, animatedStyle]}>
      <OffsetShadow dx={10} dy={14} radius={4}>
        <View
          style={{
            backgroundColor: t.colors.cream,
            borderWidth: 2,
            borderColor: t.colors.ink,
            borderRadius: 4,
            padding: 22,
            paddingBottom: 50,
          }}>
          {/* tape strip — source `.tape-strip{top:-18px}` */}
          <View
            style={{
              position: 'absolute',
              top: -18,
              left: '50%',
              marginLeft: -75,
              width: 150,
              height: 30,
              backgroundColor: 'rgba(216,154,62,0.75)',
              borderWidth: 1,
              borderColor: 'rgba(45,26,20,0.4)',
              borderStyle: 'dashed',
              transform: [{ rotate: '-3deg' }],
            }}
          />
          <RemoteImage media={image} style={{ width: '100%', aspectRatio: 4 / 5, marginBottom: 18 }} />
          <Text
            style={{
              fontFamily: t.fonts.serif.italic,
              fontSize: 24,
              color: t.colors.ink,
              textAlign: 'center',
            }}>
            {caption}
          </Text>
        </View>
      </OffsetShadow>

      {stamp && (
        <View style={{ position: 'absolute', top: -20, right: -14, zIndex: 10 }}>
          <StarStamp size={50} />
        </View>
      )}
    </Animated.View>
  );
}
