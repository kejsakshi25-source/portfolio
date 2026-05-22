import { type ReactNode } from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import { useTheme } from '@/src/theme/ThemeProvider';

interface OffsetShadowProps {
  children: ReactNode;
  /** Shadow offset in px. */
  dx?: number;
  dy?: number;
  color?: string;
  /** Match the child's border radius so the shadow lines up. */
  radius?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Hard offset shadow — the source's `box-shadow: 8px 8px 0 ink`.
 * Implemented as a duplicate solid rectangle behind the child rather than a
 * native shadow, because Android `elevation` cannot do offset hard shadows.
 * The child must be opaque so it covers all but the offset sliver.
 */
export function OffsetShadow({
  children,
  dx = 6,
  dy = 6,
  color,
  radius = 0,
  style,
}: OffsetShadowProps) {
  const t = useTheme();

  return (
    <View style={style}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: color ?? t.colors.ink,
            borderRadius: radius,
            transform: [{ translateX: dx }, { translateY: dy }],
          },
        ]}
      />
      {children}
    </View>
  );
}
