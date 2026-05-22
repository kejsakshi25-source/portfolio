import { Text, View } from 'react-native';

import { InvolvementCard } from '@/src/components/cards/InvolvementCard';
import { ResponsiveGrid } from '@/src/components/layout/ResponsiveGrid';
import { ScrollReveal } from '@/src/components/motion/ScrollReveal';
import { AccentText } from '@/src/components/text/AccentText';
import type { LandingContent } from '@/src/data/types';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useResponsiveValue } from '@/src/hooks/useResponsiveValue';
import { contentMaxWidth } from '@/src/theme/breakpoints';
import { useTheme } from '@/src/theme/ThemeProvider';

/**
 * "The rooms I chose to be in" — dark block of pinned involvement cards.
 *
 * Ports `.notes`, whose `margin:0 -60px` cancels the section padding so the
 * ink block bleeds edge-to-edge. On desktop/wide we full-bleed it the same
 * way; on phones/tablets it keeps a side gutter so it doesn't touch the edge.
 */
export function Involvement({ data }: { data: LandingContent['involvement'] }) {
  const t = useTheme();
  const bp = useBreakpoint();
  const isDesktop = bp === 'desktop' || bp === 'wide';
  const headingSize = useResponsiveValue(t.typeScale.heading);
  const outerPad = useResponsiveValue({ mobile: 20, tablet: 40, desktop: 0, wide: 0 });
  const innerPad = useResponsiveValue({ mobile: 24, tablet: 36, desktop: 60, wide: 60 });

  return (
    <View style={{ paddingVertical: t.spacing.xl, paddingHorizontal: outerPad }}>
      <View
        style={{
          backgroundColor: t.colors.ink,
          borderRadius: t.radii.xxl,
          paddingHorizontal: innerPad,
          paddingVertical: isDesktop ? 60 : innerPad,
        }}>
        <View style={{ width: '100%', maxWidth: contentMaxWidth, alignSelf: 'center' }}>
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: t.colors.cream,
              borderRadius: t.radii.pill,
              paddingVertical: 4,
              paddingHorizontal: 14,
              marginBottom: 14,
            }}>
            <Text style={{ fontFamily: t.fonts.mono, fontSize: 11, letterSpacing: 1, color: t.colors.ink }}>
              {data.num}
            </Text>
          </View>

          <AccentText
            value={data.heading}
            tone="dark"
            baseColor={t.colors.cream}
            style={{
              fontFamily: t.fonts.sans.extrabold,
              fontSize: headingSize,
              lineHeight: headingSize * 0.98,
              letterSpacing: -1.5,
            }}
          />

          <ResponsiveGrid columns={{ mobile: 1, tablet: 3, desktop: 3 }} gap={18} style={{ marginTop: 32 }}>
            {data.items.map((item, i) => (
              <ScrollReveal key={item.id} index={i}>
                <InvolvementCard data={item} index={i} />
              </ScrollReveal>
            ))}
          </ResponsiveGrid>
        </View>
      </View>
    </View>
  );
}
