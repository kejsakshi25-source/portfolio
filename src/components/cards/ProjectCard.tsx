import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { DashedBorder } from '@/src/components/decor/DashedBorder';
import { RemoteImage } from '@/src/components/media/RemoteImage';
import { HoverCard } from '@/src/components/motion/HoverCard';
import { MagneticPressable } from '@/src/components/motion/MagneticPressable';
import { AccentText } from '@/src/components/text/AccentText';
import type { WorkCard } from '@/src/data/types';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useResponsiveValue } from '@/src/hooks/useResponsiveValue';
import { useTheme } from '@/src/theme/ThemeProvider';

/** A project on the landing "Work" section — navigates to its case study. */
export const ProjectCard = React.memo(function ProjectCard({ data }: { data: WorkCard }) {
  const t = useTheme();
  const bp = useBreakpoint();
  const isRow = bp === 'desktop' || bp === 'wide';
  const titleSize = useResponsiveValue(t.typeScale.projectTitle);

  const dark = data.variant === 'dark';
  const bg = dark ? t.colors.ink : t.colors.cream;
  const fg = dark ? t.colors.cream : t.colors.ink;
  const bodyColor = dark ? '#ddc7a8' : t.colors.ink;
  const accent = dark ? t.colors.mustard : t.colors.brick;
  const roleColor = dark ? t.colors.mustard : t.colors.rust;

  const goToCase = () => router.push({ pathname: '/work/[slug]', params: { slug: data.slug } });

  const imageEl = (
    <RemoteImage
      key="image"
      media={data.image}
      style={{
        width: isRow ? 240 : '100%',
        aspectRatio: 1,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: t.colors.ink,
      }}
    />
  );

  // body — defined below as `bodyEl`
  const bodyEl = (
    <View key="body" style={{ flex: isRow ? 1 : undefined, gap: 4 }}>
        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: dark ? t.colors.brick : t.colors.mustard,
            borderWidth: 1.5,
            borderColor: dark ? t.colors.cream : t.colors.ink,
            borderRadius: 20,
            paddingVertical: 6,
            paddingHorizontal: 14,
            transform: [{ rotate: '-2deg' }],
            marginBottom: 18,
          }}>
          <Text
            style={{
              fontFamily: t.fonts.sans.semibold,
              fontSize: 12,
              color: dark ? t.colors.cream : t.colors.ink,
            }}>
            {data.tag}
          </Text>
        </View>
        <AccentText
          value={data.title}
          baseColor={fg}
          tone={dark ? 'dark' : 'light'}
          style={{
            fontFamily: t.fonts.sans.extrabold,
            fontSize: titleSize,
            letterSpacing: titleSize * -0.04,
            lineHeight: titleSize * 0.92,
          }}
        />
        <Text
          style={{
            fontFamily: t.fonts.sans.medium,
            fontSize: 15,
            color: roleColor,
            marginTop: 8,
          }}>
          {data.role}
        </Text>
        <Text
          style={{
            fontFamily: t.fonts.sans.regular,
            fontSize: 15,
            lineHeight: 23,
            color: bodyColor,
            marginTop: 8,
            maxWidth: 480,
          }}>
          {data.description}
        </Text>
    </View>
  );

  const statsEl = (
    <View key="stats" style={{ alignItems: 'center', gap: 16 }}>
      {data.stat && (
          <DashedBorder
            radius={75}
            color={accent}
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{ rotate: '-6deg' }],
            }}>
            <View style={{ alignItems: 'center', padding: 12 }}>
              <Text style={{ fontFamily: t.fonts.display, fontSize: 50, lineHeight: 52, color: accent }}>
                {data.stat.value}
              </Text>
              <Text
                style={{
                  fontFamily: t.fonts.mono,
                  fontSize: 9,
                  letterSpacing: 1,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  color: accent,
                }}>
                {data.stat.label}
              </Text>
            </View>
          </DashedBorder>
        )}
        <MagneticPressable
          onPress={goToCase}
          accessibilityLabel={`See the ${data.role} work`}
          style={{
            backgroundColor: dark ? t.colors.mustard : t.colors.ink,
            borderRadius: 30,
            paddingVertical: 14,
            paddingHorizontal: 22,
          }}>
          <Text
            style={{
              fontFamily: t.fonts.sans.semibold,
              fontSize: 14,
              color: dark ? t.colors.ink : t.colors.cream,
            }}>
            See the work ↗
          </Text>
        </MagneticPressable>
    </View>
  );

  // Always image → body → stats. The source's Story of Strings card carries
  // `reversed` DOM markup but its CSS `order` puts the image back on the left,
  // so every card renders identically; `data.reversed` is intentionally not
  // applied here (no reference page needs a visually reversed layout).
  const ordered = [imageEl, bodyEl, statsEl];

  return (
    <HoverCard
      radius={26}
      lift={-8}
      rotate={-0.6}
      scaleTo={1.012}
      style={{
        backgroundColor: bg,
        borderWidth: 2,
        borderColor: t.colors.ink,
        borderRadius: 26,
        padding: 28,
        gap: 32,
        flexDirection: isRow ? 'row' : 'column',
        alignItems: isRow ? 'center' : 'stretch',
      }}>
      {ordered}
    </HoverCard>
  );
});
