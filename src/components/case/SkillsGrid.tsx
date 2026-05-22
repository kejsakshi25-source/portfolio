import { Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { Icon } from '@/src/components/decor/Icon';
import { ResponsiveGrid } from '@/src/components/layout/ResponsiveGrid';
import { Section } from '@/src/components/layout/Section';
import { HoverCard, useHoverProgress } from '@/src/components/motion/HoverCard';
import { ScrollReveal } from '@/src/components/motion/ScrollReveal';
import type { SkillCard as SkillCardData, SkillsSection } from '@/src/data/types';
import type { Theme } from '@/src/theme/ThemeProvider';
import { useTheme } from '@/src/theme/ThemeProvider';

/** "Tools used" pill row — the dark strip below the skill cards. */
function ToolsRow({ tools }: { tools: string[] }) {
  const t = useTheme();
  return (
    <View
      style={{
        backgroundColor: t.colors.ink,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 28,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 8,
        marginTop: 36,
      }}>
      <Text
        style={{
          fontFamily: t.fonts.mono,
          fontSize: 10,
          letterSpacing: 1.2,
          textTransform: 'uppercase',
          color: t.colors.cream,
          opacity: 0.5,
          marginRight: 8,
        }}>
        Tools used
      </Text>
      {tools.map((tool) => (
        <View
          key={tool}
          style={{
            paddingVertical: 7,
            paddingHorizontal: 14,
            borderRadius: 40,
            borderWidth: 1,
            borderColor: 'rgba(245,234,212,0.25)',
            backgroundColor: t.colors.cream,
          }}>
          <Text
            style={{
              fontFamily: t.fonts.mono,
              fontSize: 11,
              letterSpacing: 0.55,
              textTransform: 'uppercase',
              color: t.colors.ink,
            }}>
            {tool}
          </Text>
        </View>
      ))}
    </View>
  );
}

interface SkillPalette {
  bg: string;
  fg: string;
  iconBg: string;
  iconColor: string;
}

/** Per-card color cycle, ported from the source's skill-card nth-child rules. */
function skillPalette(t: Theme): SkillPalette[] {
  return [
    { bg: t.colors.mustard, fg: t.colors.ink, iconBg: t.colors.ink, iconColor: t.colors.mustard },
    { bg: t.colors.brick, fg: t.colors.cream, iconBg: 'rgba(245,234,212,0.18)', iconColor: t.colors.cream },
    { bg: t.colors.ink, fg: t.colors.cream, iconBg: t.colors.brick, iconColor: t.colors.mustard },
    { bg: t.colors.rust, fg: t.colors.cream, iconBg: 'rgba(245,234,212,0.15)', iconColor: t.colors.cream },
    { bg: t.colors.linen, fg: t.colors.ink, iconBg: t.colors.ink, iconColor: t.colors.mustard },
  ];
}

/** Icon tile (52×52) — kicks (rotates + scales) when the parent card is hovered. */
function SkillIcon({ skill, palette }: { skill: SkillCardData; palette: SkillPalette }) {
  const hover = useHoverProgress();
  const style = useAnimatedStyle(() => {
    const h = hover?.value ?? 0;
    return { transform: [{ rotate: `${h * 10}deg` }, { scale: 1 + h * 0.1 }] };
  });

  return (
    <Animated.View
      style={[
        {
          width: 52,
          height: 52,
          borderRadius: 14,
          backgroundColor: palette.iconBg,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 28,
        },
        style,
      ]}>
      <Icon name={skill.icon} size={26} color={palette.iconColor} />
    </Animated.View>
  );
}

function SkillCard({ skill, index }: { skill: SkillCardData; index: number }) {
  const t = useTheme();
  const palette = skillPalette(t)[index % 5];

  return (
    <HoverCard
      radius={t.radii.lg}
      lift={-12}
      rotate={-0.8}
      scaleTo={1.02}
      style={{
        // Fill the (stretched) grid cell so every card in the row is equal height.
        flexGrow: 1,
        alignSelf: 'stretch',
        backgroundColor: palette.bg,
        borderWidth: 2,
        borderColor: t.colors.ink,
        borderRadius: t.radii.lg,
        paddingTop: 32,
        paddingHorizontal: 28,
        paddingBottom: 36,
      }}>
      <SkillIcon skill={skill} palette={palette} />
      <Text
        style={{
          fontFamily: t.fonts.sans.extrabold,
          fontSize: 20,
          letterSpacing: -0.6,
          lineHeight: 21,
          color: palette.fg,
          marginBottom: 10,
        }}>
        {skill.name}
      </Text>
      <Text
        style={{
          fontFamily: t.fonts.mono,
          fontSize: 11,
          letterSpacing: 0.66,
          lineHeight: 16,
          textTransform: 'uppercase',
          color: palette.fg,
          opacity: 0.6,
        }}>
        {skill.tag}
      </Text>
    </HoverCard>
  );
}

/** "What I brought to the table" — skills section block. */
export function SkillsGrid({ data, tools }: { data: SkillsSection; tools?: string[] }) {
  // Source `.skill-cards{display:flex}` `.skill-card{flex:1}` — every card
  // shares one row regardless of count (3, 4, or 5). Desktop matches that;
  // phones/tablets still wrap.
  return (
    <Section num={data.label} heading={data.heading} headingScale="caseHeading">
      <ResponsiveGrid columns={{ mobile: 1, tablet: 2, desktop: data.items.length }}>
        {data.items.map((skill, i) => (
          <ScrollReveal key={skill.id} index={i % 3}>
            <SkillCard skill={skill} index={i} />
          </ScrollReveal>
        ))}
      </ResponsiveGrid>
      {tools && <ToolsRow tools={tools} />}
    </Section>
  );
}
