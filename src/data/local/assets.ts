/**
 * Bundled asset registry. Metro requires static literal paths, so every
 * image/video is `require`d here once and referenced by key from the data
 * files. Paths are relative to this file (src/data/local → project root).
 */

export const images = {
  personal: require('../../../assets/images/personal.png'),

  logos: {
    xpert: require('../../../assets/images/logos/xpert.png'),
    storyOfStrings: require('../../../assets/images/logos/story-of-strings.png'),
    envisionX: require('../../../assets/images/logos/envision-x.png'),
    hobiz: require('../../../assets/images/logos/hobiz.png'),
  },

  involvement: {
    xcc: require('../../../assets/images/involvement/xcc.png'),
    girlup: require('../../../assets/images/involvement/girlup.png'),
    leoClub: require('../../../assets/images/involvement/leo-club.png'),
  },

  riwayat: [
    require('../../../assets/images/riwayat/1.png'),
    require('../../../assets/images/riwayat/2.png'),
    require('../../../assets/images/riwayat/3.png'),
    require('../../../assets/images/riwayat/4.png'),
  ],

  sos: {
    comingSoon: require('../../../assets/images/sos/coming-soon.png'),
    deskToDinner: require('../../../assets/images/sos/desk-to-dinner.png'),
    embroideredPanel: require('../../../assets/images/sos/embroidered-panel.png'),
    fruitsEmbroidery: [
      require('../../../assets/images/sos/fruits-embroidery/1.png'),
      require('../../../assets/images/sos/fruits-embroidery/2.png'),
      require('../../../assets/images/sos/fruits-embroidery/3.png'),
      require('../../../assets/images/sos/fruits-embroidery/4.png'),
      require('../../../assets/images/sos/fruits-embroidery/5.png'),
    ],
    khakaDesigns: [
      require('../../../assets/images/sos/khaka-designs/1.png'),
      require('../../../assets/images/sos/khaka-designs/2.png'),
      require('../../../assets/images/sos/khaka-designs/3.png'),
      require('../../../assets/images/sos/khaka-designs/4.png'),
    ],
    shapesEmbroidery: [
      require('../../../assets/images/sos/shapes-embroidery/1.png'),
      require('../../../assets/images/sos/shapes-embroidery/2.png'),
      require('../../../assets/images/sos/shapes-embroidery/3.png'),
      require('../../../assets/images/sos/shapes-embroidery/4.png'),
      require('../../../assets/images/sos/shapes-embroidery/5.png'),
      require('../../../assets/images/sos/shapes-embroidery/6.png'),
      require('../../../assets/images/sos/shapes-embroidery/7.png'),
      require('../../../assets/images/sos/shapes-embroidery/8.png'),
    ],
    typesOfPersonality: [
      require('../../../assets/images/sos/types-of-personality/1.png'),
      require('../../../assets/images/sos/types-of-personality/2.png'),
      require('../../../assets/images/sos/types-of-personality/3.png'),
      require('../../../assets/images/sos/types-of-personality/4.png'),
      require('../../../assets/images/sos/types-of-personality/5.png'),
      require('../../../assets/images/sos/types-of-personality/6.png'),
      require('../../../assets/images/sos/types-of-personality/7.png'),
    ],
  },
};

export const video = {
  thingsAiCantDo: require('../../../assets/images/sos/things-ai-cant-do.mp4'),
};
