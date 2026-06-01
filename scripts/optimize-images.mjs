#!/usr/bin/env node
/**
 * Image optimization pipeline.
 *
 * Walks assets/images/ recursively and generates responsive WebP variants
 * (w480, w960, w1600) beside each source PNG/JPG. Skips icons, splash, and
 * favicons that native bundling depends on as-is.
 *
 * Also emits src/data/local/imageVariants.ts — a manifest mapping each source
 * image's relative path to its variant require() calls + original dimensions.
 *
 * Idempotent: re-running only regenerates variants whose source is newer than
 * the existing webp, or whose variants don't exist yet.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const IMAGES_ROOT = path.join(PROJECT_ROOT, 'assets', 'images');
const MANIFEST_PATH = path.join(PROJECT_ROOT, 'src', 'data', 'local', 'imageVariants.ts');

const VARIANTS = [
  { width: 480, quality: 78, label: 'w480' },
  { width: 960, quality: 78, label: 'w960' },
  { width: 1600, quality: 80, label: 'w1600' },
];

const SKIP_EXACT = new Set(['favicon.png', 'icon.png', 'splash-icon.png']);

function shouldSkip(fileName) {
  if (SKIP_EXACT.has(fileName)) return true;
  if (fileName.startsWith('android-icon-')) return true;
  if (fileName.toLowerCase().endsWith('.mp4')) return true;
  return false;
}

function isProcessable(fileName) {
  const lower = fileName.toLowerCase();
  return lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg');
}

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

async function statOrNull(p) {
  try {
    return await fs.stat(p);
  } catch {
    return null;
  }
}

function toPosix(p) {
  return p.split(path.sep).join('/');
}

async function main() {
  const allFiles = await walk(IMAGES_ROOT);

  let totalSourceBytes = 0;
  let totalVariantBytes = 0;
  let processedCount = 0;
  const skipped = [];
  const manifestEntries = [];

  for (const absPath of allFiles) {
    const fileName = path.basename(absPath);
    const relFromImages = toPosix(path.relative(IMAGES_ROOT, absPath));

    if (shouldSkip(fileName)) {
      skipped.push({ file: relFromImages, reason: 'reserved (icon/splash/favicon/mp4)' });
      continue;
    }
    if (!isProcessable(fileName)) {
      // Already-generated .webp variants will show up here on re-runs — silent skip.
      if (fileName.toLowerCase().endsWith('.webp')) continue;
      skipped.push({ file: relFromImages, reason: 'unsupported extension' });
      continue;
    }

    const srcStat = await fs.stat(absPath);
    totalSourceBytes += srcStat.size;

    const dirName = path.dirname(absPath);
    const ext = path.extname(fileName);
    const baseName = fileName.slice(0, -ext.length);

    // Get source dimensions once
    const meta = await sharp(absPath).metadata();
    const origWidth = meta.width ?? 0;
    const origHeight = meta.height ?? 0;

    const producedVariants = [];

    for (const variant of VARIANTS) {
      if (origWidth && origWidth < variant.width) {
        // Skip upscaling
        continue;
      }
      const outName = `${baseName}.${variant.label}.webp`;
      const outPath = path.join(dirName, outName);

      const outStat = await statOrNull(outPath);
      const needsBuild = !outStat || outStat.mtimeMs < srcStat.mtimeMs;

      if (needsBuild) {
        await sharp(absPath)
          .resize({ width: variant.width, withoutEnlargement: true })
          .webp({ quality: variant.quality })
          .toFile(outPath);
      }
      const finalStat = await fs.stat(outPath);
      totalVariantBytes += finalStat.size;
      producedVariants.push({ width: variant.width, fileName: outName });
    }

    processedCount += 1;

    manifestEntries.push({
      relPath: relFromImages,
      width: origWidth,
      height: origHeight,
      dirPosix: toPosix(path.relative(IMAGES_ROOT, dirName)),
      variants: producedVariants,
    });
  }

  // Emit manifest
  await emitManifest(manifestEntries);

  const mb = (n) => (n / (1024 * 1024)).toFixed(2);
  console.log('');
  console.log('Image optimization summary');
  console.log('--------------------------');
  console.log(`Processed sources: ${processedCount}`);
  console.log(`Skipped:           ${skipped.length}`);
  for (const s of skipped) {
    console.log(`  - ${s.file} (${s.reason})`);
  }
  console.log(`Source total:      ${mb(totalSourceBytes)} MB`);
  console.log(`Variants total:    ${mb(totalVariantBytes)} MB`);
  console.log(`Manifest written:  ${path.relative(PROJECT_ROOT, MANIFEST_PATH)}`);
}

async function emitManifest(entries) {
  // entries: { relPath, width, height, dirPosix, variants: [{width, fileName}] }
  // require path from src/data/local/imageVariants.ts to assets/images/X is ../../../assets/images/X
  const REQUIRE_PREFIX = '../../../assets/images';

  const lines = [];
  lines.push('// AUTO-GENERATED by scripts/optimize-images.mjs — do not edit by hand.');
  lines.push('/* eslint-disable */');
  lines.push('');
  lines.push('export type ImageVariant = { src: number; w: number };');
  lines.push('export type ImageVariantEntry = {');
  lines.push('  w: number;');
  lines.push('  h: number;');
  lines.push('  webp: ImageVariant[];');
  lines.push('};');
  lines.push('');
  lines.push('export const imageVariants: Record<string, ImageVariantEntry> = {');

  // Sort for stable output
  const sorted = [...entries].sort((a, b) => a.relPath.localeCompare(b.relPath));

  for (const entry of sorted) {
    lines.push(`  ${JSON.stringify(entry.relPath)}: {`);
    lines.push(`    w: ${entry.width}, h: ${entry.height},`);
    lines.push(`    webp: [`);
    for (const v of entry.variants) {
      const requirePath = entry.dirPosix
        ? `${REQUIRE_PREFIX}/${entry.dirPosix}/${v.fileName}`
        : `${REQUIRE_PREFIX}/${v.fileName}`;
      lines.push(`      { src: require('${requirePath}'), w: ${v.width} },`);
    }
    lines.push(`    ],`);
    lines.push(`  },`);
  }

  lines.push('};');
  lines.push('');

  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await fs.writeFile(MANIFEST_PATH, lines.join('\n'), 'utf8');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
