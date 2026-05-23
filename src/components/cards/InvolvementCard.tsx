import React from 'react';
import { Text, View } from 'react-native';

import { RemoteImage } from '@/src/components/media/RemoteImage';
import { HoverCard } from '@/src/components/motion/HoverCard';
import type { InvolvementCard as InvolvementCardData } from '@/src/data/types';
import { useTheme } from '@/src/theme/ThemeProvider';

/** A pinned "note" card in the Involvement section. */
export const InvolvementCard = React.memo(function InvolvementCard({ data, index }: { data: InvolvementCardData; index: number }) {
  const t = useTheme();

  // Source: 1st cream, 2nd mustard, 3rd brick; alternating tilt.
  const palette = [
    { bg: t.colors.cream, fg: t.colors.ink },
    { bg: t.colors.mustard, fg: t.colors.ink },
    { bg: t.colors.brick, fg: t.colors.cream },
  ][index % 3];
  const rotation = index % 2 === 0 ? -1.5 : 1.5;

  return (
    // Rests at `rotation`; on hover it straightens to 0 and lifts.
    <HoverCard
      radius={t.radii.md}
      lift={-10}
      baseRotate={rotation}
      rotate={-rotation}
      scaleTo={1.02}
      style={{
        backgroundColor: palette.bg,
        borderRadius: t.radii.md,
        padding: 18,
        paddingTop: 22,
      }}>
      {/* pin */}
      <View
        style={{
          position: 'absolute',
          top: -10,
          left: '50%',
          marginLeft: -11,
          width: 22,
          height: 22,
          borderRadius: 11,
          backgroundColor: t.colors.rust,
          borderWidth: 2,
          borderColor: t.colors.cream,
        }}
      />
      <Text
        style={{
          fontFamily: t.fonts.sans.bold,
          fontSize: 20,
          letterSpacing: -0.4,
          color: palette.fg,
          marginBottom: 6,
        }}>
        {data.title}
      </Text>
      <Text style={{ fontFamily: t.fonts.sans.regular, fontSize: 13, lineHeight: 19, color: palette.fg }}>
        {data.body}
      </Text>
      <RemoteImage media={data.image} style={{ width: '100%', aspectRatio: 1, borderRadius: 10, marginTop: 14 }} />
    </HoverCard>
  );
});
