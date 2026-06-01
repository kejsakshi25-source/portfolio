/**
 * Bundled asset registry. Metro requires static literal paths, so every
 * image/video is `require`d here once and referenced by key from the data
 * files. Paths are relative to this file (src/data/local → project root).
 *
 * Each image leaf is a `BundledImage` carrying the original `require()`
 * module id (used by native + as the canonical id on web) plus any
 * responsive WebP variants emitted by `scripts/optimize-images.mjs`.
 * Native ignores variants; on web, `RemoteImage` uses them to pick a
 * size-appropriate file.
 */

import { imageVariants, type ImageVariant } from './imageVariants';

export interface BundledImage {
  module: number;
  variants?: ImageVariant[];
  width?: number;
  height?: number;
}

/** Pair a Metro `require()` id with its variants/dimensions, looked up by
 *  the source's relative path inside `assets/images/`. Paths missing from
 *  the manifest fall through with just the original module — safe default. */
function bundle(module: number, path: string): BundledImage {
  const entry = imageVariants[path];
  return entry
    ? { module, variants: entry.webp, width: entry.w, height: entry.h }
    : { module };
}

export const images = {
  personal: bundle(require('../../../assets/images/personal.png'), 'personal.png'),

  logos: {
    xpert: bundle(require('../../../assets/images/logos/xpert.png'), 'logos/xpert.png'),
    storyOfStrings: bundle(
      require('../../../assets/images/logos/story-of-strings.png'),
      'logos/story-of-strings.png',
    ),
    envisionX: bundle(require('../../../assets/images/logos/envision-x.png'), 'logos/envision-x.png'),
    hobiz: bundle(require('../../../assets/images/logos/hobiz.png'), 'logos/hobiz.png'),
  },

  involvement: {
    xcc: bundle(require('../../../assets/images/involvement/xcc.png'), 'involvement/xcc.png'),
    girlup: bundle(require('../../../assets/images/involvement/girlup.png'), 'involvement/girlup.png'),
    leoClub: bundle(
      require('../../../assets/images/involvement/leo-club.png'),
      'involvement/leo-club.png',
    ),
  },

  riwayat: [
    bundle(require('../../../assets/images/riwayat/1.png'), 'riwayat/1.png'),
    bundle(require('../../../assets/images/riwayat/2.png'), 'riwayat/2.png'),
    bundle(require('../../../assets/images/riwayat/3.png'), 'riwayat/3.png'),
    bundle(require('../../../assets/images/riwayat/4.png'), 'riwayat/4.png'),
  ],

  xpertLinkedin: [
    bundle(require('../../../assets/images/xpert-linkedin/1.png'), 'xpert-linkedin/1.png'),
    bundle(require('../../../assets/images/xpert-linkedin/2.png'), 'xpert-linkedin/2.png'),
    bundle(require('../../../assets/images/xpert-linkedin/3.png'), 'xpert-linkedin/3.png'),
  ],

  sos: {
    comingSoon: bundle(require('../../../assets/images/sos/coming-soon.png'), 'sos/coming-soon.png'),
    deskToDinner: bundle(
      require('../../../assets/images/sos/desk-to-dinner.png'),
      'sos/desk-to-dinner.png',
    ),
    embroideredPanel: bundle(
      require('../../../assets/images/sos/embroidered-panel.png'),
      'sos/embroidered-panel.png',
    ),
    fruitsEmbroidery: [
      bundle(require('../../../assets/images/sos/fruits-embroidery/1.png'), 'sos/fruits-embroidery/1.png'),
      bundle(require('../../../assets/images/sos/fruits-embroidery/2.png'), 'sos/fruits-embroidery/2.png'),
      bundle(require('../../../assets/images/sos/fruits-embroidery/3.png'), 'sos/fruits-embroidery/3.png'),
      bundle(require('../../../assets/images/sos/fruits-embroidery/4.png'), 'sos/fruits-embroidery/4.png'),
      bundle(require('../../../assets/images/sos/fruits-embroidery/5.png'), 'sos/fruits-embroidery/5.png'),
    ],
    khakaDesigns: [
      bundle(require('../../../assets/images/sos/khaka-designs/1.png'), 'sos/khaka-designs/1.png'),
      bundle(require('../../../assets/images/sos/khaka-designs/2.png'), 'sos/khaka-designs/2.png'),
      bundle(require('../../../assets/images/sos/khaka-designs/3.png'), 'sos/khaka-designs/3.png'),
      bundle(require('../../../assets/images/sos/khaka-designs/4.png'), 'sos/khaka-designs/4.png'),
    ],
    shapesEmbroidery: [
      bundle(require('../../../assets/images/sos/shapes-embroidery/1.png'), 'sos/shapes-embroidery/1.png'),
      bundle(require('../../../assets/images/sos/shapes-embroidery/2.png'), 'sos/shapes-embroidery/2.png'),
      bundle(require('../../../assets/images/sos/shapes-embroidery/3.png'), 'sos/shapes-embroidery/3.png'),
      bundle(require('../../../assets/images/sos/shapes-embroidery/4.png'), 'sos/shapes-embroidery/4.png'),
      bundle(require('../../../assets/images/sos/shapes-embroidery/5.png'), 'sos/shapes-embroidery/5.png'),
      bundle(require('../../../assets/images/sos/shapes-embroidery/6.png'), 'sos/shapes-embroidery/6.png'),
      bundle(require('../../../assets/images/sos/shapes-embroidery/7.png'), 'sos/shapes-embroidery/7.png'),
      bundle(require('../../../assets/images/sos/shapes-embroidery/8.png'), 'sos/shapes-embroidery/8.png'),
    ],
    typesOfPersonality: [
      bundle(require('../../../assets/images/sos/types-of-personality/1.png'), 'sos/types-of-personality/1.png'),
      bundle(require('../../../assets/images/sos/types-of-personality/2.png'), 'sos/types-of-personality/2.png'),
      bundle(require('../../../assets/images/sos/types-of-personality/3.png'), 'sos/types-of-personality/3.png'),
      bundle(require('../../../assets/images/sos/types-of-personality/4.png'), 'sos/types-of-personality/4.png'),
      bundle(require('../../../assets/images/sos/types-of-personality/5.png'), 'sos/types-of-personality/5.png'),
      bundle(require('../../../assets/images/sos/types-of-personality/6.png'), 'sos/types-of-personality/6.png'),
      bundle(require('../../../assets/images/sos/types-of-personality/7.png'), 'sos/types-of-personality/7.png'),
    ],
  },
} as const;

export const video = {
  thingsAiCantDo: require('../../../assets/images/sos/things-ai-cant-do.mp4'),
};
