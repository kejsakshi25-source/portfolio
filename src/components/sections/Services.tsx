import { ServiceCard } from '@/src/components/cards/ServiceCard';
import { Section } from '@/src/components/layout/Section';
import { ResponsiveGrid } from '@/src/components/layout/ResponsiveGrid';
import { ScrollReveal } from '@/src/components/motion/ScrollReveal';
import type { LandingContent } from '@/src/data/types';

/** "Here's what I actually do" — the six-service grid. */
export function Services({ data }: { data: LandingContent['services'] }) {
  return (
    <Section num={data.num} heading={data.heading}>
      <ResponsiveGrid columns={{ mobile: 1, tablet: 2, desktop: 3 }}>
        {data.items.map((item, i) => (
          <ScrollReveal key={item.id} index={i % 3}>
            <ServiceCard data={item} index={i} />
          </ScrollReveal>
        ))}
      </ResponsiveGrid>
    </Section>
  );
}
