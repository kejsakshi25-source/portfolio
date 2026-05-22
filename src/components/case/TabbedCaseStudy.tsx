import { useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ResponsiveGrid } from '@/src/components/layout/ResponsiveGrid';
import { Section } from '@/src/components/layout/Section';
import { RevealScrollView } from '@/src/components/motion/RevealScrollView';
import { ScrollProvider } from '@/src/components/motion/ScrollProvider';
import { ScrollReveal } from '@/src/components/motion/ScrollReveal';
import type {
  CaseCard,
  CaseTab,
  ProcessBlock,
  TabbedCaseStudy as TabbedCaseStudyData,
} from '@/src/data/types';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useTheme } from '@/src/theme/ThemeProvider';

import { BackNav } from './BackNav';
import { CaseCardView, ProcessCard } from './CaseCardView';
import { CaseDivider } from './CaseDivider';
import { CaseFooter } from './CaseFooter';
import { CaseStudyHeader } from './CaseStudyHeader';
import { SkillsGrid } from './SkillsGrid';
import { TabBar } from './TabBar';

/** Email tab — process card beside the sample cards. */
function EmailLayout({ process, samples }: { process: ProcessBlock; samples: CaseCard[] }) {
  const bp = useBreakpoint();
  const isRow = bp === 'desktop' || bp === 'wide';
  return (
    <View
      style={{
        flexDirection: isRow ? 'row' : 'column',
        gap: 18,
        alignItems: isRow ? 'flex-start' : 'stretch',
      }}>
      <View style={{ flex: isRow ? 1 : undefined }}>
        <ProcessCard process={process} />
      </View>
      <View style={{ flex: isRow ? 1 : undefined, gap: 18 }}>
        {samples.map((sample) => (
          <CaseCardView key={sample.id} card={sample} />
        ))}
      </View>
    </View>
  );
}

/** The content panel for the active tab — fades in on tab change. */
function TabPanel({ tab }: { tab: CaseTab }) {
  const t = useTheme();
  return (
    <Animated.View key={tab.id} entering={FadeIn.duration(280)}>
      <Section>
        <Text
          style={{
            fontFamily: t.fonts.sans.regular,
            fontSize: 17,
            lineHeight: 28,
            color: t.colors.ink,
            opacity: 0.65,
            marginBottom: 28,
            maxWidth: 780,
          }}>
          {tab.description}
        </Text>
        {tab.process ? (
          <EmailLayout process={tab.process} samples={tab.items} />
        ) : (
          <ResponsiveGrid columns={{ mobile: 1, tablet: 2, desktop: 3 }}>
            {tab.items.map((item, i) => (
              <ScrollReveal key={item.id} index={i % 3}>
                <CaseCardView card={item} />
              </ScrollReveal>
            ))}
          </ResponsiveGrid>
        )}
      </Section>
    </Animated.View>
  );
}

/**
 * The `tabbed` case-study layout (Xpert): hero + work intro + a sticky tab
 * bar switching between five content panels.
 */
export function TabbedCaseStudy({ study }: { study: TabbedCaseStudyData }) {
  const t = useTheme();
  const [activeId, setActiveId] = useState(study.tabs[0].id);
  const activeTab = study.tabs.find((tab) => tab.id === activeId) ?? study.tabs[0];

  return (
    <ScrollProvider>
      <View style={{ flex: 1 }}>
        <BackNav />
        {/* TabBar is index 4 now: header, divider, skillsGrid, work-intro Section, TabBar. */}
        <RevealScrollView stickyHeaderIndices={[4]} contentContainerStyle={{ paddingBottom: 0 }}>
          <CaseStudyHeader
            eyebrow={study.eyebrow}
            title={study.title}
            role={study.role}
            caseDesc={study.caseDesc}
          />
          {/* divider after the hero — source `<hr margin-top:80px>` */}
          <CaseDivider topGap={80} />
          {study.skillsIntro && (
            <SkillsGrid
              data={{
                kind: 'skills',
                label: study.skillsIntro.label,
                heading: study.skillsIntro.heading,
                items: study.skillsIntro.items,
              }}
              tools={study.skillsIntro.tools}
            />
          )}
          <Section
            num={study.workIntro.label}
            heading={study.workIntro.heading}
            headingScale="caseHeading">
            <Text
              style={{
                fontFamily: t.fonts.sans.regular,
                fontSize: 17,
                lineHeight: 27,
                color: t.colors.ink,
                opacity: 0.55,
                marginTop: 8,
              }}>
              {study.workIntro.subline}
            </Text>
          </Section>
          <TabBar tabs={study.tabs} activeId={activeId} onSelect={setActiveId} />
          <TabPanel tab={activeTab} />
          <CaseFooter />
        </RevealScrollView>
      </View>
    </ScrollProvider>
  );
}
