/**
 * Generate the Open Graph link-preview image used by WhatsApp / iMessage /
 * Slack / LinkedIn / Twitter. Renders an SVG with the site's palette and
 * rasterizes it via sharp.
 *
 * Run: node scripts/generate-og-image.mjs
 * Output: assets/images/og-image.png  (1200x630)
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'og-image.png');

const W = 1200;
const H = 630;
const SAND = '#e8dac6';
const LINEN = '#f5ead4';
const INK = '#2d1a14';
const BRICK = '#c84e3d';
const MUSTARD = '#d99a3e';

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <!-- sand base -->
  <rect width="${W}" height="${H}" fill="${SAND}"/>

  <!-- soft warm blobs -->
  <defs>
    <radialGradient id="blobA" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${BRICK}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="${BRICK}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blobB" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${MUSTARD}" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="${MUSTARD}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="980" cy="120" r="320" fill="url(#blobA)"/>
  <circle cx="120" cy="540" r="280" fill="url(#blobB)"/>

  <!-- pinstripe diagonal hatch, very subtle -->
  <defs>
    <pattern id="hatch" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="9" height="18" fill="rgba(45,26,20,0.04)"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#hatch)"/>

  <!-- ink frame -->
  <rect x="32" y="32" width="${W - 64}" height="${H - 64}" fill="none" stroke="${INK}" stroke-width="3" rx="24"/>

  <!-- top label -->
  <text x="80" y="120" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        font-size="22" letter-spacing="3" fill="${INK}" opacity="0.55">
    ✶  PORTFOLIO  ·  2026
  </text>

  <!-- big name -->
  <text x="80" y="320" font-family="Georgia, 'Times New Roman', serif"
        font-size="140" font-weight="800" fill="${INK}" letter-spacing="-6">
    Sakshi
  </text>
  <text x="80" y="450" font-family="Georgia, 'Times New Roman', serif"
        font-style="italic" font-size="140" font-weight="400" fill="${INK}" letter-spacing="-4">
    Kejriwal.
  </text>

  <!-- subtitle -->
  <text x="80" y="540" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="28" font-weight="500" fill="${INK}" opacity="0.78">
    Digital marketer &amp; content strategist
  </text>

  <!-- bottom-right pill -->
  <g transform="translate(${W - 280}, ${H - 100})">
    <rect width="200" height="48" rx="24" fill="${BRICK}"/>
    <text x="100" y="32" text-anchor="middle"
          font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
          font-size="18" font-weight="700" fill="${LINEN}">Let's talk ↗</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png({ quality: 92 }).toFile(OUT);
console.log(`Wrote ${OUT}`);
