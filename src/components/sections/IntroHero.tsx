import { Text, useWindowDimensions, View } from 'react-native';

import { PolaroidCard } from '@/src/components/cards/PolaroidCard';
import { ScrollReveal } from '@/src/components/motion/ScrollReveal';
import { AccentText } from '@/src/components/text/AccentText';
import type { LandingContent } from '@/src/data/types';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useResponsiveValue } from '@/src/hooks/useResponsiveValue';
import { contentMaxWidth } from '@/src/theme/breakpoints';
import { useTheme } from '@/src/theme/ThemeProvider';

/**
 * Hero — polaroid photo + first-person intro. Mirrors the source's
 * `.intro-hero`: one full viewport tall, centered, with a `.85fr / 1.15fr`
 * split. Name at line-height .9 / letter-spacing -.05em.
 */
export function IntroHero({ data }: { data: LandingContent['intro'] }) {
  const t = useTheme();
  const bp = useBreakpoint();
  const { height } = useWindowDimensions();
  const isRow = bp === 'desktop' || bp === 'wide';
  const nameSize = useResponsiveValue(t.typeScale.heroName);
  const bioSize = useResponsiveValue(t.typeScale.lead);
  const padH = useResponsiveValue({ mobile: 20, tablet: 40, desktop: 60, wide: 60 });

  return (
    <View
      style={{
        minHeight: height,
        paddingHorizontal: padH,
        paddingTop: 120,
        paddingBottom: 40,
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: '100%',
          maxWidth: contentMaxWidth,
          alignSelf: 'center',
          flexDirection: isRow ? 'row' : 'column',
          alignItems: 'center',
          gap: isRow ? 90 : 48,
        }}>
        <ScrollReveal
          index={0}
          style={{ alignItems: 'center', flex: isRow ? 0.85 : undefined, width: isRow ? undefined : '100%' }}>
          {/* No star stamp — the source's intro polaroid has none. */}
          <PolaroidCard image={data.polaroid.image} caption={data.polaroid.caption} float />
        </ScrollReveal>

        <ScrollReveal index={1} style={{ flex: isRow ? 1.15 : undefined, width: isRow ? undefined : '100%' }}>
          <AccentText
            value={data.name}
            style={{
              fontFamily: t.fonts.sans.extrabold,
              fontSize: nameSize,
              lineHeight: nameSize * 0.9,
              letterSpacing: nameSize * -0.05,
            }}
          />
          <AccentText
            value={data.bio}
            style={{
              fontFamily: t.fonts.sans.regular,
              fontSize: bioSize,
              lineHeight: bioSize * 1.5,
              marginTop: 24,
              maxWidth: 560,
            }}
          />
          <Text
            style={{
              fontFamily: t.fonts.mono,
              fontSize: 13,
              letterSpacing: 1.3,
              textTransform: 'uppercase',
              color: t.colors.rust,
              marginTop: 36,
            }}>
            {data.note}
          </Text>
        </ScrollReveal>
      </View>
    </View>
  );
}
