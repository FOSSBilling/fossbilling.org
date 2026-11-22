import { createAppAuth } from '@octokit/auth-app';
import { request } from '@octokit/request';

type GitHubAppEnv = Pick<
  Cloudflare.Env,
  | 'GITHUB_APP_CLIENT_ID'
  | 'GITHUB_APP_INSTALLATION_ID'
  | 'GITHUB_APP_PRIVATE_KEY'
>;

const repository = 'FOSSBilling';
const tokenRetryDelayMs = 30_000;
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'fossbilling-website',
};

const appRequest = request.defaults({
  headers,
  request: {
    fetch: (input: RequestInfo | URL, init?: RequestInit) =>
      fetch(input, { ...init, signal: AbortSignal.timeout(5000) }),
  },
});

// Keep the token cache and retry delay tied to the active credentials.
let cached:
  | {
      clientId: string;
      installationId: string;
      privateKey: string;
      authenticate: ReturnType<typeof createAppAuth>;
      retryAfter: number;
    }
  | undefined;

function describeGitHubFailure(error: unknown): string {
  // SDK errors can carry the request and response, including credentials.
  const cause = error instanceof Error ? (error.cause ?? error) : error;
  if (
    cause instanceof Error &&
    ['AbortError', 'TimeoutError'].includes(cause.name)
  ) {
    return 'request timed out';
  }
  if (cause instanceof TypeError) return 'network or request error';
  if (cause instanceof SyntaxError) return 'invalid JSON response';
  if (
    error instanceof Error &&
    'status' in error &&
    typeof error.status === 'number' &&
    Number.isInteger(error.status) &&
    error.status >= 400 &&
    error.status <= 599
  ) {
    return `HTTP ${error.status}`;
  }
  return 'unexpected error';
}

async function getInstallationToken(
  env: GitHubAppEnv,
): Promise<string | undefined> {
  const {
    GITHUB_APP_CLIENT_ID: clientId,
    GITHUB_APP_INSTALLATION_ID: installationId,
    GITHUB_APP_PRIVATE_KEY: privateKey,
  } = env;

  if (!clientId && !installationId && !privateKey) return;
  if (
    !clientId ||
    !installationId ||
    !/^\d+$/.test(installationId) ||
    !privateKey
  ) {
    console.warn('GitHub App credentials are incomplete or invalid');
    return;
  }

  if (
    cached?.clientId !== clientId ||
    cached.installationId !== installationId ||
    cached.privateKey !== privateKey
  ) {
    cached = {
      clientId,
      installationId,
      privateKey,
      authenticate: createAppAuth({
        appId: clientId,
        installationId,
        privateKey,
        request: appRequest,
      }),
      retryAfter: 0,
    };
  }
  const app = cached;
  if (app.retryAfter > Date.now()) return;

  try {
    const { token } = await app.authenticate({
      type: 'installation',
      repositoryNames: [repository],
      permissions: { metadata: 'read' },
    });
    return token;
  } catch (error) {
    if (app.retryAfter <= Date.now()) {
      app.retryAfter = Date.now() + tokenRetryDelayMs;
      console.warn(
        'GitHub App authentication failed',
        describeGitHubFailure(error),
      );
    }
  }
}

export async function getGitHubStarCount(
  env: GitHubAppEnv,
): Promise<number | null> {
  const token = await getInstallationToken(env);

  try {
    const res = await fetch(
      `https://api.github.com/repos/FOSSBilling/${repository}`,
      {
        headers: token
          ? { ...headers, Authorization: `Bearer ${token}` }
          : headers,
        signal: AbortSignal.timeout(5000),
        cf: {
          cacheTtl: 300,
          cacheEverything: true,
          cacheTtlByStatus: {
            '200-299': 300,
            '400-599': 0,
          },
        },
      },
    );

    if (!res.ok) {
      const requestId = res.headers.get('x-github-request-id');
      console.error('Failed to fetch GitHub stars', {
        status: res.status,
        requestId:
          requestId &&
          /^(?:[0-9a-f]{4,16}:){2,5}[0-9a-f]{4,16}$/i.test(requestId)
            ? requestId
            : undefined,
      });
      return null;
    }

    const data: unknown = await res.json();
    if (
      data &&
      typeof data === 'object' &&
      'stargazers_count' in data &&
      typeof data.stargazers_count === 'number'
    ) {
      return data.stargazers_count;
    }

    console.error('GitHub response is missing a numeric stargazers_count');
  } catch (error) {
    console.error(
      'Failed to fetch GitHub star count',
      describeGitHubFailure(error),
    );
  }
  return null;
}
