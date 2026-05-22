import { type ReactNode, useState } from 'react';
import { type LayoutChangeEvent, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import { useTheme } from '@/src/theme/ThemeProvider';

interface DashedBorderProps {
  children: ReactNode;
  color?: string;
  strokeWidth?: number;
  radius?: number;
  /** Dash length / gap length. */
  dash?: number;
  gap?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A dashed border drawn as an SVG rect overlay. RN's `borderStyle: 'dashed'`
 * has uncontrollable dash length and renders differently per platform — this
 * measures the container and draws a pixel-accurate, consistent dashed rect.
 */
export function DashedBorder({
  children,
  color,
  strokeWidth = 1.5,
  radius = 0,
  dash = 6,
  gap = 4,
  style,
}: DashedBorderProps) {
  const t = useTheme();
  const [size, setSize] = useState({ w: 0, h: 0 });

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ w: width, h: height });
  };

  return (
    <View style={style} onLayout={onLayout}>
      {size.w > 0 && (
        <Svg style={StyleSheet.absoluteFill} width={size.w} height={size.h}>
          <Rect
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            width={size.w - strokeWidth}
            height={size.h - strokeWidth}
            rx={radius}
            fill="none"
            stroke={color ?? t.colors.ink}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash},${gap}`}
          />
        </Svg>
      )}
      {children}
    </View>
  );
}
