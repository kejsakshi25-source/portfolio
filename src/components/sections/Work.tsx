import { View } from 'react-native';

import { ProjectCard } from '@/src/components/cards/ProjectCard';
import { Section } from '@/src/components/layout/Section';
import { ScrollReveal } from '@/src/components/motion/ScrollReveal';
import type { LandingContent } from '@/src/data/types';

/** "Real briefs. Real results." — the stacked list of project cards. */
export function Work({ data }: { data: LandingContent['work'] }) {
  return (
    <Section num={data.num} heading={data.heading}>
      <View style={{ gap: 18 }}>
        {data.items.map((item) => (
          <ScrollReveal key={item.slug}>
            <ProjectCard data={item} />
          </ScrollReveal>
        ))}
      </View>
    </Section>
  );
}
