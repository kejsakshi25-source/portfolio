import type { LandingContent, MediaPriority, MediaRef } from '../types';
import { type BundledImage, images } from './assets';

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
 * Landing page content — transcribed verbatim from the source `index.html`.
 * Inline accents (`<em>`, `.pop`, `.blob`, `.squig`, `.lora`) are captured
 * as TextSegment styles; plain text stays as plain strings.
 */
export const landing: LandingContent = {
  intro: {
    polaroid: {
      image: local(images.personal, 'Sakshi Kejriwal', 'high'),
      caption: 'yours, sakshi ✶',
    },
    name: [
      { text: 'Sakshi\n' },
      { text: 'Kejriwal.', style: 'serif' },
    ],
    bio: [
      { text: "Hi, I'm a " },
      { text: 'digital marketer', style: 'highlight' },
      { text: ' & ' },
      { text: 'content strategist', style: 'highlightAlt' },
      {
        text: '. I write, I design, I plan — and marketing happens to be the one place where being creative and being analytical feel like the same job, which, two years in, is still the part I love most.',
      },
    ],
    note: 'welcome to the portfolio ↓',
  },

  manifesto: {
    headline: [
      { text: 'Things ' },
      { text: 'people', style: 'squig' },
      { text: '\n' },
      { text: 'stop', style: 'pop' },
      { text: ' scrolling for,\n' },
      { text: 'written and ' },
      { text: 'designed', style: 'blob' },
      { text: '\nby me.' },
    ],
  },

  marquee: ['Social strategy', 'Content design', 'Copywriting', 'AI workflows', 'Email campaigns'],

  about: {
    num: '01 · About',
    heading: [
      { text: 'So, ' },
      { text: 'who', style: 'serif' },
      { text: ' ' },
      { text: 'am I,', style: 'pop' },
      { text: '\nreally.' },
    ],
    paragraphs: [
      [
        { text: "Two years in, and still learning something new every day. I've worked across " },
        { text: 'LinkedIn strategy', style: 'highlight' },
        { text: ', ' },
        { text: 'Instagram content', style: 'highlight' },
        { text: ', ' },
        { text: 'copy', style: 'highlight' },
        {
          text: ', and email campaigns — and somewhere along the way started building AI automations to make it all run faster.',
        },
      ],
      "Kolkata born, always curious, and cannot help making things look and sound nicer than they have to. Studied at St. Xavier's, got very into club work, and found my way into digital marketing in the middle of all of it. Looking back, it makes complete sense — it's the one place where being creative and being analytical feel like the same thing.",
    ],
    pullQuote:
      '"I cannot help making things look and sound a little nicer than they technically need to."',
    card: {
      tag: '★ The receipts',
      title: 'Quick facts',
      facts: [
        { label: 'Currently', value: 'Xpert · full-time' },
        { label: 'Based', value: 'Kolkata, India' },
        { label: 'Schooled', value: "St. Xavier's College" },
        { label: 'Experience', value: '2+ years' },
        { label: 'Specialty', value: 'Social media & content strategy' },
        { label: 'Looking for', value: 'Full-time / hybrid' },
      ],
    },
  },

  services: {
    num: '02 · Services',
    heading: [
      { text: "Here's what I " },
      { text: 'actually', style: 'serif' },
      { text: ' do.' },
    ],
    items: [
      {
        id: 'social',
        category: 'Social',
        title: 'Social media management',
        body: "End-to-end profile management. Calendars, scheduling, performance tracking, and a brand voice that doesn't go missing on Tuesdays.",
        tools: ['LinkedIn', 'Instagram', 'Native'],
        order: 1,
      },
      {
        id: 'content',
        category: 'Content',
        title: 'Content creation',
        body: 'Scroll-stopping posts built in Canva — ideation, layout, captions, final creatives. On-brand, but built specifically to be saved and shared.',
        tools: ['Canva', 'Instagram', 'LinkedIn'],
        order: 2,
      },
      {
        id: 'strategy',
        category: 'Strategy',
        title: 'Content strategy',
        body: 'What to post, when, and why — driven by performance data, audience behaviour, and brand goals. A plan that compounds.',
        tools: ['Analytics', 'Reporting', 'Brand'],
        order: 3,
      },
      {
        id: 'copy',
        category: 'Copy',
        title: 'Copywriting',
        body: 'Website copy, SEO blogs on WordPress, case studies, and captions written to convert, not just fill space. Human first, every time.',
        tools: ['Website', 'SEO', 'WordPress'],
        order: 4,
      },
      {
        id: 'ai',
        category: 'AI',
        title: 'AI-assisted workflows',
        body: 'Custom Claude Skills and Cowork automations that cut content, case study, email, and research turnaround by ~50%.',
        tools: ['Claude', 'Cowork', 'Skills'],
        order: 5,
      },
      {
        id: 'email',
        category: 'Email',
        title: 'Email marketing',
        body: 'Prospect lists, segmentation, campaign copy, and optimisation — running B2B email end-to-end via Apollo and Mailwizz.',
        tools: ['Apollo', 'Mailwizz', 'Lists'],
        order: 6,
      },
    ],
  },

  work: {
    num: '03 · Work',
    heading: [
      { text: 'Real briefs. ' },
      { text: 'Real results.', style: 'lora' },
    ],
    items: [
      {
        slug: 'xpert',
        tag: 'Full-time · Jun 2024 →',
        title: 'Xpert.',
        role: 'Digital marketing strategist',
        description:
          "I run the marketing stack at Xpert — the founder's LinkedIn end-to-end, 8+ website pages, 30+ case studies, 15+ B2B email campaigns, 10+ SEO blogs on WordPress, and 5+ custom Claude AI Skills that cut turnaround by ~50%.",
        image: local(images.logos.xpert, 'Xpert', 'high'),
        stat: { value: '60L+', label: 'Impressions · Zero ad spend' },
        variant: 'cream',
        order: 1,
      },
      {
        slug: 'story-of-strings',
        tag: 'Freelance · Dec 2025 →',
        title: 'Story of Strings.',
        role: 'Social media marketing',
        description:
          'A slow-fashion, hand-embroidery brand in its pre-launch phase. I built the Instagram visual identity from scratch — 10+ feed posts, ideation, layout, caption writing, and final creatives in Canva.',
        image: local(images.logos.storyOfStrings, 'Story of Strings'),
        stat: { value: '10+', label: 'pre-launch posts' },
        variant: 'dark',
        reversed: true,
        order: 2,
      },
      {
        slug: 'envision-x',
        tag: 'Internship · Nov 2023 – Feb 2024',
        title: 'Envision X.',
        role: 'Social media strategist',
        description:
          'Five clients in parallel. Post ideation, content creation, content calendars, influencer outreach, Canva graphics, and hands-on Shopify setup and management. A lot happening — and I loved the chaos.',
        image: local(images.logos.envisionX, 'Envision X'),
        stat: { value: '05', label: 'brands, parallel' },
        variant: 'cream',
        order: 3,
      },
      {
        slug: 'hobiz',
        tag: 'Internship · Mar – May 2022',
        title: 'Hobiz.',
        role: 'Social media marketing',
        description:
          'Where it all started. Led content ideation and execution across social platforms, plus product promotion strategies for everyday content and special campaigns. First brief, first lessons.',
        image: local(images.logos.hobiz, 'Hobiz'),
        variant: 'dark',
        order: 4,
      },
    ],
  },

  passion: {
    num: '04 · Passion Project',
    heading: [
      { text: 'Turned my passion for\n' },
      { text: 'cooking', style: 'squig' },
      { text: ' into a ' },
      { text: 'brand.', style: 'pop' },
    ],
    description:
      'My sister and I sold home-baked goods during Diwali. I, naturally, turned it into a full brand — logo, menu, packaging, thank-you cards. Was it necessary? No. Did I love every second? Yes.',
    tags: ['Brand identity', 'Logo design', 'Packaging', 'Menu design'],
    images: images.riwayat.map((img, i) => local(img, `Riwayat ${i + 1}`)),
  },

  involvement: {
    num: '05 · Involvement',
    heading: [
      { text: 'The rooms I chose\n' },
      { text: 'to be in.', style: 'serif' },
    ],
    items: [
      {
        id: 'xcc',
        title: "Xavier's Consulting Club",
        body: 'Marketing, design, social media, a full casebook, and a live-project investor pitch deck. XCC is where I learned that doing everything is actually kind of my thing.',
        image: local(images.involvement.xcc, "Xavier's Consulting Club"),
        order: 1,
      },
      {
        id: 'girlup',
        title: 'GirlUp Nirbhaya',
        body: 'Graphics Head and Social Media Manager for a cause I actually believed in. Made sure the work looked as good as the message.',
        image: local(images.involvement.girlup, 'GirlUp Nirbhaya'),
        order: 2,
      },
      {
        id: 'leo-club',
        title: 'Leo Club · Midtown Glory',
        body: 'Club member volunteer (2023–24). Helped on social media content and graphics, coordinated inter-club events, and volunteered to teach at an underprivileged school.',
        image: local(images.involvement.leoClub, 'Leo Club Midtown Glory'),
        order: 3,
      },
    ],
  },

  contact: {
    badge: 'Currently available',
    heading: [
      { text: "Let's " },
      { text: 'talk?', style: 'serif' },
    ],
    sub: "If you've made it this far, we should probably talk. Social media, copy, content strategy — I'm available and very much interested.",
    label: 'Reach me at',
    links: [
      {
        id: 'mail',
        kind: 'mail',
        platform: 'Email',
        value: 'kejsakshi25@gmail.com',
        href: 'https://mail.google.com/mail/?view=cm&fs=1&to=kejsakshi25@gmail.com',
      },
      {
        id: 'phone',
        kind: 'phone',
        platform: 'Phone',
        value: '+91 98308 75858',
        href: 'tel:+919830875858',
      },
      {
        id: 'whatsapp',
        kind: 'whatsapp',
        platform: 'WhatsApp',
        value: '+91 98308 75858',
        href: 'https://wa.me/919830875858',
      },
      {
        id: 'linkedin',
        kind: 'linkedin',
        platform: 'LinkedIn',
        value: 'sakshikejriwal',
        href: 'https://www.linkedin.com/in/sakshi-kejriwal-60594a1b3/',
      },
    ],
  },
};
