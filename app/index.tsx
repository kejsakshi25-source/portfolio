import { useFocusEffect } from 'expo-router';
import Head from 'expo-router/head';
import { useCallback, useRef } from 'react';
import { type LayoutChangeEvent, type ScrollView, View } from 'react-native';

import { NavBar } from '@/src/components/layout/NavBar';
import { RevealScrollView } from '@/src/components/motion/RevealScrollView';
import { ScrollProvider } from '@/src/components/motion/ScrollProvider';
import { About } from '@/src/components/sections/About';
import { Contact } from '@/src/components/sections/Contact';
import { IntroHero } from '@/src/components/sections/IntroHero';
import { Involvement } from '@/src/components/sections/Involvement';
import { Manifesto } from '@/src/components/sections/Manifesto';
import { MarqueeStrip } from '@/src/components/sections/MarqueeStrip';
import { Passion } from '@/src/components/sections/Passion';
import { Services } from '@/src/components/sections/Services';
import { Work } from '@/src/components/sections/Work';
import { useLanding } from '@/src/data/ContentProvider';
import { navMemory } from '@/src/data/navMemory';

/** The portfolio landing page. */
export default function LandingScreen() {
  const landing = useLanding();
  const scrollRef = useRef<ScrollView>(null);
  const offsets = useRef<Record<string, number>>({});

  // Offset = fixed nav clearance; the section's own top padding adds the rest.
  const scrollToSection = (key: string, animated = true) => {
    const y = offsets.current[key] ?? 0;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - 40), animated });
  };

  /**
   * Records a section's scroll offset for the nav anchors. If the user is
   * returning from a case study, jumps straight to the section they left.
   */
  const anchor = (key: string) => (e: LayoutChangeEvent) => {
    offsets.current[key] = e.nativeEvent.layout.y;
    if (navMemory.returnSection === key) {
      navMemory.returnSection = null;
      requestAnimationFrame(() => scrollToSection(key, false));
    }
  };

  /**
   * On returning from a case study the screen is already mounted, so the
   * `anchor` onLayout handlers don't re-fire. This restores the scroll
   * position when the screen regains focus — offsets are already recorded.
   */
  useFocusEffect(
    useCallback(() => {
      const key = navMemory.returnSection;
      if (key) {
        navMemory.returnSection = null;
        // Delay past the browser's own navigation scroll reset.
        setTimeout(() => scrollToSection(key, false), 120);
      }
    }, []),
  );

  // Rendered in every branch (incl. the static-export pass, where `landing`
  // is null) so the document <title> always lands in the exported HTML.
  const head = (
    <Head>
      <title>Sakshi Kejriwal — sakshi.k / Soft Internet</title>
    </Head>
  );

  // Brief: landing resolves async (synchronously-backed locally, ~1 frame).
  if (!landing) return <View style={{ flex: 1 }}>{head}</View>;

  return (
    <ScrollProvider>
      {head}
      <View style={{ flex: 1 }}>
        <NavBar
          items={[
            { label: 'Home', onPress: () => scrollToSection('top') },
            { label: 'About', onPress: () => scrollToSection('about') },
            { label: 'Services', onPress: () => scrollToSection('services') },
            { label: 'Work', onPress: () => scrollToSection('work') },
            { label: 'Projects', onPress: () => scrollToSection('passion') },
            { label: "Let's talk ↗", cta: true, onPress: () => scrollToSection('contact') },
          ]}
        />

        <RevealScrollView ref={scrollRef} contentContainerStyle={{ paddingBottom: 60 }}>
          <View onLayout={anchor('top')}>
            <IntroHero data={landing.intro} />
          </View>
          <Manifesto headline={landing.manifesto.headline} />
          <MarqueeStrip words={landing.marquee} />
          <View onLayout={anchor('about')}>
            <About data={landing.about} />
          </View>
          <View onLayout={anchor('services')}>
            <Services data={landing.services} />
          </View>
          <View onLayout={anchor('work')}>
            <Work data={landing.work} />
          </View>
          <View onLayout={anchor('passion')}>
            <Passion data={landing.passion} />
          </View>
          <Involvement data={landing.involvement} />
          <View onLayout={anchor('contact')}>
            <Contact data={landing.contact} />
          </View>
        </RevealScrollView>
      </View>
    </ScrollProvider>
  );
}
