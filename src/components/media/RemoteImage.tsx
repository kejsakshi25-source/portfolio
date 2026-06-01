import { useId } from 'react';
import { Image, type ImageContentFit, type ImageSource } from 'expo-image';
import {
  Image as RNImage,
  Platform,
  type ImageStyle,
  StyleSheet,
  type StyleProp,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import Svg, { Defs, Pattern, Rect } from 'react-native-svg';

import { Icon } from '@/src/components/decor/Icon';
import { LazyMount } from '@/src/components/media/LazyMount';
import type { MediaPriority, MediaRef } from '@/src/data/types';
import { useTheme } from '@/src/theme/ThemeProvider';

interface RemoteImageProps {
  media: MediaRef;
  style?: StyleProp<ImageStyle>;
  contentFit?: ImageContentFit;
  /** Optional line icon shown inside a `placeholder` slot, above the label. */
  placeholderIcon?: string;
  /** Caller-side override for priority — wins over `media.priority`. Used
   *  by the lightbox to load slides immediately. */
  priority?: MediaPriority;
  /** Fires when an actual image starts / finishes loading (image kinds only). */
  onLoadStart?: () => void;
  onLoad?: () => void;
}

/** Build the expo-image `source` argument from a local-or-remote MediaRef.
 *  Web: an array of `{uri,width}` for responsive picking (`v.src` is a Metro
 *  asset id — resolve it through `Image.resolveAssetSource` to get the real
 *  hashed URL). Native: the original module/uri unchanged. */
function buildSource(media: Extract<MediaRef, { kind: 'local' | 'remote' }>):
  | number
  | ImageSource
  | ImageSource[] {
  const original = media.kind === 'local' ? media.module : { uri: media.url };
  if (Platform.OS !== 'web' || !media.variants || media.variants.length === 0) {
    return original as number | ImageSource;
  }
  try {
    const sources = media.variants
      .slice()
      .sort((a, b) => a.w - b.w)
      .map<ImageSource>((v) => ({ uri: RNImage.resolveAssetSource(v.src).uri, width: v.w }));
    return sources.length > 0 ? sources : (original as number | ImageSource);
  } catch {
    return original as number | ImageSource;
  }
}

/**
 * Renders a MediaRef. `local`/`remote` draw an image via expo-image;
 * `placeholder` renders the source's "Drop screenshot"-style empty slot,
 * filled with the source's diagonal-hatch pinstripe texture (and, when given,
 * a centered line icon — the source's empty-card glyphs).
 *
 * On web, accepts responsive WebP variants via `media.variants` and
 * IntersectionObserver-lazy-mounts unless `media.priority === 'high'`.
 */
export function RemoteImage({
  media,
  style,
  contentFit = 'cover',
  placeholderIcon,
  priority: priorityOverride,
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

  const priority = priorityOverride ?? media.priority ?? 'normal';
  const source = buildSource(media);

  // The wrapper holds the layout box (size, margin, border, radius); the
  // image fills it absolutely. This way the slot reserves space before the
  // image mounts, and styles aren't double-applied via wrapper + image.
  return (
    <LazyMount
      disabled={priority === 'high'}
      style={[{ overflow: 'hidden' }, style as StyleProp<ViewStyle>]}>
      <Image
        source={source}
        style={StyleSheet.absoluteFill as StyleProp<ImageStyle>}
        contentFit={contentFit}
        alt={media.alt}
        cachePolicy="memory-disk"
        priority={priority}
        responsivePolicy="static"
        onLoadStart={onLoadStart}
        onLoad={onLoad}
      />
    </LazyMount>
  );
}
