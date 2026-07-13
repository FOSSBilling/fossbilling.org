import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { ogPages } from '@/lib/og';

export const prerender = true;

export const getStaticPaths = (() => {
  return Object.keys(ogPages).map((route) => ({
    params: { route },
  }));
}) satisfies GetStaticPaths;

const ROOT = process.cwd();

async function loadAsset(path: string): Promise<Buffer> {
  return readFile(join(ROOT, path));
}

async function loadDataUrl(path: string, mimeType: string): Promise<string> {
  const bytes = await loadAsset(path);
  return `data:${mimeType};base64,${bytes.toString('base64')}`;
}

export const GET: APIRoute = async ({ params }) => {
  const route = params.route!;
  const page = ogPages[route] ?? ogPages.index!;

  const [regularFont, boldFont, logoDataUrl] = await Promise.all([
    loadAsset('src/assets/fonts/Inter-Regular.ttf'),
    loadAsset('src/assets/fonts/Inter-Bold.ttf'),
    loadDataUrl('src/assets/og-logo.svg', 'image/svg+xml'),
  ]);

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background:
            'linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #1e3a8a 100%)',
          fontFamily: 'Inter',
        },
        children: [
          {
            type: 'img',
            props: {
              src: logoDataUrl,
              width: 240,
              height: 51,
              style: { objectFit: 'contain' },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                maxWidth: 1000,
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      color: '#f9fafb',
                      fontSize: 72,
                      fontWeight: 700,
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                    },
                    children: page.title,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      color: '#dbeafe',
                      fontSize: 30,
                      lineHeight: 1.4,
                      maxWidth: 900,
                    },
                    children: page.description,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                color: '#bfdbfe',
                fontSize: 24,
                letterSpacing: '0.02em',
              },
              children: 'fossbilling.org',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: regularFont,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: boldFont,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  );

  const png = new Resvg(svg, {
    fitTo: { mode: 'original' },
    textRendering: 1,
    shapeRendering: 2,
  })
    .render()
    .asPng();

  return new Response(new Uint8Array(png), {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=31536000, immutable',
    },
  });
};
