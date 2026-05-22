import { Linking, Text, View } from 'react-native';

import { Icon } from '@/src/components/decor/Icon';
import { ResponsiveGrid } from '@/src/components/layout/ResponsiveGrid';
import { MagneticPressable } from '@/src/components/motion/MagneticPressable';
import { AccentText } from '@/src/components/text/AccentText';
import { useLanding } from '@/src/data/ContentProvider';
import type { ContactLink } from '@/src/data/types';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useResponsiveValue } from '@/src/hooks/useResponsiveValue';
import { contentMaxWidth } from '@/src/theme/breakpoints';
import { useTheme } from '@/src/theme/ThemeProvider';

function FooterLink({ link }: { link: ContactLink }) {
  const t = useTheme();
  const config: Record<ContactLink['kind'], { bg: string; fg: string }> = {
    mail: { bg: t.colors.brick, fg: t.colors.cream },
    phone: { bg: t.colors.mustard, fg: t.colors.ink },
    whatsapp: { bg: t.colors.cream, fg: t.colors.ink },
    linkedin: { bg: 'rgba(245,234,212,0.08)', fg: t.colors.cream },
  };
  const c = config[link.kind];
  // The source's case-study footers render LinkedIn as the full name.
  const value = link.kind === 'linkedin' ? 'Sakshi Kejriwal' : link.value;

  return (
    <MagneticPressable
      onPress={() => Linking.openURL(link.href)}
      accessibilityLabel={`${link.platform}: ${value}`}
      style={{ backgroundColor: c.bg, borderRadius: t.radii.md, padding: 18, gap: 8, minWidth: 136 }}>
      {/* fl-plat: icon + platform label */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Icon name={link.kind} size={13} color={c.fg} strokeWidth={2} />
        <Text
          style={{
            fontFamily: t.fonts.mono,
            fontSize: 9,
            letterSpacing: 1.08,
            textTransform: 'uppercase',
            color: c.fg,
            opacity: 0.55,
          }}>
          {link.platform}
        </Text>
      </View>
      <Text style={{ fontFamily: t.fonts.sans.bold, fontSize: 13, color: c.fg }}>{value}</Text>
    </MagneticPressable>
  );
}

/**
 * Shared "Let's talk?" footer for case-study screens — ports `footer`:
 * on desktop the heading sits left and the link row right, in one row;
 * on phones/tablets it stacks (heading above a 2-up link grid).
 */
export function CaseFooter() {
  const t = useTheme();
  const landing = useLanding();
  const bp = useBreakpoint();
  const isRow = bp === 'desktop' || bp === 'wide';
  const padH = useResponsiveValue({ mobile: 20, tablet: 40, desktop: 60, wide: 60 });
  const headingSize = useResponsiveValue({ mobile: 36, tablet: 44, desktop: 52, wide: 52 });

  if (!landing) return null;
  const contact = landing.contact;

  const heading = (
    <AccentText
      value={contact.heading}
      tone="dark"
      baseColor={t.colors.cream}
      style={{
        fontFamily: t.fonts.sans.extrabold,
        fontSize: headingSize,
        lineHeight: headingSize * 0.95,
        letterSpacing: headingSize * -0.04,
      }}
    />
  );

  return (
    <View
      style={{
        backgroundColor: t.colors.ink,
        paddingHorizontal: padH,
        paddingTop: 60,
        paddingBottom: 44,
      }}>
      <View style={{ width: '100%', maxWidth: contentMaxWidth, alignSelf: 'center' }}>
        {isRow ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 40,
            }}>
            <View style={{ flexShrink: 1 }}>{heading}</View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {contact.links.map((link) => (
                <FooterLink key={link.id} link={link} />
              ))}
            </View>
          </View>
        ) : (
          <>
            <View style={{ marginBottom: 24 }}>{heading}</View>
            <ResponsiveGrid columns={{ mobile: 2, tablet: 4 }} gap={10}>
              {contact.links.map((link) => (
                <FooterLink key={link.id} link={link} />
              ))}
            </ResponsiveGrid>
          </>
        )}
      </View>
    </View>
  );
}
