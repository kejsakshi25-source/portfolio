import { type StyleProp, Text, View, type ViewStyle } from 'react-native';

import { useTheme } from '@/src/theme/ThemeProvider';

export type TapeVariant = 'mustard' | 'brick' | 'pill';

interface TapeLabelProps {
  label: string;
  variant?: TapeVariant;
  /** Override the default per-variant rotation (degrees). */
  rotation?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A rotated, bordered "tape" label — ports the source's `.tape` sticker.
 * `pill` is the un-rotated rounded variant.
 */
export function TapeLabel({ label, variant = 'mustard', rotation, style }: TapeLabelProps) {
  const t = useTheme();

  const config = {
    mustard: { bg: t.colors.mustard, fg: t.colors.ink, rot: -2, radius: 0 },
    brick: { bg: t.colors.brick, fg: t.colors.cream, rot: 1.5, radius: 0 },
    pill: { bg: t.colors.cream, fg: t.colors.ink, rot: 0, radius: t.radii.pill },
  }[variant];

  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          backgroundColor: config.bg,
          borderWidth: 1.5,
          borderColor: t.colors.ink,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: config.radius,
          transform: [{ rotate: `${rotation ?? config.rot}deg` }],
        },
        style,
      ]}>
      <Text style={{ fontFamily: t.fonts.sans.semibold, fontSize: 13, color: config.fg }}>
        {label}
      </Text>
    </View>
  );
}
