import { useWindowDimensions, View } from 'react-native';

import { ScrollReveal } from '@/src/components/motion/ScrollReveal';
import { AccentText } from '@/src/components/text/AccentText';
import type { RichText } from '@/src/data/types';
import { useResponsiveValue } from '@/src/hooks/useResponsiveValue';
import { contentMaxWidth } from '@/src/theme/breakpoints';
import { useTheme } from '@/src/theme/ThemeProvider';

/**
 * The big manifesto headline — the source's `.hero` section: one full
 * viewport tall, content vertically centered, `.hero h1` at
 * line-height .92 / letter-spacing -.05em.
 */
export function Manifesto({ headline }: { headline: RichText }) {
  const t = useTheme();
  const { height } = useWindowDimensions();
  const size = useResponsiveValue(t.typeScale.hero);
  const padH = useResponsiveValue({ mobile: 20, tablet: 40, desktop: 60, wide: 60 });

  return (
    <View
      style={{
        minHeight: height,
        paddingHorizontal: padH,
        paddingTop: 110,
        paddingBottom: 40,
        justifyContent: 'center',
      }}>
      <View style={{ width: '100%', maxWidth: contentMaxWidth, alignSelf: 'center' }}>
        <ScrollReveal>
          <AccentText
            value={headline}
            style={{
              fontFamily: t.fonts.sans.extrabold,
              fontSize: size,
              lineHeight: size * 0.92,
              letterSpacing: size * -0.05,
            }}
          />
        </ScrollReveal>
      </View>
    </View>
  );
}
