import { type ReactNode } from 'react';
import { type StyleProp, Text, View, type ViewStyle } from 'react-native';

import { AccentText } from '@/src/components/text/AccentText';
import type { RichText } from '@/src/data/types';
import { useResponsiveValue } from '@/src/hooks/useResponsiveValue';
import { contentMaxWidth } from '@/src/theme/breakpoints';
import { useTheme } from '@/src/theme/ThemeProvider';

interface SectionProps {
  /** Mono pill label, e.g. "01 · About". */
  num?: string;
  /** Section heading (RichText). */
  heading?: RichText;
  /** Light sections vs. dark (ink) sections. */
  tone?: 'light' | 'dark';
  /** Type scale for the heading — landing (`heading`, 84px) vs case (`caseHeading`, 56px). */
  headingScale?: 'heading' | 'caseHeading';
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * A page section: responsive horizontal padding, content width capped and
 * centered on large screens, with an optional numbered label + heading.
 * Heading metrics mirror the source's `.sh h2` / `.sec-heading`:
 * letter-spacing -.04em, line-height .95.
 */
export function Section({
  num,
  heading,
  tone = 'light',
  headingScale = 'heading',
  children,
  style,
}: SectionProps) {
  const t = useTheme();
  const padH = useResponsiveValue({ mobile: 20, tablet: 40, desktop: 60, wide: 60 });
  const headingSize = useResponsiveValue(t.typeScale[headingScale]);
  const fg = tone === 'dark' ? t.colors.cream : t.colors.ink;

  return (
    <View style={[{ paddingHorizontal: padH, paddingVertical: t.spacing.xl }, style]}>
      <View style={{ width: '100%', maxWidth: contentMaxWidth, alignSelf: 'center' }}>
        {(num || heading) && (
          <View style={{ marginBottom: 32 }}>
            {num && (
              <View
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: tone === 'dark' ? t.colors.cream : t.colors.ink,
                  borderRadius: t.radii.pill,
                  paddingVertical: 4,
                  paddingHorizontal: 14,
                  marginBottom: 18,
                }}>
                <Text
                  style={{
                    fontFamily: t.fonts.mono,
                    fontSize: 11,
                    letterSpacing: 1.1,
                    color: tone === 'dark' ? t.colors.ink : t.colors.cream,
                  }}>
                  {num}
                </Text>
              </View>
            )}
            {heading && (
              <AccentText
                value={heading}
                tone={tone}
                baseColor={fg}
                style={{
                  fontFamily: t.fonts.sans.extrabold,
                  fontSize: headingSize,
                  lineHeight: headingSize * 0.95,
                  letterSpacing: headingSize * -0.04,
                }}
              />
            )}
          </View>
        )}
        {children}
      </View>
    </View>
  );
}
