import { Text, View } from 'react-native';

import { Section } from '@/src/components/layout/Section';
import { ResponsiveGrid } from '@/src/components/layout/ResponsiveGrid';
import { RemoteImage } from '@/src/components/media/RemoteImage';
import { ScrollReveal } from '@/src/components/motion/ScrollReveal';
import { AccentText } from '@/src/components/text/AccentText';
import type { LandingContent } from '@/src/data/types';
import { useResponsiveValue } from '@/src/hooks/useResponsiveValue';
import { useTheme } from '@/src/theme/ThemeProvider';

/** "Turned my passion for cooking into a brand" — the Riwayat passion project. */
export function Passion({ data }: { data: LandingContent['passion'] }) {
  const t = useTheme();
  const headingSize = useResponsiveValue(t.typeScale.heading);

  return (
    <Section>
      <ScrollReveal>
        <View
          style={{
            backgroundColor: t.colors.cream,
            borderWidth: 1.5,
            borderColor: 'rgba(45,26,20,0.12)',
            borderRadius: t.radii.xl,
            padding: useResponsiveValue({ mobile: 24, tablet: 32, desktop: 40, wide: 40 }),
          }}>
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: t.colors.ink,
              borderRadius: t.radii.pill,
              paddingVertical: 4,
              paddingHorizontal: 14,
              marginBottom: 14,
            }}>
            <Text style={{ fontFamily: t.fonts.mono, fontSize: 11, letterSpacing: 1, color: t.colors.cream }}>
              {data.num}
            </Text>
          </View>

          <AccentText
            value={data.heading}
            style={{
              fontFamily: t.fonts.sans.extrabold,
              fontSize: headingSize,
              lineHeight: headingSize * 0.98,
              letterSpacing: -1.5,
            }}
          />

          <Text
            style={{
              fontFamily: t.fonts.sans.regular,
              fontSize: 18,
              lineHeight: 30,
              color: t.colors.ink,
              marginTop: 20,
              marginBottom: 20,
              maxWidth: 700,
            }}>
            {data.description}
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {data.tags.map((tag) => (
              <View
                key={tag}
                style={{
                  borderWidth: 1.5,
                  borderColor: 'rgba(45,26,20,0.4)',
                  borderRadius: 20,
                  paddingVertical: 6,
                  paddingHorizontal: 14,
                }}>
                <Text
                  style={{
                    fontFamily: t.fonts.mono,
                    fontSize: 11,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    color: t.colors.ink,
                  }}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>

          <ResponsiveGrid columns={{ mobile: 2, tablet: 4, desktop: 4 }} gap={12}>
            {data.images.map((image, i) => (
              <RemoteImage
                key={i}
                media={image}
                style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: 14 }}
              />
            ))}
          </ResponsiveGrid>
        </View>
      </ScrollReveal>
    </Section>
  );
}
