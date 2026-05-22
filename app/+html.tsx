import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * Custom HTML document for the static web export. Paints the flat sand base
 * (`--sand`) on the document — the warm blob glow is drawn by the animated
 * <BlobBackground> layer (see app/_layout.tsx), matching the source's
 * `.blobs` div. Also adds the source site's recolored text selection.
 */
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
