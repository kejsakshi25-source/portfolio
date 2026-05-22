import { Text, View } from 'react-native';

import { ScrollReveal } from '@/src/components/motion/ScrollReveal';
import type { RoleCard } from '@/src/data/types';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useResponsiveValue } from '@/src/hooks/useResponsiveValue';
import { contentMaxWidth } from '@/src/theme/breakpoints';
import { useTheme } from '@/src/theme/ThemeProvider';

/**
 * The "My role" card in a case-study hero — ports `.role-card`: a dark ink
 * card, `1fr / 1.6fr` split, mustard title, arrow-bulleted responsibilities.
 *
 * It sits directly in the hero flow (the source has it inside `.case-hero`),
 * so it carries only a small top gap from the description above — not a full
 * section's vertical padding — and the dashed divider follows it.
 */
export function RoleCardView({ roleCard }: { roleCard: RoleCard }) {
  const t = useTheme();
  const bp = useBreakpoint();
  const isRow = bp === 'desktop' || bp === 'wide';
  const titleSize = useResponsiveValue(t.typeScale.roleTitle);
  const padH = useResponsiveValue({ mobile: 20, tablet: 40, desktop: 60, wide: 60 });

  return (
    <View style={{ paddingHorizontal: padH, paddingTop: 32 }}>
      <View style={{ width: '100%', maxWidth: contentMaxWidth, alignSelf: 'center' }}>
        <ScrollReveal>
        <View
          style={{
            backgroundColor: t.colors.ink,
            borderRadius: t.radii.xl,
            paddingVertical: 40,
            paddingHorizontal: 52,
            flexDirection: isRow ? 'row' : 'column',
            alignItems: isRow ? 'center' : 'stretch',
            gap: isRow ? 24 : 28,
          }}>
          <View style={{ flex: isRow ? 1 : undefined }}>
            <Text
              style={{
                fontFamily: t.fonts.mono,
                fontSize: 10,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: t.colors.cream,
                opacity: 0.4,
                marginBottom: 14,
              }}>
              {roleCard.label}
            </Text>
            <Text
              style={{
                fontFamily: t.fonts.sans.extrabold,
                fontSize: titleSize,
                letterSpacing: titleSize * -0.04,
                lineHeight: titleSize * 0.92,
                color: t.colors.mustard,
                marginBottom: 12,
              }}>
              {roleCard.title}
            </Text>
            <Text
              style={{
                fontFamily: t.fonts.serif.italic,
                fontSize: 18,
                color: t.colors.cream,
                opacity: 0.55,
              }}>
              {roleCard.sub}
            </Text>
          </View>

          <View style={{ flex: isRow ? 1.6 : undefined }}>
            {roleCard.bullets.map((bullet, i) => (
              <View
                key={bullet}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 12,
                  paddingVertical: 12,
                  borderBottomWidth: i === roleCard.bullets.length - 1 ? 0 : 1,
                  borderColor: 'rgba(245,234,212,0.08)',
                }}>
                <Text style={{ fontFamily: t.fonts.sans.regular, fontSize: 15, color: t.colors.mustard }}>
                  →
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: t.fonts.sans.regular,
                    fontSize: 15,
                    lineHeight: 22,
                    color: t.colors.cream,
                  }}>
                  {bullet}
                </Text>
              </View>
            ))}
          </View>
        </View>
        </ScrollReveal>
      </View>
    </View>
  );
}
