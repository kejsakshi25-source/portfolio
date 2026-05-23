import React from 'react';
import { View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import type { ServiceCard as ServiceCardData } from '@/src/data/types';
import { useTheme } from '@/src/theme/ThemeProvider';

const SPRING = { damping: 16, stiffness: 210, mass: 0.7 };

/**
 * One service in the "What I actually do" grid. Ports the source's `.do`
 * card: cream at rest; on hover the background flips by column —
 * col 1 → mustard, col 2 → ink, col 3 → brick — with a directional
 * lift/tilt, and the text inverts to cream on the two dark columns.
 */
export const ServiceCard = React.memo(function ServiceCard({ data, index }: { data: ServiceCardData; index: number }) {
  const t = useTheme();
  const col = index % 3;
  const h = useSharedValue(0);

  const hoverBg = [t.colors.mustard, t.colors.ink, t.colors.brick][col];
  const invert = col !== 0; // ink + brick columns flip text to cream
  const shiftX = [-4, 0, 4][col];
  const shiftY = col === 1 ? -10 : -8;
  const tilt = [-1, 0, 1][col];

  const cardStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(h.value, [0, 1], [t.colors.cream, hoverBg]),
    transform: [
      { translateX: h.value * shiftX },
      { translateY: h.value * shiftY },
      { rotate: `${h.value * tilt}deg` },
    ],
  }));
  const eyebrowStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      h.value,
      [0, 1],
      [t.colors.rust, invert ? t.colors.mustard : t.colors.rust],
    ),
  }));
  const titleStyle = useAnimatedStyle(() => ({
    color: interpolateColor(h.value, [0, 1], [t.colors.ink, invert ? t.colors.cream : t.colors.ink]),
  }));
  const bodyStyle = useAnimatedStyle(() => ({
    color: interpolateColor(h.value, [0, 1], [t.colors.ink, invert ? t.colors.cream : t.colors.ink]),
  }));

  return (
    <Animated.View
      onPointerEnter={() => {
        h.value = withSpring(1, SPRING);
      }}
      onPointerLeave={() => {
        h.value = withSpring(0, SPRING);
      }}
      style={[
        {
          borderWidth: 2,
          borderColor: t.colors.ink,
          borderRadius: t.radii.lg,
          paddingVertical: 24,
          paddingHorizontal: 26,
        },
        cardStyle,
      ]}>
      <Animated.Text
        style={[
          {
            fontFamily: t.fonts.mono,
            fontSize: 11,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
            marginBottom: 16,
          },
          eyebrowStyle,
        ]}>
        {data.category}
      </Animated.Text>
      <Animated.Text
        style={[
          {
            fontFamily: t.fonts.sans.bold,
            fontSize: 24,
            letterSpacing: -0.5,
            lineHeight: 25,
            marginBottom: 10,
          },
          titleStyle,
        ]}>
        {data.title}
      </Animated.Text>
      <Animated.Text
        style={[{ fontFamily: t.fonts.sans.regular, fontSize: 14, lineHeight: 21 }, bodyStyle]}>
        {data.body}
      </Animated.Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
        {data.tools.map((tool) => (
          <View
            key={tool}
            style={{
              borderWidth: 1,
              borderColor: t.colors.ink,
              borderRadius: 20,
              paddingVertical: 4,
              paddingHorizontal: 10,
            }}>
            <Animated.Text style={[{ fontFamily: t.fonts.mono, fontSize: 10 }, bodyStyle]}>
              {tool}
            </Animated.Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
});
