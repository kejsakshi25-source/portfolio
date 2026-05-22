import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Icon } from '@/src/components/decor/Icon';
import type { CaseTab } from '@/src/data/types';
import { useResponsiveValue } from '@/src/hooks/useResponsiveValue';
import { contentMaxWidth } from '@/src/theme/breakpoints';
import { useTheme } from '@/src/theme/ThemeProvider';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const SPRING = { damping: 16, stiffness: 210, mass: 0.7 };

interface TabBarProps {
  tabs: CaseTab[];
  activeId: string;
  onSelect: (id: string) => void;
}

/**
 * One tab button. The active tab sits tilted and filled with its accent;
 * an inactive tab, on hover, lifts and tilts and tints toward that accent —
 * the source site's `.tab-btn:hover` colour-peek behaviour.
 */
function TabButton({
  tab,
  index,
  active,
  onSelect,
}: {
  tab: CaseTab;
  index: number;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  const t = useTheme();
  const h = useSharedValue(0);
  const accentHex = t.colors[tab.accent];
  const activeFg = tab.accent === 'mustard' ? t.colors.ink : t.colors.cream;
  const tilt = index % 2 === 0 ? -1.5 : 1.5;

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: active
      ? accentHex
      : interpolateColor(h.value, [0, 1], [t.colors.cream, `${accentHex}22`]),
    borderColor: active
      ? accentHex
      : interpolateColor(h.value, [0, 1], ['rgba(45,26,20,0.18)', `${accentHex}55`]),
    transform: [
      { translateY: active ? 0 : h.value * -5 },
      { rotate: `${active ? -2 : h.value * tilt}deg` },
    ],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: 1 + (active ? 0 : h.value * 0.15) },
      { rotate: `${active ? 0 : h.value * -5}deg` },
    ],
  }));

  return (
    <AnimatedPressable
      onPress={() => onSelect(tab.id)}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      onHoverIn={() => {
        if (!active) h.value = withSpring(1, SPRING);
      }}
      onHoverOut={() => {
        if (!active) h.value = withSpring(0, SPRING);
      }}
      style={[styles.tab, containerStyle]}>
      <Animated.View style={iconStyle}>
        <Icon name={tab.icon} size={22} color={active ? activeFg : t.colors.ink} />
      </Animated.View>
      <Text
        numberOfLines={1}
        style={{
          fontFamily: t.fonts.mono,
          fontSize: 10,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          color: active ? activeFg : t.colors.ink,
        }}>
        {tab.label}
      </Text>
    </AnimatedPressable>
  );
}

/** Sticky, frosted tab bar for the Xpert case study — per-tab accent + tilt. */
export function TabBar({ tabs, activeId, onSelect }: TabBarProps) {
  const padH = useResponsiveValue({ mobile: 12, tablet: 40, desktop: 60, wide: 60 });

  return (
    <View
      style={{
        paddingVertical: 14,
        paddingHorizontal: padH,
        borderBottomWidth: 1.5,
        borderColor: 'rgba(45,26,20,0.12)',
      }}>
      <BlurView
        tint="light"
        intensity={32}
        style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(232,218,198,0.72)' }]}
      />
      <View
        style={{
          width: '100%',
          maxWidth: contentMaxWidth,
          alignSelf: 'center',
          flexDirection: 'row',
          gap: 8,
        }}>
        {tabs.map((tab, i) => (
          <TabButton
            key={tab.id}
            tab={tab}
            index={i}
            active={tab.id === activeId}
            onSelect={onSelect}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 6,
    borderRadius: 18,
    borderWidth: 2,
  },
});
