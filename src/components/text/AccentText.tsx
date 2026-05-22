import { type StyleProp, StyleSheet, Text, type TextStyle, View } from 'react-native';

import { Squiggle } from '@/src/components/decor/Squiggle';
import type { AccentStyle, RichText, TextSegment } from '@/src/data/types';
import { useTheme } from '@/src/theme/ThemeProvider';

/** Normalize a RichText value (string or segments) to a segment array. */
function toSegments(value: RichText): TextSegment[] {
  return typeof value === 'string' ? [{ text: value }] : value;
}

type Tone = 'light' | 'dark';

interface AccentTextProps {
  value: RichText;
  /** Base text style applied to the whole run (font size, family, etc.). */
  style?: StyleProp<TextStyle>;
  /** Default color for unstyled segments. */
  baseColor?: string;
  /** Light sections vs. dark (ink) sections — flips accent colors. */
  tone?: Tone;
  /**
   * Force the display (segmented) renderer. Auto-enabled when any segment
   * carries a `pop`, `blob`, or `squig` accent — those need real chips /
   * an SVG underline that inline nested <Text> can't reproduce.
   */
  display?: boolean;
}

/** Accents that can only be rendered as standalone views, not inline text. */
const DISPLAY_ACCENTS: AccentStyle[] = ['pop', 'blob', 'squig'];

/**
 * Renders a RichText value with the source's decorative spans
 * (`<em>`, `.pop`, `.blob`, `.squig`, `.lora`).
 *
 * Two render paths:
 *  - Inline (default): a base <Text> with nested <Text> runs. Used for body
 *    copy and headings whose only accents are serif/lora/highlight.
 *  - Display (segmented): when a `pop` / `blob` / `squig` accent is present
 *    the run is split into lines of <View>s, so chips get a real rounded /
 *    organic shape with rotation and `squig` gets its SVG underline — the
 *    things inline nested <Text> backgrounds can't do.
 */
