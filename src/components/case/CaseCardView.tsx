import React, { type ReactNode } from 'react';
import { Linking, Text, View } from 'react-native';

import { DashedBorder } from '@/src/components/decor/DashedBorder';
import { Icon } from '@/src/components/decor/Icon';
import { RemoteImage } from '@/src/components/media/RemoteImage';
import { HoverCard } from '@/src/components/motion/HoverCard';
import type { CaseCard, ProcessBlock } from '@/src/data/types';
import { useTheme } from '@/src/theme/ThemeProvider';

/** Small "↗" link label — the source's card links are placeholder anchors. */
function LinkLabel({ text, color }: { text: string; color: string }) {
  const t = useTheme();
  return (
    <Text
      style={{
        fontFamily: t.fonts.mono,
        fontSize: 11,
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        color,
      }}>
      {text}
    </Text>
  );
}

/* ── LinkedIn post card ── */
const LinkedInCard = React.memo(function LinkedInCard({ card }: { card: CaseCard }) {
  const t = useTheme();
  return (
    <View
      style={{
        flexGrow: 1,
        borderWidth: 2,
        borderColor: t.colors.ink,
        borderRadius: t.radii.lg,
        backgroundColor: t.colors.cream,
        overflow: 'hidden',
      }}>
      {card.media && (
        <RemoteImage
          media={card.media}
          placeholderIcon="linkedin"
          style={{ width: '100%', aspectRatio: 4 / 3 }}
        />
      )}
      <View style={{ padding: 22 }}>
        <Text style={{ fontFamily: t.fonts.display, fontSize: 42, color: t.colors.brick }}>
          {card.meta}
        </Text>
        <Text
          style={{
            fontFamily: t.fonts.mono,
            fontSize: 9,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: t.colors.rust,
            marginBottom: 12,
          }}>
          {card.metaLabel}
        </Text>
        <Text
          style={{
            fontFamily: t.fonts.sans.regular,
            fontSize: 14,
            lineHeight: 21,
            color: t.colors.ink,
            marginBottom: 16,
          }}>
          {card.body}
        </Text>
        <LinkLabel text="View post ↗" color={t.colors.brick} />
      </View>
    </View>
  );
});

/* ── Email sample card ── */
const SampleCard = React.memo(function SampleCard({ card }: { card: CaseCard }) {
  const t = useTheme();
  return (
    <View
      style={{
        flexGrow: 1,
        borderWidth: 2,
        borderColor: t.colors.ink,
        borderRadius: t.radii.lg,
        backgroundColor: t.colors.cream,
        padding: 36,
        gap: 8,
      }}>
      <View
        style={{
          alignSelf: 'flex-start',
          backgroundColor: t.colors.ink,
          borderRadius: 20,
          paddingVertical: 4,
          paddingHorizontal: 12,
        }}>
        <Text
          style={{
            fontFamily: t.fonts.mono,
            fontSize: 10,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: t.colors.cream,
          }}>
          {card.category}
        </Text>
      </View>
      <Text style={{ fontFamily: t.fonts.sans.extrabold, fontSize: 22, color: t.colors.ink }}>
        {card.title}
      </Text>
      <Text style={{ fontFamily: t.fonts.sans.regular, fontSize: 16, lineHeight: 28, color: t.colors.ink }}>
        {card.body}
      </Text>
    </View>
  );
});

