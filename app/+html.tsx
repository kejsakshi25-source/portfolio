import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * Custom HTML document for the static web export. Paints the flat sand base
 * (`--sand`) on the document — the warm blob glow is drawn by the animated
 * <BlobBackground> layer (see app/_layout.tsx), matching the source's
 * `.blobs` div. Also adds the source site's recolored text selection.
 */
const SITE_URL = 'https://portfolio-lac-nine-89.vercel.app';
const SITE_TITLE = 'Sakshi Kejriwal — Portfolio';
const SITE_DESCRIPTION =
  'Portfolio of Sakshi Kejriwal — social media, content design, and copywriting.';
const SITE_IMAGE = `${SITE_URL}/og-image.png`;

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content={SITE_DESCRIPTION} />

        {/* Open Graph — drives link previews in WhatsApp, iMessage, Slack, LinkedIn, etc. */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={SITE_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Sakshi Kejriwal — Portfolio" />
        <meta property="og:site_name" content="Sakshi Kejriwal" />

        {/* Twitter / X cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={SITE_IMAGE} />

        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: globalCss }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const globalCss = `
html, body { min-height: 100%; }
html, body { background-color: #e8dac6; }
* { -webkit-tap-highlight-color: transparent; }
::selection { background-color: #c84e3d; color: #f5ead4; }
::-moz-selection { background-color: #c84e3d; color: #f5ead4; }
`;