export function AccentText({ value, style, baseColor, tone = 'light', display }: AccentTextProps) {
  const t = useTheme();
  const segments = toSegments(value);
  const isDisplay =
    display ?? segments.some((s) => s.style && DISPLAY_ACCENTS.includes(s.style));

  /* ───────────── inline path ───────────── */

  const inlineAccent = (accent: AccentStyle): TextStyle => {
    switch (accent) {
      case 'serif':
        return {
          fontFamily: t.fonts.serif.italic,
          color: tone === 'dark' ? t.colors.mustard : t.colors.brick,
        };
      case 'squig':
        return { fontFamily: t.fonts.serif.italic, color: t.colors.rust };
      case 'lora':
        return {
          fontFamily: t.fonts.quote,
          color: tone === 'dark' ? t.colors.cream : t.colors.ink,
        };
      case 'pop':
        return {
          backgroundColor: t.colors.brick,
          color: t.colors.cream,
          borderRadius: 999,
          paddingHorizontal: 16,
        };
      case 'blob':
        return {
          backgroundColor: t.colors.mustard,
          color: t.colors.ink,
          borderRadius: 999,
          paddingHorizontal: 16,
        };
      case 'highlight':
        return {
          backgroundColor: t.colors.mustard,
          color: t.colors.ink,
          fontWeight: '600',
          borderRadius: 6,
          paddingHorizontal: 8,
        };
      case 'highlightAlt':
        return {
          backgroundColor: t.colors.brick,
          color: t.colors.cream,
          fontWeight: '600',
          borderRadius: 6,
          paddingHorizontal: 8,
        };
      default:
        return {};
    }
  };

  if (!isDisplay) {
    return (
      <Text style={[{ color: baseColor ?? t.colors.ink }, style]}>
        {segments.map((seg, i) =>
          seg.style ? (
            <Text key={i} style={inlineAccent(seg.style)}>
              {seg.text}
            </Text>
          ) : (
            seg.text
          ),
        )}
      </Text>
    );
  }

  /* ───────────── display path ───────────── */

  // Split the run into lines on every '\n' (segments may carry trailing or
  // leading newlines, or stand alone as a single '\n').
  const lines: TextSegment[][] = [[]];
  for (const seg of segments) {
    const parts = (seg.text ?? '').split('\n');
    parts.forEach((part, i) => {
      if (i > 0) lines.push([]);
      if (part.length > 0) lines[lines.length - 1].push({ text: part, style: seg.style });
    });
  }

  const flat = (StyleSheet.flatten(style) ?? {}) as TextStyle;
  const fontSize = (flat.fontSize as number) ?? 16;
  const lineHeight = (flat.lineHeight as number) ?? fontSize;
  const padX = Math.round(fontSize * 0.22);
  const chipText: TextStyle = { ...flat, lineHeight: fontSize, marginVertical: 0 };

  /** A rounded / organic chip — the `.pop` and `.blob` accents. */
  const Chip = ({
    text,
    bg,
    fg,
    rotate,
    organic,
  }: {
    text: string;
    bg: string;
    fg: string;
    rotate: number;
    organic?: boolean;
  }) => (
    <View
      style={{
        backgroundColor: bg,
        paddingHorizontal: padX,
        paddingTop: Math.round(fontSize * 0.04),
        paddingBottom: Math.round(fontSize * 0.1),
        transform: [{ rotate: `${rotate}deg` }],
        ...(organic
          ? {
              borderTopLeftRadius: fontSize * 0.6,
              borderTopRightRadius: fontSize * 0.42,
              borderBottomRightRadius: fontSize * 0.5,
              borderBottomLeftRadius: fontSize * 0.58,
            }
          : { borderRadius: fontSize }),
      }}>
      <Text style={[chipText, { color: fg }]}>{text}</Text>
    </View>
  );

  const renderSegment = (seg: TextSegment, key: number) => {
    switch (seg.style) {
      case 'pop':
        return <Chip key={key} text={seg.text} bg={t.colors.brick} fg={t.colors.cream} rotate={-2} />;
      case 'blob':
        return (
          <Chip key={key} text={seg.text} bg={t.colors.mustard} fg={t.colors.ink} rotate={3} organic />
        );
      case 'highlight':
        return (
          <View
            key={key}
            style={{
              backgroundColor: t.colors.mustard,
              borderRadius: 6,
              paddingHorizontal: 8,
              transform: [{ rotate: '-1deg' }],
            }}>
            <Text style={[chipText, { color: t.colors.ink, fontWeight: '600' }]}>{seg.text}</Text>
          </View>
        );
      case 'highlightAlt':
        return (
          <View
            key={key}
            style={{
              backgroundColor: t.colors.brick,
              borderRadius: 6,
              paddingHorizontal: 8,
              transform: [{ rotate: '1deg' }],
            }}>
            <Text style={[chipText, { color: t.colors.cream, fontWeight: '600' }]}>{seg.text}</Text>
          </View>
        );
      case 'squig':
        // serif italic word + a hand-drawn underline squiggle after it.
        return (
          <View key={key} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[style, { fontFamily: t.fonts.serif.italic, color: t.colors.rust }]}>
              {seg.text}
            </Text>
            <View style={{ marginLeft: 8 }}>
              <Squiggle width={fontSize * 0.78} height={fontSize * 0.3} />
            </View>
          </View>
        );
      case 'serif':
        return (
          <Text
            key={key}
            style={[
              style,
              {
                fontFamily: t.fonts.serif.italic,
                color: tone === 'dark' ? t.colors.mustard : t.colors.brick,
                flexShrink: 1,
              },
            ]}>
            {seg.text}
          </Text>
        );
      case 'lora':
        return (
          <Text
            key={key}
            style={[
              style,
              {
                fontFamily: t.fonts.quote,
                color: tone === 'dark' ? t.colors.cream : t.colors.ink,
                flexShrink: 1,
              },
            ]}>
            {seg.text}
          </Text>
        );
      default:
        return (
          <Text key={key} style={[style, { color: baseColor ?? t.colors.ink, flexShrink: 1 }]}>
            {seg.text}
          </Text>
        );
    }
  };

  return (
    <View>
      {lines.map((line, li) => (
        <View
          key={li}
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            minHeight: lineHeight,
          }}>
          {line.map((seg, si) => renderSegment(seg, si))}
        </View>
      ))}
    </View>
  );
}
