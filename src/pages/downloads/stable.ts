import { getLatestStableRelease, releaseNotesUrl } from '../../lib/releases.ts';

export const prerender = false;

export async function GET() {
  const release = await getLatestStableRelease();
  return new Response(null, {
    status: 302,
    headers: {
      Location: release?.download_url ?? releaseNotesUrl,
      'Cache-Control': 'no-store',
    },
  });
}
