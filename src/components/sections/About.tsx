import { Text, View } from 'react-native';

import { Section } from '@/src/components/layout/Section';
import { ScrollReveal } from '@/src/components/motion/ScrollReveal';
import { AccentText } from '@/src/components/text/AccentText';
import type { LandingContent } from '@/src/data/types';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useTheme } from '@/src/theme/ThemeProvider';

/** "So, who am I, really" — bio paragraphs, pull quote, and a quick-facts card. */
export function About({ data }: { data: LandingContent['about'] }) {
  const t = useTheme();
  const bp = useBreakpoint();
  const isRow = bp === 'desktop' || bp === 'wide';

  return (
    <Section num={data.num} heading={data.heading}>
      <View style={{ flexDirection: isRow ? 'row' : 'column', gap: 60 }}>
        {/* paragraphs + pull quote */}
        <ScrollReveal index={0} style={{ flex: isRow ? 1.2 : undefined }}>
          {data.paragraphs.map((para, i) => (
            <AccentText
              key={i}
              value={para}
              style={{
                fontFamily: t.fonts.sans.regular,
                fontSize: 21,
                lineHeight: 33,
                marginBottom: 24,
              }}
            />
          ))}
        </ScrollReveal>

        {/* quick-facts card */}
        <ScrollReveal index={1} style={{ flex: isRow ? 1 : undefined }}>
          <View
            style={{
              backgroundColor: t.colors.cream,
              borderWidth: 2,
              borderColor: t.colors.ink,
              borderRadius: t.radii.xl,
              padding: 36,
              paddingTop: 40,
            }}>
            <View
              style={{
                position: 'absolute',
                top: -14,
                left: 24,
                backgroundColor: t.colors.mustard,
                borderWidth: 1.5,
                borderColor: t.colors.ink,
                borderRadius: 20,
                paddingVertical: 4,
                paddingHorizontal: 14,
              }}>
              <Text style={{ fontFamily: t.fonts.sans.semibold, fontSize: 12, color: t.colors.ink }}>
                {data.card.tag}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: t.fonts.sans.bold,
                fontSize: 26,
                letterSpacing: -0.5,
                color: t.colors.ink,
                marginBottom: 12,
              }}>
              {data.card.title}
            </Text>
            {data.card.facts.map((fact, i) => (
              <View
                key={fact.label}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 12,
                  borderBottomWidth: i === data.card.facts.length - 1 ? 0 : 1,
                  borderColor: t.colors.ink,
                  borderStyle: 'dashed',
                }}>
                <Text style={{ fontFamily: t.fonts.mono, fontSize: 13, color: t.colors.ink }}>
                  {fact.label}
                </Text>
                <Text
                  style={{
                    fontFamily: t.fonts.mono,
                    fontSize: 13,
                    color: t.colors.brick,
                    flexShrink: 1,
                    textAlign: 'right',
                  }}>
                  {fact.value}
                </Text>
              </View>
            ))}
          </View>
        </ScrollReveal>
      </View>
    </Section>
  );
}
