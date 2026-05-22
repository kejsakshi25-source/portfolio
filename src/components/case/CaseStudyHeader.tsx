import { Text, View } from 'react-native';

import { ScrollReveal } from '@/src/components/motion/ScrollReveal';
import { AccentText } from '@/src/components/text/AccentText';
import type { RichText } from '@/src/data/types';
import { useResponsiveValue } from '@/src/hooks/useResponsiveValue';
import { contentMaxWidth } from '@/src/theme/breakpoints';
import { useTheme } from '@/src/theme/ThemeProvider';

interface CaseStudyHeaderProps {
  eyebrow: string;
  title: RichText;
  caseDesc: string;
  /** Optional role line (tabbed case studies — Xpert). */
  role?: string;
}

/**
 * Shared hero for every case study — eyebrow, title, intro paragraph.
 * Mirrors `.case-hero`: title at line-height .88 / letter-spacing -.05em,
 * description at 20px / line-height 1.7.
 */
export function CaseStudyHeader({ eyebrow, title, caseDesc, role }: CaseStudyHeaderProps) {
  const t = useTheme();
  const padH = useResponsiveValue({ mobile: 20, tablet: 40, desktop: 60, wide: 60 });
  const titleSize = useResponsiveValue(t.typeScale.hero);
  const roleSize = useResponsiveValue({ mobile: 28, tablet: 38, desktop: 44, wide: 48 });

  return (
    <View style={{ paddingHorizontal: padH, paddingTop: 140, paddingBottom: 16 }}>
      <View style={{ width: '100%', maxWidth: contentMaxWidth, alignSelf: 'center' }}>
        <ScrollReveal index={0}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              alignSelf: 'flex-start',
              backgroundColor: t.colors.ink,
              borderRadius: 50,
              paddingVertical: 7,
              paddingHorizontal: 18,
              marginBottom: 24,
            }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: t.colors.mustard }} />
            <Text
              style={{
                fontFamily: t.fonts.mono,
                fontSize: 11,
                letterSpacing: 1.1,
                textTransform: 'uppercase',
                color: t.colors.cream,
              }}>
              {eyebrow}
            </Text>
          </View>
        </ScrollReveal>

        <ScrollReveal index={1}>
          <AccentText
            value={title}
            style={{
              fontFamily: t.fonts.sans.extrabold,
              fontSize: titleSize,
              lineHeight: titleSize * 0.88,
              letterSpacing: titleSize * -0.05,
            }}
          />
        </ScrollReveal>

        {role && (
          <ScrollReveal index={2}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 14 }}>
              <View style={{ width: 36, height: 3, borderRadius: 2, backgroundColor: t.colors.brick }} />
              <Text
                style={{
                  fontFamily: t.fonts.serif.italic,
                  fontSize: roleSize,
                  color: t.colors.ink,
                }}>
                {role}
              </Text>
            </View>
          </ScrollReveal>
        )}

        <ScrollReveal index={3}>
          <Text
            style={{
              fontFamily: t.fonts.sans.regular,
              fontSize: 20,
              lineHeight: 34,
              color: t.colors.ink,
              opacity: 0.75,
              marginTop: 28,
              maxWidth: 860,
            }}>
            {caseDesc}
          </Text>
        </ScrollReveal>
      </View>
    </View>
  );
}
