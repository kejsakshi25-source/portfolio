import { Text, View } from 'react-native';

import { Icon } from '@/src/components/decor/Icon';
import { ResponsiveGrid } from '@/src/components/layout/ResponsiveGrid';
import { Section } from '@/src/components/layout/Section';
import { ScrollReveal } from '@/src/components/motion/ScrollReveal';
import { AccentText } from '@/src/components/text/AccentText';
import type { BrandBox as BrandBoxData, TakeawaySection } from '@/src/data/types';
import { useResponsiveValue } from '@/src/hooks/useResponsiveValue';
import { useTheme } from '@/src/theme/ThemeProvider';

/** A sector tile in the brand strip — ports `.brand-box`. */
function BrandBox({ box }: { box: BrandBoxData }) {
  const t = useTheme();
  return (
    <View
      style={{
        borderRadius: 14,
        backgroundColor: box.color,
        paddingVertical: 16,
        paddingHorizontal: 14,
      }}>
      <View style={{ opacity: 0.9, marginBottom: 10 }}>
        <Icon name={box.icon} size={22} color={t.colors.cream} />
      </View>
      <Text
        style={{
          fontFamily: t.fonts.mono,
          fontSize: 9,
          letterSpacing: 0.9,
          textTransform: 'uppercase',
          color: t.colors.cream,
          opacity: 0.6,
          marginBottom: 6,
        }}>
        {box.sector}
      </Text>
      <Text
        style={{
          fontFamily: t.fonts.sans.extrabold,
          fontSize: 14,
          letterSpacing: -0.3,
          lineHeight: 16,
          color: t.colors.cream,
        }}>
        {box.name}
      </Text>
    </View>
  );
}

/**
 * "The takeaway" — ports `.takeaway-card`: a dark ink card holding a serif
 * quote (line-height 1.3) and the per-sector brand/platform strip.
 */
export function TakeawayBlock({ data }: { data: TakeawaySection }) {
  const t = useTheme();
  const quoteSize = useResponsiveValue(t.typeScale.takeawayQuote);
  const boxes = data.strip.boxes;

  return (
    <Section num={data.label} heading={data.heading} headingScale="caseHeading">
      <ScrollReveal>
        <View
          style={{
            backgroundColor: t.colors.ink,
            borderRadius: t.radii.xl,
            paddingTop: 52,
            paddingHorizontal: 64,
            paddingBottom: 48,
            gap: 36,
          }}>
          <AccentText
            value={data.quote}
            tone="dark"
            baseColor={t.colors.cream}
            style={{
              fontFamily: t.fonts.serif.italic,
              fontSize: quoteSize,
              lineHeight: quoteSize * 1.3,
              letterSpacing: quoteSize * -0.015,
            }}
          />
          <View>
            <Text
              style={{
                fontFamily: t.fonts.sans.bold,
                fontSize: 15,
                letterSpacing: -0.15,
                color: t.colors.cream,
                marginBottom: 16,
              }}>
              {data.strip.heading}
            </Text>
            <ResponsiveGrid
              columns={{ mobile: 2, tablet: 4, desktop: boxes.length }}
              gap={10}>
              {boxes.map((box) => (
                <BrandBox key={box.id} box={box} />
              ))}
            </ResponsiveGrid>
          </View>
        </View>
      </ScrollReveal>
    </Section>
  );
}
