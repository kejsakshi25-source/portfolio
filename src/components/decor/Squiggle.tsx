import Svg, { Path } from 'react-native-svg';

import { colors } from '@/src/theme/tokens';

interface SquiggleProps {
  color?: string;
  width?: number;
  height?: number;
}

/**
 * The hand-drawn underline squiggle — ports the inline SVG used after
 * `.squig` accents in the source hero.
 */
export function Squiggle({ color = colors.rust, width = 60, height = 18 }: SquiggleProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 60 18">
      <Path
        d="M2 9 Q 10 1 18 9 T 34 9 T 50 9 T 66 9"
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
}
