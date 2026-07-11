export interface Release {
  version: string;
  released_on: string;
  minimum_php_version: string;
  download_url: string;
  size_bytes: number;
  is_prerelease: boolean;
}

interface ApiResponse {
  result: Record<string, unknown>;
  error_code: number;
}

const allowedDownloadHosts = new Set([
  'github.com',
  'download.fossbilling.org',
]);

function isValidDownloadUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.protocol === 'https:' &&
      allowedDownloadHosts.has(parsedUrl.hostname)
    );
  } catch {
    return false;
  }
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
    isValidDownloadUrl(release.download_url)
  );
}

function isApiResponse(value: unknown): value is ApiResponse {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const response = value as Partial<ApiResponse>;
  return (
    typeof response.error_code === 'number' &&
    !!response.result &&
    typeof response.result === 'object' &&
    !Array.isArray(response.result)
  );
}

export async function getLatestStableRelease(): Promise<{
  release: Release | null;
  error: Error | null;
}> {
  try {
    const response = await fetch('https://api.fossbilling.net/versions/v1', {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!isApiResponse(data)) {
      return {
        release: null,
        error: new Error('API returned an invalid response'),
      };
    }

    if (data.error_code !== 0) {
      return {
        release: null,
        error: new Error(`API returned error code: ${data.error_code}`),
      };
    }

    const releases = Object.values(data.result).filter(isRelease);

    releases.sort(
      (a, b) =>
        new Date(b.released_on).getTime() - new Date(a.released_on).getTime(),
    );

    const release = releases.find((r) => !r.is_prerelease) || null;
    return { release, error: null };
  } catch (err) {
    console.error('Error fetching releases:', err);
    return {
      release: null,
      error: err instanceof Error ? err : new Error('Unknown error'),
    };
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
