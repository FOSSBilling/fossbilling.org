export interface Release {
  version: string;
  released_on: string;
  minimum_php_version: string;
  download_url: string;
  size_bytes: number;
  is_prerelease: boolean;
}

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

function isRelease(value: unknown): value is Release {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const release = value as Partial<Release>;
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
    let latestDate = -Infinity;

    for (const candidate of Object.values(data.result)) {
      if (!isRelease(candidate) || candidate.is_prerelease) continue;

      const date = Date.parse(candidate.released_on);
      if (date > latestDate) {
        release = candidate;
        latestDate = date;
      }
    }

    return release;
  } catch (error) {
    console.error('Error fetching releases:', error);
    return null;
  }
}

export async function getGitHubStarCount(
  githubToken?: string,
): Promise<number | null> {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'fossbilling-website',
    };

    if (githubToken) {
      headers['Authorization'] = `Bearer ${githubToken}`;
    }

    const res = await fetch(
      'https://api.github.com/repos/FOSSBilling/FOSSBilling',
      {
        headers,
        signal: AbortSignal.timeout(5000),
        cf: {
          cacheTtl: 300,
          cacheEverything: true,
          cacheTtlByStatus: {
            '200-299': 300,
            '500-599': 0,
            429: 0,
          },
        },
      },
    );

    if (!res.ok) {
      const errorBody = await res.text().catch((bodyError) => {
        console.error('Error reading error response body:', bodyError);
        return '';
      });
      const message =
        `Failed to fetch stars: HTTP ${res.status} ${res.statusText}` +
        (errorBody ? ` - ${errorBody}` : '');
      throw new Error(message);
    }

    const data: unknown = await res.json();
    if (
      typeof data === 'object' &&
      data !== null &&
      'stargazers_count' in data &&
      typeof (data as { stargazers_count: unknown }).stargazers_count ===
        'number'
    ) {
      return (data as { stargazers_count: number }).stargazers_count;
    }

    throw new Error(
      'Invalid GitHub API response: missing or non-numeric stargazers_count',
    );
  } catch (error) {
    console.error('Error fetching star count:', error);
    return null;
  }
}

const compactNumberFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
});

export function formatCompactNumber(number: number): string {
  return compactNumberFormatter.format(number);
}
