# Web Loading Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut live load time on the Vercel-hosted portfolio by shrinking media payload, serving responsive variants, lazy-mounting below-the-fold assets, and gating the 48 MB MP4 behind explicit interaction — without changing the UI or breaking static prerender.

**Architecture:** Generate WebP variants (480w/960w/1600w) for every bundled raster via a Node sharp script; generate a JPG poster + heavily compressed MP4 for the SoS reel via ffmpeg; extend `MediaRef` with a `variants` shape; teach `RemoteImage` to (a) render `<Image source={[...]} />` arrays with `responsivePolicy="static"` on web and (b) IntersectionObserver-lazy-mount unless `priority="high"`; gate the lightbox video + carousel slides behind interaction; add Vercel immutable cache headers; trim unused font weights.

**Tech Stack:** Expo SDK 54, expo-router 6 (`web.output: "static"`), expo-image 3, expo-video 3, React Native Web 0.21, sharp 0.34 (dev), ffmpeg (one-shot CLI), Vercel.

**Reference Docs (per AGENTS.md — read before code):**
- Expo Image v54: https://docs.expo.dev/versions/v54.0.0/sdk/image/ (`responsivePolicy`, source arrays, `priority`, `cachePolicy`)
- Expo Video v54: https://docs.expo.dev/versions/v54.0.0/sdk/video/
- Expo Router v54 static export: https://docs.expo.dev/versions/v54.0.0/sdk/router/
- Vercel headers: https://vercel.com/docs/projects/project-configuration#headers

---

## File Map

**Create:**
- `scripts/optimize-images.mjs` — sharp pipeline; reads `assets/images/**`, emits `assets/images-web/<same-path>/{w480,w960,w1600}.webp`
- `scripts/make-video-poster.mjs` — ffmpeg one-shot: writes `assets/images/sos/things-ai-cant-do-poster.jpg` + `assets/images/sos/things-ai-cant-do-web.mp4`
- `src/data/local/imageVariants.ts` — generated/by-hand map keyed by source path → `{ src, w, h, variants: [{src,w}, …] }`
- `src/components/media/LazyMount.tsx` — IntersectionObserver wrapper (web-only) with native passthrough
- `vercel.json` — extend with `headers`

**Modify:**
- `src/data/types.ts` — extend `MediaRef.local` with optional `variants`, `width`, `height`, `priority`
- `src/components/media/RemoteImage.tsx` — accept variants, build `source` array on web, support `priority`, wrap in `LazyMount` by default
- `src/components/case/PostGrid.tsx` — replace eager `VideoPostThumb` with poster image; mount `VideoView` only on hover (web) or never (native, just show poster)
- `src/components/case/Lightbox.tsx` — only construct slide refs on demand; only mount `VideoView` when post is the current video
- `src/data/local/assets.ts` — switch `require()` to helpers that attach variants
- `src/data/local/landing.ts` / `caseStudies.ts` — flag above-the-fold media as `priority: 'high'`
- `app/_layout.tsx` — drop unused font weights (audit first)
- `package.json` — add `sharp` to devDependencies, add `optimize:images` script
- `vercel.json` — add immutable cache headers for `/_expo/static/*` and `/assets/*`

**Test/Verify:**
- `npx tsc --noEmit`
- `npm run lint`
- `npx expo export --platform web` → inspect `dist/`
- `grep -c "Sakshi" dist/index.html` (real content, not shell)
- Diff `dist/` total size before/after
- Manual: `npx serve dist` + Lighthouse on landing + Story of Strings

---

## Task 1: Image optimization pipeline (parallelizable)

**Files:**
- Create: `scripts/optimize-images.mjs`
- Create: `src/data/local/imageVariants.ts`
- Modify: `package.json`

- [ ] Install `sharp` as devDependency
- [ ] Write `scripts/optimize-images.mjs` that walks `assets/images/**` (skip icons + mp4), for each PNG/JPG emits `<dirname>/<name>.w480.webp`, `.w960.webp`, `.w1600.webp` with quality 78. Skips when source is smaller than target. Emits a manifest `src/data/local/imageVariants.ts`:

```ts
export const imageVariants: Record<string, { w: number; h: number; webp: { src: number; w: number }[] }> = {
  'personal': { w: 1200, h: 1600, webp: [
    { src: require('../../../assets/images/personal.w480.webp'), w: 480 },
    { src: require('../../../assets/images/personal.w960.webp'), w: 960 },
    { src: require('../../../assets/images/personal.w1600.webp'), w: 1600 },
  ]},
  // …
};
```

- [ ] Add `"optimize:images": "node scripts/optimize-images.mjs"` to `package.json`
- [ ] Run the script. Verify generated files exist.
- [ ] Commit.

## Task 2: Video poster + compressed MP4 (parallelizable)

**Files:**
- Create: `scripts/make-video-poster.mjs`
- Create: `assets/images/sos/things-ai-cant-do-poster.jpg`
- Create: `assets/images/sos/things-ai-cant-do-web.mp4`

