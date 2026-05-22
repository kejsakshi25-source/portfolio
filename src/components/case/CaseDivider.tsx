import { useState } from 'react';
import { type LayoutChangeEvent, View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

import { useResponsiveValue } from '@/src/hooks/useResponsiveValue';

/**
 * A dashed horizontal divider between major case-study blocks — ports the
 * source's `<hr class="divider">` (`margin:0 60px; border-top:1px dashed`).
 * Drawn as a measured SVG line so the dash length is identical everywhere.
 */
export function CaseDivider({ topGap = 0 }: { topGap?: number }) {
  const padH = useResponsiveValue({ mobile: 20, tablet: 40, desktop: 60, wide: 60 });
  const [width, setWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  return (
    <View style={{ marginHorizontal: padH, marginTop: topGap, height: 1 }} onLayout={onLayout}>
      {width > 0 && (
        <Svg width={width} height={1}>
          <Line
            x1={0}
            y1={0.5}
            x2={width}
            y2={0.5}
            stroke="rgba(45,26,20,0.2)"
            strokeWidth={1}
            strokeDasharray="6,4"
          />
        </Svg>
      )}
    </View>
  );
}
