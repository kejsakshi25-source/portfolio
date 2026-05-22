import Head from 'expo-router/head';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { BackNav } from '@/src/components/case/BackNav';
import { SectionCaseStudy } from '@/src/components/case/SectionCaseStudy';
import { TabbedCaseStudy } from '@/src/components/case/TabbedCaseStudy';
import { useCaseStudy } from '@/src/data/ContentProvider';
import { useTheme } from '@/src/theme/ThemeProvider';

/** Document title per case-study slug — mirrors the source HTML <title>s. */
const PAGE_TITLES: Record<string, string> = {
  xpert: 'Xpert — Sakshi Kejriwal',
  'story-of-strings': 'Story of Strings — Sakshi Kejriwal',
  'envision-x': 'Envision X — Sakshi Kejriwal',
  hobiz: 'Hobiz — Sakshi Kejriwal',
};

/**
 * Pre-render one static HTML file per case study (`expo export`), so each
 * page ships with its real <title> and `/work/<slug>` resolves as a real
 * file — not just a client-side fallback.
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return Object.keys(PAGE_TITLES).map((slug) => ({ slug }));
}

/** Case study route — dispatches to the section or tabbed layout by slug. */
export default function CaseStudyScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data, loading } = useCaseStudy(slug);
  const t = useTheme();

  const head = (
    <Head>
      <title>{PAGE_TITLES[slug] ?? 'Case study — Sakshi Kejriwal'}</title>
    </Head>
  );

  if (loading) return <View style={{ flex: 1 }}>{head}</View>;

  if (!data) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 8 }}>
        {head}
        <BackNav />
        <Text style={{ fontFamily: t.fonts.sans.extrabold, fontSize: 32, color: t.colors.ink }}>
          Not found
        </Text>
        <Text style={{ fontFamily: t.fonts.sans.regular, fontSize: 14, color: t.colors.rust }}>
          No case study for &quot;{slug}&quot;.
        </Text>
      </View>
    );
  }

  return (
    <>
      {head}
      {data.layout === 'tabbed' ? (
        <TabbedCaseStudy study={data} />
      ) : (
        <SectionCaseStudy study={data} />
      )}
    </>
  );
}
