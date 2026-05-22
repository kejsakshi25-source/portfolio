import { useEffect } from 'react';
import { Linking, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Icon } from '@/src/components/decor/Icon';
import { Section } from '@/src/components/layout/Section';
import { ResponsiveGrid } from '@/src/components/layout/ResponsiveGrid';
import { MagneticPressable } from '@/src/components/motion/MagneticPressable';
import { ScrollReveal } from '@/src/components/motion/ScrollReveal';
import { AccentText } from '@/src/components/text/AccentText';
import type { ContactLink, LandingContent } from '@/src/data/types';
import { useResponsiveValue } from '@/src/hooks/useResponsiveValue';
import { useTheme } from '@/src/theme/ThemeProvider';

/** The "currently available" status dot — pulses, porting `@keyframes blink`. */
function PulseDot() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.25, { duration: 700, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#6fcf6f' }, style]}
    />
  );
}

/** A single contact-link tile. */
function ContactLinkCard({ link }: { link: ContactLink }) {
  const t = useTheme();
  const palette: Record<ContactLink['kind'], { bg: string; fg: string; sub: string }> = {
    mail: { bg: t.colors.ink, fg: t.colors.cream, sub: 'rgba(245,234,212,0.6)' },
    phone: { bg: t.colors.brick, fg: t.colors.cream, sub: 'rgba(245,234,212,0.7)' },
    whatsapp: { bg: t.colors.cream, fg: t.colors.ink, sub: 'rgba(45,26,20,0.6)' },
    linkedin: { bg: t.colors.sand, fg: t.colors.ink, sub: 'rgba(45,26,20,0.6)' },
  };
  const c = palette[link.kind];

  return (
    <MagneticPressable
      onPress={() => Linking.openURL(link.href)}
      accessibilityLabel={`${link.platform}: ${link.value}`}
      style={{ backgroundColor: c.bg, borderRadius: t.radii.lg, padding: 24, gap: 16 }}>
      {/* cl-top: icon + platform label */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Icon name={link.kind} size={18} color={c.fg} strokeWidth={2} />
        <Text
          style={{
            fontFamily: t.fonts.mono,
            fontSize: 10,
            letterSpacing: 1.4,
            textTransform: 'uppercase',
            color: c.sub,
          }}>
          {link.platform}
        </Text>
      </View>
      <Text style={{ fontFamily: t.fonts.sans.bold, fontSize: 14, color: c.fg }}>{link.value}</Text>
    </MagneticPressable>
  );
}

/** Closing contact section — the landing page's "Let's talk?" call to action. */
export function Contact({ data }: { data: LandingContent['contact'] }) {
  const t = useTheme();
  const headingSize = useResponsiveValue(t.typeScale.hero);

  return (
    <Section>
      <ScrollReveal>
        <View
          style={{
            backgroundColor: t.colors.mustard,
            borderWidth: 3,
            borderColor: t.colors.ink,
            borderRadius: t.radii.xxl,
            padding: useResponsiveValue({ mobile: 28, tablet: 44, desktop: 64, wide: 72 }),
          }}>
          {/* availability badge */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              alignSelf: 'center',
              backgroundColor: t.colors.ink,
              borderRadius: t.radii.pill,
              paddingVertical: 7,
              paddingHorizontal: 18,
              marginBottom: 24,
            }}>
            <PulseDot />
            <Text
              style={{
                fontFamily: t.fonts.mono,
                fontSize: 11,
                letterSpacing: 1,
                textTransform: 'uppercase',
                color: t.colors.cream,
              }}>
              {data.badge}
            </Text>
          </View>

          <AccentText
            value={data.heading}
            style={{
              fontFamily: t.fonts.sans.extrabold,
              fontSize: headingSize,
              lineHeight: headingSize * 0.88,
              letterSpacing: headingSize * -0.06,
              textAlign: 'center',
            }}
          />

          <Text
            style={{
              fontFamily: t.fonts.sans.regular,
              fontSize: 17,
              lineHeight: 27,
              color: t.colors.ink,
              opacity: 0.8,
              textAlign: 'center',
              alignSelf: 'center',
              maxWidth: 560,
              marginTop: 16,
              marginBottom: 44,
            }}>
            {data.sub}
          </Text>

          <Text
            style={{
              fontFamily: t.fonts.mono,
              fontSize: 11,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
              color: 'rgba(45,26,20,0.5)',
              marginBottom: 14,
            }}>
            {data.label}
          </Text>

          <ResponsiveGrid columns={{ mobile: 1, tablet: 2, desktop: 4 }} gap={12}>
            {data.links.map((link) => (
              <ContactLinkCard key={link.id} link={link} />
            ))}
          </ResponsiveGrid>
        </View>
      </ScrollReveal>
    </Section>
  );
}
