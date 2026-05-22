import { Fragment, useState } from 'react';
import { View } from 'react-native';

import { RevealScrollView } from '@/src/components/motion/RevealScrollView';
import { ScrollProvider } from '@/src/components/motion/ScrollProvider';
import type { PostItem, SectionsCaseStudy } from '@/src/data/types';

import { BackNav } from './BackNav';
import { CaseDivider } from './CaseDivider';
import { CaseFooter } from './CaseFooter';
import { CaseStudyHeader } from './CaseStudyHeader';
import { Lightbox } from './Lightbox';
import { PostGrid } from './PostGrid';
import { RoleCardView } from './RoleCardView';
import { SkillsGrid } from './SkillsGrid';
import { TakeawayBlock } from './TakeawayBlock';

/**
 * The `sections` case-study layout (Story of Strings, Envision X, Hobiz):
 * hero + role card + a sequence of skills / posts / takeaway blocks + footer.
 * Owns the Lightbox opened from the posts grid.
 */
export function SectionCaseStudy({ study }: { study: SectionsCaseStudy }) {
  const [activePost, setActivePost] = useState<PostItem | null>(null);

  return (
    <ScrollProvider>
      <View style={{ flex: 1 }}>
        <BackNav />
        <RevealScrollView contentContainerStyle={{ paddingBottom: 0 }}>
          <CaseStudyHeader
            eyebrow={study.eyebrow}
            title={study.title}
            caseDesc={study.caseDesc}
          />
          <RoleCardView roleCard={study.roleCard} />
          {/* divider after the hero/role block — source `<hr margin-top:80px>` */}
          <CaseDivider topGap={80} />

          {study.sections.map((section, i) => {
            let node = null;
            switch (section.kind) {
              case 'skills':
                node = <SkillsGrid data={section} />;
                break;
              case 'posts':
                node = <PostGrid data={section} onOpenPost={setActivePost} />;
                break;
              case 'takeaway':
                node = <TakeawayBlock data={section} />;
                break;
            }
            return (
              <Fragment key={i}>
                {/* dashed divider between successive blocks */}
                {i > 0 && <CaseDivider />}
                {node}
              </Fragment>
            );
          })}

          <CaseFooter />
        </RevealScrollView>

        <Lightbox post={activePost} onClose={() => setActivePost(null)} />
      </View>
    </ScrollProvider>
  );
}
