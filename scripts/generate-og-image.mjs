/**
 * Generate the Open Graph link-preview image used by WhatsApp / iMessage /
 * Slack / LinkedIn / Twitter. Composites the favicon (scaled up + nicely
 * resampled) onto a 1200x630 sand-colored card.
 *
 * Run: node scripts/generate-og-image.mjs
 * Output: public/og-image.png  (1200x630)
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FAVICON = join(__dirname, '..', 'assets', 'images', 'Favicon_HighRes.png');
const OUT = join(__dirname, '..', 'public', 'og-image.png');

const W = 1200;
const H = 630;
const SAND = '#e8dac6';
const ICON = 460; // favicon rendered size

const upscaledFavicon = await sharp(FAVICON)
  .resize(ICON, ICON, { kernel: 'lanczos3', fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp({
  create: {
    width: W,
    height: H,
    channels: 4,
    background: SAND,
  },
})
  .composite([
    {
      input: upscaledFavicon,
      left: Math.round((W - ICON) / 2),
      top: Math.round((H - ICON) / 2),
    },
  ])
  .png({ quality: 92 })
  .toFile(OUT);

console.log(`Wrote ${OUT}`);
