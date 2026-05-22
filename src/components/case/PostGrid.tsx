import { useVideoPlayer, VideoView } from 'expo-video';
import { Platform, Text, View } from 'react-native';

import { ResponsiveGrid } from '@/src/components/layout/ResponsiveGrid';
import { Section } from '@/src/components/layout/Section';
import { RemoteImage } from '@/src/components/media/RemoteImage';
import { HoverCard } from '@/src/components/motion/HoverCard';
import { ScrollReveal } from '@/src/components/motion/ScrollReveal';
import type { MediaRef, PostItem, PostsSection } from '@/src/data/types';
import { useTheme } from '@/src/theme/ThemeProvider';

const BADGE: Record<PostItem['type'], string> = {
  carousel: 'Carousel',
  image: 'Static',
  video: 'Reel',
};

/**
 * Video thumbnail — shows the actual reel. On web it autoplays a muted hover
 * preview (and resets on leave), matching the source's `mouseenter` preview;
 * on native it shows the paused first frame under the play overlay.
 */
function VideoPostThumb({ video }: { video: MediaRef }) {
  const player = useVideoPlayer(video.kind === 'local' ? video.module : null, (p) => {
    p.loop = true;
    p.muted = true;
  });

  const hover =
    Platform.OS === 'web'
      ? {
          onPointerEnter: () => player.play(),
          onPointerLeave: () => {
            player.pause();
            player.currentTime = 0;
          },
        }
      : {};

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#1a1008' }} {...hover}>
      <VideoView
        player={player}
        style={{ width: '100%', height: '100%' }}
        contentFit="cover"
        nativeControls={false}
      />
    </View>
  );
}

/** Centered play button over a video thumbnail — ports `.play-overlay`. */
function PlayOverlay() {
  const t = useTheme();
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(45,26,20,0.2)',
      }}
      pointerEvents="none">
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: 'rgba(245,234,212,0.92)',
          borderWidth: 2,
          borderColor: t.colors.ink,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ fontSize: 18, color: t.colors.ink, marginLeft: 3 }}>▶</Text>
      </View>
    </View>
  );
}

function PostCard({ post, onPress }: { post: PostItem; onPress?: () => void }) {
  const t = useTheme();
  const isVideo = post.type === 'video';

  return (
    <HoverCard
      radius={t.radii.lg}
      lift={-10}
      rotate={-0.5}
      scaleTo={1.012}
      onPress={onPress}
      accessibilityLabel={`${post.caption} — ${BADGE[post.type]}`}>
      <View
        style={{
          borderWidth: 2,
          borderColor: t.colors.ink,
          borderRadius: t.radii.lg,
          overflow: 'hidden',
          backgroundColor: t.colors.cream,
        }}>
        {/* square thumbnail — source `.post-thumb{aspect-ratio:1/1}` */}
        <View style={{ width: '100%', aspectRatio: 1 }}>
          {isVideo && post.video ? (
            <VideoPostThumb video={post.video} />
          ) : (
            <RemoteImage media={post.cover} style={{ width: '100%', height: '100%' }} />
          )}
          {isVideo && <PlayOverlay />}
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: t.colors.ink,
              borderRadius: 20,
              paddingVertical: 4,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                fontFamily: t.fonts.mono,
                fontSize: 9,
                letterSpacing: 0.6,
                textTransform: 'uppercase',
                color: t.colors.cream,
              }}>
              {BADGE[post.type]}
            </Text>
          </View>
        </View>
        <View style={{ padding: 14 }}>
          <Text style={{ fontFamily: t.fonts.sans.bold, fontSize: 15, color: t.colors.ink }}>
            {post.caption}
          </Text>
        </View>
      </View>
    </HoverCard>
  );
}

/** "The posts. All of them." — grid of social posts, opens the Lightbox. */
export function PostGrid({
  data,
  onOpenPost,
}: {
  data: PostsSection;
  onOpenPost?: (post: PostItem) => void;
}) {
  const t = useTheme();

  return (
    <Section num={data.label} heading={data.heading}>
      {data.hint && (
        <Text
          style={{
            fontFamily: t.fonts.mono,
            fontSize: 12,
            color: t.colors.rust,
            marginTop: -8,
            marginBottom: 20,
          }}>
          {data.hint}
        </Text>
      )}
      {/* Source posts grid is 3 columns. */}
      <ResponsiveGrid columns={{ mobile: 2, tablet: 2, desktop: 3 }}>
        {data.items.map((post, i) => (
          <ScrollReveal key={post.id} index={i % 3}>
            <PostCard post={post} onPress={onOpenPost ? () => onOpenPost(post) : undefined} />
          </ScrollReveal>
        ))}
      </ResponsiveGrid>
    </Section>
  );
}
