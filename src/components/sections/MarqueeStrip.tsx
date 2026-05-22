import { Text, View } from 'react-native';

import { Marquee } from '@/src/components/motion/Marquee';
import { useTheme } from '@/src/theme/ThemeProvider';

/**
 * The ink marquee divider — looping list of disciplines.
 *
 * Ports the source's `.mar`: an ink strip rotated `-1deg` with mustard
 * top/bottom borders, pulled in with negative margins so it overlaps the
 * sections above and below. The outer wrapper clips the diagonal overhang
 * (the source relies on `body{overflow-x:hidden}`) so it never introduces
 * horizontal scroll on mobile.
 *
 * Metrics ported verbatim from the source CSS:
 *  .mar          background ink · color cream · padding 10px 0 · margin -12px -20px
 *  .mar .t       Bricolage Grotesque 700 · font-size clamp(26,2.6vw,38) · letter-spacing -.03em
 *                animation `m 26s linear infinite` (translateX 0 → -50%)
 *  .mar .t span  padding 0 22px
 *  .mar .t em    color mustard (the ★ separator — inherits .t's font + size)
 */

// .t font-size — the source's clamp() ceiling, hit at the 1440px design width.
const FONT_SIZE = 28;
// letter-spacing -.03em at the resolved font size.
const LETTER_SPACING = FONT_SIZE * -0.03;
// `.mar .t` animation: `m 26s linear infinite`.
const CYCLE_MS = 26000;

export function MarqueeStrip({ words }: { words: string[] }) {
  const t = useTheme();

  return (
    <View style={{ paddingVertical: 14 }}>
      <View
        style={{
          backgroundColor: t.colors.ink,
          paddingVertical: 10,
          marginVertical: -14,
          marginHorizontal: -20,
          borderTopWidth: 5,
          borderBottomWidth: 5,
          borderColor: t.colors.mustard,
          transform: [{ rotate: '-1deg' }],
        }}>
        <Marquee duration={CYCLE_MS}>
          {/* words and ★ separators flow as plain inline siblings — no
              per-pair wrapper, matching the source's `<span>`/`<em>` markup */}
          {words.flatMap((word) => [
            <Text
              key={`word-${word}`}
              style={{
                fontFamily: t.fonts.sans.bold,
                fontSize: FONT_SIZE,
                letterSpacing: LETTER_SPACING,
                color: t.colors.cream,
                paddingHorizontal: 22,
              }}>
              {word}
            </Text>,
            <Text
              key={`star-${word}`}
              style={{
                fontFamily: t.fonts.sans.bold,
                fontSize: FONT_SIZE,
                letterSpacing: LETTER_SPACING,
                color: t.colors.mustard,
              }}>
              ★
            </Text>,
          ])}
        </Marquee>
      </View>
    </View>
  );
}