- [ ] Write `scripts/make-video-poster.mjs` that shells out to ffmpeg (if installed) to:
  - Extract frame at 00:00:01 → `things-ai-cant-do-poster.jpg` (max width 960, quality 80)
  - Re-encode video → `things-ai-cant-do-web.mp4` (`-vf scale=720:-2 -c:v libx264 -crf 28 -preset slow -an`) targeting ≤8 MB
- [ ] Add `assets.posters.thingsAiCantDo` and switch `video.thingsAiCantDo` to the `-web.mp4` copy.
- [ ] Commit.

## Task 3: Extend MediaRef + RemoteImage for responsive + lazy

**Files:**
- Modify: `src/data/types.ts`
- Modify: `src/components/media/RemoteImage.tsx`
- Create: `src/components/media/LazyMount.tsx`

- [ ] Extend `MediaRef.local`:

```ts
| { kind: 'local'; module: number; alt?: string;
    variants?: { src: number; w: number }[];
    width?: number; height?: number;
    priority?: 'high' | 'normal' | 'low' }
```

- [ ] Create `LazyMount` (web: IntersectionObserver, rootMargin 300px, render `null` until in view; native: pass-through). Accept `disabled` for above-the-fold.
- [ ] In `RemoteImage`:
  - When `media.kind === 'local'` and `media.variants` set, build expo-image `source` array on web with `{ uri: variant.src, width: variant.w }` shapes (per SDK 54 docs); on native fall back to `media.module`.
  - Pass `priority={media.priority ?? 'normal'}` and `responsivePolicy="static"`.
  - Wrap returned `<Image>` in `<LazyMount disabled={media.priority === 'high'}>`.
- [ ] Commit.

## Task 4: Wire variants into data + flag above-the-fold

**Files:**
- Modify: `src/data/local/assets.ts`
- Modify: `src/data/local/landing.ts`
- Modify: `src/data/local/caseStudies.ts`

- [ ] In `assets.ts`, replace each `require(…)` for raster images with a helper that pulls from `imageVariants` and returns a base `MediaRef`-shape object exposing `module` + `variants`. Keep keys identical so callers don't change.
- [ ] In `landing.ts`, set `priority: 'high'` on `intro.polaroid.image` only.
- [ ] In `caseStudies.ts`, set `priority: 'high'` on Story of Strings hero/cover and Xpert hero only.
- [ ] Commit.

## Task 5: Replace eager video in PostGrid + lazy Lightbox carousel

**Files:**
- Modify: `src/components/case/PostGrid.tsx`
- Modify: `src/components/case/Lightbox.tsx`

- [ ] In `PostGrid`, replace `<VideoPostThumb>` with `<RemoteImage media={post.poster ?? post.cover} />` + `<PlayOverlay />`. Mount `VideoView` only when the user clicks (`onPress`) — that is, defer to lightbox. Optionally keep web-only hover preview by mounting the player lazily on first `onPointerEnter`.
- [ ] In `Lightbox`, only build the slide list once `post` is set and only feed the **current** slide to `RemoteImage`. Prefetch only previous/next via a separate hidden `<Image>` with `priority="low"` (preload, not render).
- [ ] Move `useVideoPlayer` so the player is only constructed when `post?.type === 'video'`.
- [ ] Add `PostItem.poster?: MediaRef` to `types.ts`; populate it on the SoS video post in `caseStudies.ts`.
- [ ] Commit.

## Task 6: Vercel cache headers (parallelizable)

**Files:**
- Modify: `vercel.json`

- [ ] Add a `headers` array:

```json
{
  "headers": [
    { "source": "/_expo/static/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/assets/(.*)",       "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/(.*).html",         "headers": [{ "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }] }
  ]
}
```

- [ ] Commit.

## Task 7: Font payload audit (parallelizable)

**Files:**
- Modify: `app/_layout.tsx`
- Modify: `package.json` (if any package becomes unused)

- [ ] grep for every `fontFamily:` in `src/**` and intersect with the families currently loaded.
- [ ] Drop any weight not referenced. (Conservative: keep all 5 Bricolage weights if used; drop only proven-unused weights.)
- [ ] Verify static export still bundles the trimmed set.
- [ ] Commit.

## Task 8: Verify

- [ ] `npx tsc --noEmit` → exit 0
- [ ] `npm run lint` → no errors
- [ ] `npx expo export --platform web` → success
- [ ] `grep -c "Sakshi Kejriwal" dist/index.html` → ≥1
- [ ] `grep -c "Story of Strings" dist/work/story-of-strings/index.html` → ≥1
- [ ] `du -sh dist/` before/after — record numbers
- [ ] Confirm `dist/_expo/static/` is hashed; `vercel.json` headers target it.
- [ ] Visual check: `npx serve dist` → landing + Story of Strings page render identical to `HTML_REFERENCE/index.html` / `HTML_REFERENCE/story-of-strings.html`.

---

## Parallelization map

- **Parallel batch A (no shared files):** Task 1, Task 2, Task 6, Task 7
- **Then sequential (shared files):** Task 3 → Task 4 → Task 5
- **Then:** Task 8 verification
