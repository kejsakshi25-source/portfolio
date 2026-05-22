import { BlurView } from 'expo-blur';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { RemoteImage } from '@/src/components/media/RemoteImage';
import type { MediaRef, PostItem } from '@/src/data/types';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useTheme } from '@/src/theme/ThemeProvider';

/**
 * Full-screen viewer for a post — single image, swipeable carousel
 * (prev/next buttons + web keyboard nav), or autoplaying video.
 * Ports the source modal: blurred dark backdrop, a loading state, side
 * arrows that sit outside the media on desktop, Esc / ← / → on web.
 */
export function Lightbox({ post, onClose }: { post: PostItem | null; onClose: () => void }) {
  const t = useTheme();
  const { width, height } = useWindowDimensions();
  const bp = useBreakpoint();
  const isDesktop = bp === 'desktop' || bp === 'wide';
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setIndex(0);
    setLoaded(false);
  }, [post]);

  const videoModule =
    post?.type === 'video' && post.video?.kind === 'local' ? post.video.module : null;
  const player = useVideoPlayer(videoModule, (p) => {
    p.loop = true;
  });

  // Autoplay the video once the modal opens for a video post.
  useEffect(() => {
    if (post?.type === 'video') player.play();
  }, [post, player]);

  const slides: MediaRef[] =
    post?.type === 'carousel'
      ? (post.slides ?? [])
      : post?.type === 'image'
        ? [post.cover]
        : [];
  const total = slides.length;

  // web keyboard navigation
  useEffect(() => {
    if (Platform.OS !== 'web' || !post) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(total - 1, i + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [post, total, onClose]);

  // reset the loading state whenever the visible slide changes
  useEffect(() => setLoaded(false), [index]);

  if (!post) return null;

  const mediaW = Math.min(width * 0.9, 880);
  const mediaH = Math.min(height * 0.78, mediaW * 1.25);
  const isVideo = post.type === 'video';

  const navBtn = {
    position: 'absolute' as const,
    top: '50%' as const,
    marginTop: -22,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(45,26,20,0.6)',
    borderWidth: 2,
    borderColor: 'rgba(245,234,212,0.3)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };
  // arrows sit outside the media on desktop, just inside it on small screens
  const arrowInset = isDesktop ? -60 : 10;

  return (
    <Modal visible transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: 'rgba(45,26,20,0.82)',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}>
        {/* blurred backdrop — ports `backdrop-filter:blur(14px)` */}
        <BlurView tint="dark" intensity={28} style={StyleSheet.absoluteFill} pointerEvents="none" />

        {/* content — absorbs taps so they don't close the modal */}
        <Pressable onPress={() => {}} style={{ alignItems: 'center', gap: 16 }}>
          <View style={{ width: mediaW, height: mediaH }}>
            {isVideo ? (
              <VideoView
                player={player}
                style={{ width: '100%', height: '100%', borderRadius: 14 }}
                contentFit="contain"
                nativeControls
              />
            ) : (
              <RemoteImage
                media={slides[index]}
                contentFit="contain"
                style={{ width: '100%', height: '100%', borderRadius: 14 }}
                onLoadStart={() => setLoaded(false)}
                onLoad={() => setLoaded(true)}
              />
            )}

            {/* loading spinner / label */}
            {!isVideo && !loaded && (
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                pointerEvents="none">
                <Text
                  style={{
                    fontFamily: t.fonts.mono,
                    fontSize: 11,
                    letterSpacing: 1.3,
                    textTransform: 'uppercase',
                    color: 'rgba(245,234,212,0.6)',
                  }}>
                  Loading…
                </Text>
              </View>
            )}

            {/* close */}
            <Pressable
              onPress={onClose}
              accessibilityLabel="Close"
              style={{
                position: 'absolute',
                top: -16,
                right: -16,
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: t.colors.brick,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ color: t.colors.cream, fontSize: 16, fontFamily: t.fonts.sans.bold }}>
                ✕
              </Text>
            </Pressable>

            {/* carousel arrows — outside the media on desktop */}
            {total > 1 && (
              <>
                <Pressable
                  onPress={() => setIndex((i) => Math.max(0, i - 1))}
                  disabled={index === 0}
                  accessibilityLabel="Previous"
                  style={[navBtn, { left: arrowInset, opacity: index === 0 ? 0.25 : 1 }]}>
                  <Text style={{ color: t.colors.cream, fontSize: 18 }}>←</Text>
                </Pressable>
                <Pressable
                  onPress={() => setIndex((i) => Math.min(total - 1, i + 1))}
                  disabled={index === total - 1}
                  accessibilityLabel="Next"
                  style={[navBtn, { right: arrowInset, opacity: index === total - 1 ? 0.25 : 1 }]}>
                  <Text style={{ color: t.colors.cream, fontSize: 18 }}>→</Text>
                </Pressable>
              </>
            )}
          </View>

          {/* footer */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {total > 1 && (
              <Text style={{ fontFamily: t.fonts.mono, fontSize: 11, color: 'rgba(245,234,212,0.6)' }}>
                {index + 1} / {total}
              </Text>
            )}
            <Text style={{ fontFamily: t.fonts.serif.italic, fontSize: 15, color: t.colors.cream }}>
              {post.caption}
            </Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
