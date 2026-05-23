import { useId } from 'react';
import { Image, type ImageContentFit } from 'expo-image';
import { type ImageStyle, StyleSheet, type StyleProp, Text, View, type ViewStyle } from 'react-native';
import Svg, { Defs, Pattern, Rect } from 'react-native-svg';

import { Icon } from '@/src/components/decor/Icon';
import type { MediaRef } from '@/src/data/types';
import { useTheme } from '@/src/theme/ThemeProvider';

interface RemoteImageProps {
  media: MediaRef;
  style?: StyleProp<ImageStyle>;
  contentFit?: ImageContentFit;
  /** Optional line icon shown inside a `placeholder` slot, above the label. */
  placeholderIcon?: string;
  /** Fires when an actual image starts / finishes loading (image kinds only). */
  onLoadStart?: () => void;
  onLoad?: () => void;
}

/**
 * Renders a MediaRef. `local`/`remote` draw an image via expo-image;
 * `placeholder` renders the source's "Drop screenshot"-style empty slot,
 * filled with the source's diagonal-hatch pinstripe texture (and, when given,
 * a centered line icon — the source's empty-card glyphs).
 * The single resolver for every image in the app — when the backend lands,
 * `remote` refs flow through here unchanged.
 */
export function RemoteImage({
  media,
  style,
  contentFit = 'cover',
  placeholderIcon,
  onLoadStart,
  onLoad,
}: RemoteImageProps) {
  const t = useTheme();
  // useId() contains ':' which is invalid inside url(#...) — strip it.
  const patternId = `hatch-${useId().replace(/:/g, '')}`;

  if (media.kind === 'placeholder') {
    return (
      <View
        style={[
          {
            backgroundColor: t.colors.linen,
            borderWidth: 2,
            borderColor: t.colors.ink,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: 12,
            overflow: 'hidden',
          },
          style as StyleProp<ViewStyle>,
        ]}>
        {/* diagonal hatch — ports the source's repeating-linear-gradient fill */}
        <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <Pattern
              id={patternId}
              width={14}
              height={14}
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)">
              <Rect width={7} height={14} fill="rgba(45,26,20,0.05)" />
            </Pattern>
          </Defs>
          <Rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </Svg>
        {placeholderIcon && (
          <View style={{ opacity: 0.22 }}>
            <Icon name={placeholderIcon} size={28} color={t.colors.ink} strokeWidth={1.5} />
          </View>
        )}
        <Text
          style={{
            fontFamily: t.fonts.mono,
            fontSize: 10,
            letterSpacing: 1,
            color: t.colors.ink,
            opacity: 0.4,
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
          {media.label}
        </Text>
      </View>
    );
  }

  const source = media.kind === 'local' ? media.module : { uri: media.url };

  return (
    <Image
      source={source}
      style={style}
      contentFit={contentFit}
      alt={media.alt}
      cachePolicy="memory-disk"
      onLoadStart={onLoadStart}
      onLoad={onLoad}
    />
  );
}
