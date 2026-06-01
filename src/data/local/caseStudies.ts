import type { CaseStudy, MediaPriority, MediaRef } from '../types';
import { type BundledImage, images, video } from './assets';

/** Wrap a bundled image as a local MediaRef, carrying responsive variants. */
const local = (img: BundledImage, alt?: string, priority?: MediaPriority): MediaRef => ({
  kind: 'local',
  module: img.module,
  variants: img.variants,
  width: img.width,
  height: img.height,
  alt,
  priority,
});

/**
 * Case studies — transcribed verbatim from xpert.html, strings.html,
 * envision.html, hobiz.html. Placeholder content from the source
 * (`—K`, "Drop image here", `href="#"`, "fill in stat") is preserved as-is
 * and flagged with `placeholder: true`.
 */
export const caseStudies: CaseStudy[] = [
  /* ═══════════════════════ XPERT — tabbed ═══════════════════════ */
  {
    slug: 'xpert',
    layout: 'tabbed',
    eyebrow: 'Full-time · Jun 2024 →',
    title: [{ text: 'Xpert' }, { text: '.', style: 'serif' }],
    caseDesc:
      "I don't manage one channel at Xpert. I own the whole marketing stack — LinkedIn growth, email campaigns, website copy, creative production, and AI workflow automation, all running at the same time.",
    accent: 'brick',
    role: 'Digital Marketing Strategist',
    skillsIntro: {
      label: '01 · Skills & Tools',
      heading: [{ text: 'The full ' }, { text: 'stack.', style: 'serif' }],
      items: [
        { id: 'skill-linkedin', name: 'LinkedIn Strategy', tag: 'Growth · Content · Scheduling', icon: 'linkedin' },
        { id: 'skill-email', name: 'Email Marketing', tag: 'Campaigns · Nurture · Analytics', icon: 'email' },
        { id: 'skill-content', name: 'Content & Copy', tag: 'Blogs · Case Studies · Web Copy', icon: 'writing' },
        { id: 'skill-creative', name: 'Creative Production', tag: 'Design · Visuals · Brand', icon: 'creatives' },
        { id: 'skill-ai', name: 'AI & Automation', tag: 'Claude · Cowork · Workflows', icon: 'aicode' },
      ],
      tools: ['LinkedIn', 'Apollo', 'Mailwizz', 'WordPress', 'Canva', 'Claude AI', 'Cowork', 'HTML / CSS'],
    },
    workIntro: {
      label: '02 · Work',
      heading: [{ text: "See what I've " }, { text: 'worked on.', style: 'serif' }],
      subline: 'Five tracks, one role. Pick a track below and see the work.',
    },
    tabs: [
      {
        id: 'linkedin',
        label: 'LinkedIn',
        icon: 'linkedin',
        accent: 'brick',
        description:
          "End-to-end LinkedIn content for Xpert's founder — post ideation, writing, design, and scheduling. The channel that drove 60L+ impressions and 238% year-on-year growth.",
        items: [
          {
            id: 'linkedin-1',
            kind: 'linkedin' as const,
            meta: '1.5M+',
            metaLabel: 'Impressions',
            href: 'https://www.linkedin.com/posts/sharadlunia_indias-top-buying-pincodes-report-activity-7254090721790472192-NKXU?utm_source=share&utm_medium=member_desktop&rcm=ACoAAABtPB4BALfhsY2rjJy6SJ6yX7vv4nQx8dY',
            media: local(images.xpertLinkedin[0], "India's Top Buying Pincodes Report"),
          },
          {
            id: 'linkedin-2',
            kind: 'linkedin' as const,
            meta: '1M+',
            metaLabel: 'Impressions',
            href: 'https://www.linkedin.com/posts/sharadlunia_jewellery-buyers-report-activity-7273250821918593024-tlQB?utm_source=share&utm_medium=member_desktop&rcm=ACoAAABtPB4BALfhsY2rjJy6SJ6yX7vv4nQx8dY',
            media: local(images.xpertLinkedin[1], 'Jewellery Buyers Report'),
          },
          {
            id: 'linkedin-3',
            kind: 'linkedin' as const,
            meta: '800K+',
            metaLabel: 'Impressions',
            href: 'https://www.linkedin.com/posts/sharadlunia_apparel-buyers-purchases-report-2025-activity-7283107975764832256-M1RG?utm_source=share&utm_medium=member_desktop&rcm=ACoAAABtPB4BALfhsY2rjJy6SJ6yX7vv4nQx8dY',
            media: local(images.xpertLinkedin[2], 'Apparel Buyers & Purchases Report 2025'),
          },
        ],
      },
      {
        id: 'email',
        label: 'Email',
        icon: 'email',
        accent: 'mustard',
        description:
          'B2B email campaigns run end-to-end using Apollo and Mailwizz — prospect lists, campaign copy, sequencing, segmentation, and performance tracking.',
        process: {
          title: 'How I run a campaign',
          subtitle: 'End-to-end B2B email',
          steps: [
            {
              num: '01',
              name: 'Prospect & segment',
              description:
                'Build targeted lists in Apollo by ICP — industry, title, company size, and intent signals.',
            },
            {
              num: '02',
              name: 'Write the sequence',
              description:
                '4–6 step drip with a cold intro, value hook, follow-ups, and a breakup email.',
            },
            {
              num: '03',
              name: 'Send & track',
              description:
                'Deploy via Mailwizz, monitor open rates, reply rates, and sequence drop-off.',
            },
            {
              num: '04',
              name: 'Optimise & iterate',
              description:
                "A/B test subject lines and CTAs, cut what doesn't convert, double down on what does.",
            },
          ],
          tools: ['Apollo', 'Mailwizz', 'B2B Outreach', 'Drip Sequences'],
        },
        items: [
          {
            id: 'email-1',
            kind: 'sample',
            category: 'Suspect Campaigns',
            title: 'Cold outreach at scale',
            body: "Prospects who have never heard of Xpert. I build the list in Apollo by ICP, write a personalised multi-step sequence, deploy via Apollo, and track open rates, reply rates, and drop-off — end to end.",
            placeholder: true,
          },
          {
            id: 'email-2',
            kind: 'sample',
            category: 'Prospect Campaigns',
            title: 'Nurturing warm leads',
            body: "People who have already engaged — opened an email, reacted to a LinkedIn post, or been referred in. They get moved into the prospect list and receive product-focused sequences designed to convert interest into a conversation.",
            placeholder: true,
          },
        ],
      },
      {
        id: 'writing',
        label: 'Writing',
        icon: 'writing',
        accent: 'ink',
        description:
          'Website copy, SEO blogs, landing pages, and case studies — written to rank and convert, with the thinking shown, not just the output.',
        items: [
          {
            id: 'writing-1',
            kind: 'blog',
            category: 'Blog',
            title: 'SEO blogs for Xpert.',
            body: 'Articles built around the reports Xpert publishes on LinkedIn — turning data and campaign insights into long-form content that ranks on search.',
            site: 'xpert.chat',
            href: 'https://blog.xpert.chat/',
          },
          {
            id: 'writing-2',
            kind: 'case-study',
            category: 'Case Study',
            title: 'Case studies for Xpert.',
            body: "In-depth write-ups covering the client's challenge, Xpert's approach, and the measurable outcome — structured to build trust with prospects who are still evaluating the product.",
            site: 'xpert.chat',
            href: 'https://www.xpert.chat/case-study.php',
          },
        ],
      },
      {
        id: 'aicode',
        label: 'AI',
        icon: 'aicode',
        accent: 'ink',
        description:
          'AI tools built into the day-to-day — from running the Xpert website to automating content workflows with Claude, Cowork, and Gemini.',
        items: [
          {
            id: 'ai-1',
            kind: 'ai' as const,
            category: 'Website · Live',
            title: 'xpert.chat',
            body: "Owns and maintains Xpert's website end to end — copy, layout, page updates, and everything in between. Built and live.",
            tags: ['Vibe Coding', 'Claude Design'],
            icon: 'globe',
            href: 'https://xpert.chat',
            status: 'live' as const,
          },
          {
            id: 'ai-2',
            kind: 'ai' as const,
            category: 'UI / UX · In Progress',
            title: 'Xpert App Dashboard',
            body: "Designing the UI for Xpert's internal app dashboard — translating product requirements into a working interface. Screenshot dropping in soon.",
            tags: ['Vibe Coding', 'Claude Design'],
            icon: 'grid',
            status: 'wip' as const,
          },
          {
            id: 'ai-3',
            kind: 'ai' as const,
            category: 'AI Workflows',
            title: 'AI across the stack',
            body: 'Using Claude for copy and email sequences, Gemini for image generation, and Cowork to automate the repetitive parts of the marketing stack — drafts, pipelines, and systems that run in the background.',
            tags: ['Claude', 'Gemini', 'OpenAI', 'Cowork', 'Skills'],
            icon: 'automation',
          },
        ],
      },
    ],
  },

  /* ═══════════════════ STORY OF STRINGS — sections ═══════════════════ */
  {
    slug: 'story-of-strings',
    layout: 'sections',
    eyebrow: 'Freelance · Dec 2025 →',
    title: [{ text: 'Story of ' }, { text: 'Strings.', style: 'serif' }],
    caseDesc:
      'A slow-fashion, hand-embroidery brand rooted in patience and craft. They came to me in their pre-launch phase with a product and a vision — but no Instagram presence. I built it from scratch: the visual identity, the feed, and every word.',
    accent: 'rust',
    roleCard: {
      label: 'My role',
      title: 'Social Media Marketing',
      sub: 'Visual storytelling & brand voice',
      bullets: [
        'Built the Instagram visual identity from scratch',
        'Designed 10+ Instagram posts — ideation, layout & final creatives in Canva',
        "Wrote every caption to match the brand's slow, intentional tone",
        'Created a content framework for the pre-launch rollout',
      ],
    },
    sections: [
      {
        kind: 'skills',
        label: '02 · Skills',
        heading: [{ text: 'What I brought ' }, { text: 'to the table.', style: 'serif' }],
        items: [
          { id: 'instagram-content', name: 'Instagram Content', tag: 'Reels · Carousels · Stories', icon: 'instagram' },
          { id: 'canva', name: 'Canva', tag: 'Design · Layout · Creatives', icon: 'canva' },
          { id: 'caption-writing', name: 'Caption Writing', tag: 'Brand voice · Tone · Copy', icon: 'caption' },
          { id: 'content-calendars', name: 'Content Calendars', tag: 'Planning · Scheduling · Rollout', icon: 'calendar' },
        ],
      },
      {
        kind: 'posts',
        label: '03 · The work',
        heading: [{ text: 'The posts. ' }, { text: 'All of them.', style: 'serif' }],
        hint: 'Click any post to open it ↗',
        items: [
          {
            id: 'fruits-embroidery',
            type: 'carousel',
            caption: 'Fruits Embroidery',
            cover: local(images.sos.fruitsEmbroidery[0], 'Fruits Embroidery'),
            slides: images.sos.fruitsEmbroidery.map((m) => local(m)),
          },
          {
            id: 'coming-soon',
            type: 'image',
            caption: 'Coming Soon',
            cover: local(images.sos.comingSoon, 'Coming Soon'),
          },
          {
            id: 'things-ai-cant-do',
            type: 'video',
            caption: "Things AI Can't Do",
            cover: { kind: 'placeholder', label: 'Reel' },
            video: { kind: 'local', module: video.thingsAiCantDo, alt: "Things AI Can't Do" },
          },
          {
            id: 'khaka-designs',
            type: 'carousel',
            caption: 'Khaka Designs',
            cover: local(images.sos.khakaDesigns[0], 'Khaka Designs'),
            slides: images.sos.khakaDesigns.map((m) => local(m)),
          },
          {
            id: 'desk-to-dinner',
            type: 'image',
            caption: 'Desk to Dinner',
            cover: local(images.sos.deskToDinner, 'Desk to Dinner'),
          },
          {
            id: 'shapes-embroidery',
            type: 'carousel',
            caption: 'Shapes Embroidery',
            cover: local(images.sos.shapesEmbroidery[0], 'Shapes Embroidery'),
            slides: images.sos.shapesEmbroidery.map((m) => local(m)),
          },
          {
            id: 'embroidered-panel',
            type: 'image',
            caption: 'Embroidered Panel',
            cover: local(images.sos.embroideredPanel, 'Embroidered Panel'),
          },
          {
            id: 'types-of-personality',
            type: 'carousel',
            caption: 'Types of Personality',
            cover: local(images.sos.typesOfPersonality[0], 'Types of Personality'),
            slides: images.sos.typesOfPersonality.map((m) => local(m)),
          },
        ],
      },
    ],
  },

  /* ═══════════════════ ENVISION X — sections ═══════════════════ */
  {
    slug: 'envision-x',
    layout: 'sections',
    eyebrow: 'Internship · Nov 2023 – Feb 2024',
    title: [{ text: 'Envision ' }, { text: 'X.', style: 'serif' }],
    caseDesc:
      'My first real taste of managing multiple clients at once. Five of them, to be exact — content calendars, influencer outreach, Canva graphics, and even some Shopify. A lot happening at the same time, and honestly? I loved the chaos.',
    accent: 'mustard',
    roleCard: {
      label: 'My role',
      title: 'Social Media Strategist',
      sub: 'Multi-client management',
      bullets: [
        'Managed social media presence for 5 clients simultaneously',
        'Built and maintained content calendars tailored to each brand',
        'Coordinated influencer outreach campaigns end-to-end',
        "Designed Canva creatives matched to each brand's visual identity",
        'Supported Shopify store management alongside content creation',
      ],
    },
    sections: [
      {
        kind: 'skills',
        label: '02 · Skills',
        heading: [{ text: 'What I brought ' }, { text: 'to the table.', style: 'serif' }],
        items: [
          { id: 'instagram-content', name: 'Instagram Content', tag: 'Reels · Carousels · Stories', icon: 'instagram' },
          { id: 'content-calendars', name: 'Content Calendars', tag: 'Planning · Scheduling · Multi-brand', icon: 'calendar' },
          { id: 'canva', name: 'Canva', tag: 'Design · Layout · Creatives', icon: 'canva' },
          { id: 'influencer-outreach', name: 'Influencer Outreach', tag: 'Research · Coordination · Campaigns', icon: 'influencer' },
          { id: 'shopify', name: 'Shopify', tag: 'Store setup · Product pages', icon: 'shopify' },
        ],
      },
      {
        kind: 'takeaway',
        label: '03 · The takeaway',
        heading: [{ text: 'What ' }, { text: 'stuck with me.', style: 'serif' }],
        quote: [
          { text: 'Managing five brands at once taught me something school never did — how to hold ' },
          { text: 'five different voices', style: 'serif' },
          { text: ' in your head without losing your own.' },
        ],
        strip: {
          heading: 'The Five Industries I Worked Across',
          boxes: [
            { id: 'bakery', icon: 'send', sector: 'Food & Lifestyle', name: 'Bakery', color: '#c84e3d' },
            { id: 'wealth', icon: 'trending', sector: 'Finance', name: 'Wealth Management', color: '#2b4038' },
            { id: 'jewelry', icon: 'star', sector: 'Luxury & Fashion', name: 'Jewelry', color: '#8b6914' },
            { id: 'skincare', icon: 'shield', sector: 'Beauty & Wellness', name: 'Skincare', color: '#7d4e57' },
            { id: 'hotel', icon: 'building', sector: 'Hospitality', name: 'Hotel', color: '#2a3b4c' },
          ],
        },
      },
    ],
  },

  /* ═══════════════════ HOBIZ — sections ═══════════════════ */
  {
    slug: 'hobiz',
    layout: 'sections',
    eyebrow: 'Internship · Mar – May 2022',
    title: [{ text: 'Ho' }, { text: 'biz.', style: 'serif' }],
    caseDesc:
      'Where it all started. My first internship, my first real brief — and the first time I had to figure out what it actually means to create content for a brand, and not just for myself.',
    accent: 'brick',
    roleCard: {
      label: 'My role',
      title: 'Social Media Marketing',
      sub: 'First internship · Entry level',
      bullets: [
        "Created Instagram content from scratch for the brand's presence",
        "Designed posts in Canva aligned to the brand's look and feel",
        'Wrote captions, finding the right brand voice for the first time',
        'Learned how real briefs, feedback cycles, and deadlines work',
      ],
    },
    sections: [
      {
        kind: 'skills',
        label: '02 · Skills',
        heading: [{ text: 'What I was ' }, { text: 'learning to do.', style: 'serif' }],
        items: [
          { id: 'instagram-content', name: 'Instagram Content', tag: 'Posts · Feed · Brand presence', icon: 'instagram' },
          { id: 'canva', name: 'Canva', tag: 'Design · Layout · Creatives', icon: 'canva' },
          { id: 'caption-writing', name: 'Caption Writing', tag: 'Brand voice · Tone · Copy', icon: 'caption' },
        ],
      },
      {
        kind: 'takeaway',
        label: '03 · The takeaway',
        heading: [{ text: 'What ' }, { text: 'it also taught me?', style: 'serif' }],
        quote: [
          { text: "The first time you make something for a brand and not for yourself — that's when you find out if you actually " },
          { text: 'have something', style: 'serif' },
          { text: ' to say.' },
        ],
        strip: {
          heading: 'The Four Platforms I Learned to Work Across',
          boxes: [
            { id: 'facebook', icon: 'facebook', sector: 'Community · Posts', name: 'Facebook', color: '#1a4b8a' },
            { id: 'instagram', icon: 'instagram', sector: 'Visual · Feed', name: 'Instagram', color: '#6b2d6b' },
            { id: 'twitter', icon: 'twitter', sector: 'Micro-copy · Trends', name: 'Twitter', color: '#1a3a5c' },
            { id: 'pinterest', icon: 'pinterest', sector: 'Discovery · Pins', name: 'Pinterest', color: '#8b1a1a' },
          ],
        },
      },
    ],
  },
];
