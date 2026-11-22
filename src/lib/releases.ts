export interface ReleasePayload {
  version: string;
  released_on: string;
  minimum_php_version: string;
  download_url: string;
  size_bytes: number;
  is_prerelease: boolean;
}

type Release = Omit<ReleasePayload, 'released_on'> & { released_on: Date };

export const releaseNotesUrl =
  'https://github.com/FOSSBilling/FOSSBilling/releases/latest';

function isValidDownloadUrl(url: string, version: string): boolean {
  // Bind the raw navigation target to this release's official artifact.
  // A URL-safe tag prevents separators and URL syntax from entering the path.
  if (!/^[A-Za-z0-9][A-Za-z0-9.+-]*$/.test(version)) {
    return false;
  }

  const githubRelease = `https://github.com/FOSSBilling/FOSSBilling/releases/download/${version}`;
  return (
    url === `${githubRelease}/FOSSBilling.zip` ||
    url === `${githubRelease}/FOSSBilling-${version}.zip` ||
    url ===
      `https://download.fossbilling.org/releases/${version}/FOSSBilling-${version}.zip`
  );
}

function isReleasePayload(value: unknown): value is ReleasePayload {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const release = value as Partial<ReleasePayload>;
  return (
    typeof release.version === 'string' &&
    typeof release.released_on === 'string' &&
    typeof release.minimum_php_version === 'string' &&
    typeof release.download_url === 'string' &&
    typeof release.size_bytes === 'number' &&
    Number.isFinite(release.size_bytes) &&
    release.size_bytes >= 0 &&
    typeof release.is_prerelease === 'boolean' &&
    isValidDownloadUrl(release.download_url, release.version)
  );
}

function parseReleaseDate(value: string): Date | null {
  const day = /^\d{4}-\d{2}-\d{2}(?=T|$)/.exec(value)?.[0];
  if (!day) return null;

  // Check the calendar day separately so timezone offsets can cross midnight.
  const midnight = new Date(`${day}T00:00:00Z`);
  if (
    !Number.isFinite(midnight.getTime()) ||
    midnight.toISOString().slice(0, 10) !== day
  ) {
    return null;
  }

  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date : null;
}

export async function getLatestStableRelease(): Promise<Release | null> {
  try {
    const response = await fetch('https://api.fossbilling.net/versions/v1', {
      signal: AbortSignal.timeout(5000),
      cf: {
        cacheTtl: 300,
        cacheEverything: true,
        cacheTtlByStatus: {
          '200-299': 300,
          '500-599': 0,
        },
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: unknown = await response.json();

    if (
      !data ||
      typeof data !== 'object' ||
      !('error_code' in data) ||
      typeof data.error_code !== 'number'
    ) {
      throw new Error('API returned an invalid response');
    }

    if (data.error_code !== 0) {
      throw new Error(`API returned error code: ${data.error_code}`);
    }

    if (
      !('result' in data) ||
      !data.result ||
      typeof data.result !== 'object' ||
      Array.isArray(data.result)
    ) {
      throw new Error('API returned an invalid release list');
    }

    let release: Release | null = null;

    for (const candidate of Object.values(data.result)) {
      if (!isReleasePayload(candidate) || candidate.is_prerelease) continue;

      const date = parseReleaseDate(candidate.released_on);
      if (date && (!release || date > release.released_on)) {
        release = { ...candidate, released_on: date };
      }
    }

    return release;
  } catch (error) {
    console.error('Error fetching releases:', error);
    return null;
  }
}

const compactNumberFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
});

export function formatCompactNumber(number: number): string {
  return compactNumberFormatter.format(number);
}
