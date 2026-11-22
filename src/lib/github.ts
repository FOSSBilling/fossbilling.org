import { createAppAuth } from '@octokit/auth-app';
import { request } from '@octokit/request';

type GitHubAppEnv = Pick<
  Cloudflare.Env,
  | 'GITHUB_APP_CLIENT_ID'
  | 'GITHUB_APP_INSTALLATION_ID'
  | 'GITHUB_APP_PRIVATE_KEY'
>;

const repository = 'FOSSBilling';
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

// Reuse Octokit's token cache while the App credentials are unchanged.
let cached:
  | {
      clientId: string;
      installationId: string;
      privateKey: string;
      authenticate: ReturnType<typeof createAppAuth>;
    }
  | undefined;

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

  try {
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
      };
    }

    const { token } = await cached.authenticate({
      type: 'installation',
      repositoryNames: [repository],
      permissions: { metadata: 'read' },
    });
    return token;
  } catch {
    console.warn('GitHub App authentication failed');
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
      console.error(`Failed to fetch GitHub stars: HTTP ${res.status}`);
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
  } catch {
    console.error('Failed to fetch GitHub star count');
  }
  return null;
}