/* ── Writing card (blog / case study) ── */
const WriteCard = React.memo(function WriteCard({ card }: { card: CaseCard }) {
  const t = useTheme();
  const isCase = card.kind === 'case-study';
  const bg = isCase ? t.colors.ink : t.colors.cream;
  const fg = isCase ? t.colors.cream : t.colors.ink;

  return (
    <View
      style={{
        flexGrow: 1,
        borderWidth: 2,
        borderColor: t.colors.ink,
        borderRadius: t.radii.lg,
        backgroundColor: bg,
        padding: 26,
        gap: 10,
      }}>
      <View
        style={{
          alignSelf: 'flex-start',
          backgroundColor: isCase ? t.colors.mustard : t.colors.ink,
          borderRadius: 20,
          paddingVertical: 4,
          paddingHorizontal: 12,
        }}>
        <Text
          style={{
            fontFamily: t.fonts.mono,
            fontSize: 10,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: isCase ? t.colors.ink : t.colors.cream,
          }}>
          {card.category}
        </Text>
      </View>
      {isCase && card.meta && (
        <View>
          <Text style={{ fontFamily: t.fonts.display, fontSize: 36, color: t.colors.mustard }}>
            {card.meta}
          </Text>
          <Text
            style={{
              fontFamily: t.fonts.mono,
              fontSize: 9,
              letterSpacing: 1,
              textTransform: 'uppercase',
              color: 'rgba(245,234,212,0.4)',
            }}>
            {card.metaLabel}
          </Text>
        </View>
      )}
      <Text style={{ fontFamily: t.fonts.sans.extrabold, fontSize: 22, color: fg }}>
        {card.title}
      </Text>
      <Text
        style={{
          fontFamily: t.fonts.sans.regular,
          fontSize: 16,
          lineHeight: 28,
          color: fg,
          opacity: 0.65,
        }}>
        {card.body}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8,
          paddingTop: 14,
          borderTopWidth: 1,
          borderColor: isCase ? 'rgba(245,234,212,0.12)' : 'rgba(45,26,20,0.12)',
        }}>
        <Text
          style={{
            fontFamily: t.fonts.mono,
            fontSize: 10,
            textTransform: 'uppercase',
            color: fg,
            opacity: 0.4,
          }}>
          {card.site}
        </Text>
        <LinkLabel
          text={card.kind === 'blog' ? 'View blogs ↗' : 'View case studies ↗'}
          color={isCase ? t.colors.mustard : t.colors.brick}
        />
      </View>
    </View>
  );
});

/* ── Creative placeholder card ── */
const CreativeCard = React.memo(function CreativeCard({ card }: { card: CaseCard }) {
  const t = useTheme();
  return (
    <DashedBorder
      radius={t.radii.lg}
      style={{ flexGrow: 1, borderRadius: t.radii.lg, overflow: 'hidden' }}>
      {card.media && (
        <RemoteImage
          media={card.media}
          placeholderIcon={card.icon}
          style={{ width: '100%', aspectRatio: 4 / 3 }}
        />
      )}
      <View style={{ padding: 18 }}>
        <Text style={{ fontFamily: t.fonts.sans.bold, fontSize: 14, color: t.colors.ink, opacity: 0.4 }}>
          {card.title}
        </Text>
        <Text
          style={{
            fontFamily: t.fonts.mono,
            fontSize: 10,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
            color: t.colors.ink,
            opacity: 0.3,
            marginTop: 4,
          }}>
          {card.body}
        </Text>
      </View>
    </DashedBorder>
  );
});

