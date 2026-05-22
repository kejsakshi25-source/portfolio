import { useId } from 'react';
import { Platform, View } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

interface BlobProps {
  color: string;
  size: number;
  /** Peak opacity at the center. */
  opacity?: number;
}

/**
 * A soft, blurred glow blob.
 *
 * Web: a solid disc with a real `blur(60px)` filter — a 1:1 port of the
 * source's `.blob{filter:blur(60px);opacity:.45}`.
 *
 * Native: an SVG radial gradient (no cross-platform CSS `blur()` on the old
 * paths), with a near-solid core fading out to mimic the same wash.
 */
export function Blob({ color, size, opacity = 0.45 }: BlobProps) {
  // useId() contains ':' which is invalid inside url(#...) — strip it.
  const gradientId = `blob-${useId().replace(/:/g, '')}`;

  if (Platform.OS === 'web') {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity,
          // Plain CSS string — the array form serializes to `[object Object]`
          // in the static web export, so the blur silently never applies.
          filter: 'blur(60px)',
        }}
      />
    );
  }

  return (
    <Svg width={size} height={size}>
      <Defs>
        <RadialGradient id={gradientId} cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={color} stopOpacity={opacity} />
          <Stop offset="42%" stopColor={color} stopOpacity={opacity} />
          <Stop offset="72%" stopColor={color} stopOpacity={opacity * 0.34} />
          <Stop offset="100%" stopColor={color} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#${gradientId})`} />
    </Svg>
  );
}