/* ── AI / code card ── */
const AiCard = React.memo(function AiCard({ card }: { card: CaseCard }) {
  const t = useTheme();
  return (
    <View
      style={{
        flexGrow: 1,
        borderWidth: 2,
        borderColor: t.colors.ink,
        borderRadius: t.radii.lg,
        backgroundColor: t.colors.ink,
        padding: 30,
        gap: 12,
      }}>
      {card.icon && (
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: 'rgba(245,234,212,0.08)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name={card.icon} size={22} color={t.colors.mustard} />
        </View>
      )}
      {(() => {
        const baseStyle = {
          fontFamily: t.fonts.mono,
          fontSize: 9,
          letterSpacing: 1.2,
          textTransform: 'uppercase' as const,
        };
        const parts = card.category?.split(' · ') ?? [];
        if (parts.length === 2) {
          const statusColor = card.status === 'live' ? '#7ecf8e' : t.colors.mustard;
          return (
            <Text style={{ ...baseStyle, color: t.colors.mustard }}>
              {parts[0]}
              <Text style={{ color: t.colors.mustard }}> · </Text>
              <Text style={{ color: statusColor }}>{parts[1]}</Text>
            </Text>
          );
        }
        return <Text style={{ ...baseStyle, color: t.colors.mustard }}>{card.category}</Text>;
      })()}
      <Text style={{ fontFamily: t.fonts.sans.extrabold, fontSize: 20, color: t.colors.cream }}>
        {card.title}
      </Text>
      <Text
        style={{
          fontFamily: t.fonts.sans.regular,
          fontSize: 14,
          lineHeight: 22,
          color: t.colors.cream,
          opacity: 0.5,
        }}>
        {card.body}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 12,
          paddingTop: 16,
          borderTopWidth: 1,
          borderColor: 'rgba(245,234,212,0.08)',
        }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {(card.tags ?? []).map((tag) => (
            <View
              key={tag}
              style={{
                borderWidth: 1,
                borderColor: 'rgba(245,234,212,0.15)',
                borderRadius: 12,
                paddingVertical: 3,
                paddingHorizontal: 9,
              }}>
              <Text
                style={{
                  fontFamily: t.fonts.mono,
                  fontSize: 9,
                  textTransform: 'uppercase',
                  color: 'rgba(245,234,212,0.6)',
                }}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
        {card.href && card.href !== '#' && <LinkLabel text="View ↗" color={t.colors.mustard} />}
      </View>
    </View>
  );
});

/** Renders a CaseCard according to its kind, wrapped in the shared hover lift. */
export const CaseCardView = React.memo(function CaseCardView({ card }: { card: CaseCard }) {
  const t = useTheme();
  let inner: ReactNode = null;
  switch (card.kind) {
    case 'linkedin':
      inner = <LinkedInCard card={card} />;
      break;
    case 'sample':
      inner = <SampleCard card={card} />;
      break;
    case 'blog':
    case 'case-study':
      inner = <WriteCard card={card} />;
      break;
    case 'creative':
      inner = <CreativeCard card={card} />;
      break;
    case 'ai':
      inner = <AiCard card={card} />;
      break;
  }
  if (!inner) return null;

  // The source's writing / AI / LinkedIn cards are anchors. Make the card
  // pressable whenever it carries an href — open real URLs, no-op on the
  // source's placeholder `#` links (keeps the click affordance, no broken nav).
  const onPress = card.href
    ? () => {
        if (card.href && card.href !== '#') Linking.openURL(card.href);
      }
    : undefined;

  return (
    <HoverCard
      radius={t.radii.lg}
      lift={-10}
      rotate={-0.5}
      scaleTo={1.015}
      shadow={card.kind !== 'creative'}
      onPress={onPress}
      accessibilityLabel={card.title}
      // Fill the (stretched) grid cell so every card in the row is equal height.
      style={{ flexGrow: 1, alignSelf: 'stretch' }}>
      {inner}
    </HoverCard>
  );
});

/** The "How I run a campaign" process card in the Email tab. */
export const ProcessCard = React.memo(function ProcessCard({ process }: { process: ProcessBlock }) {
  const t = useTheme();
  return (
    <View style={{ backgroundColor: t.colors.ink, borderRadius: t.radii.lg, padding: 36 }}>
      <Text style={{ fontFamily: t.fonts.sans.extrabold, fontSize: 22, color: t.colors.cream }}>
        {process.title}
      </Text>
      <Text
        style={{
          fontFamily: t.fonts.mono,
          fontSize: 10,
          letterSpacing: 1,
          textTransform: 'uppercase',
          color: 'rgba(245,234,212,0.35)',
          marginBottom: 22,
        }}>
        {process.subtitle}
      </Text>
      {process.steps.map((step, i) => (
        <View
          key={step.num}
          style={{
            flexDirection: 'row',
            gap: 16,
            paddingVertical: 14,
            borderBottomWidth: i === process.steps.length - 1 ? 0 : 1,
            borderColor: 'rgba(245,234,212,0.08)',
          }}>
          <Text style={{ fontFamily: t.fonts.display, fontSize: 22, color: t.colors.mustard }}>
            {step.num}
          </Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: t.fonts.sans.bold, fontSize: 15, color: t.colors.cream }}>
              {step.name}
            </Text>
            <Text
              style={{
                fontFamily: t.fonts.sans.regular,
                fontSize: 13,
                lineHeight: 20,
                color: t.colors.cream,
                opacity: 0.5,
              }}>
              {step.description}
            </Text>
          </View>
        </View>
      ))}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 22 }}>
        {process.tools.map((tool) => (
          <View
            key={tool}
            style={{
              borderWidth: 1,
              borderColor: 'rgba(245,234,212,0.2)',
              borderRadius: 20,
              paddingVertical: 5,
              paddingHorizontal: 12,
            }}>
            <Text
              style={{
                fontFamily: t.fonts.mono,
                fontSize: 10,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                color: 'rgba(245,234,212,0.65)',
              }}>
              {tool}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
});
