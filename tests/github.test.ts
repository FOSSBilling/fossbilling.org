import assert from 'node:assert/strict';
import { generateKeyPairSync } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { parseEnv } from 'node:util';
import { getGitHubStarCount } from '../src/lib/github.ts';

test('the example environment uses public GitHub access', async (context) => {
  const env = parseEnv(
    readFileSync(new URL('../.dev.vars.example', import.meta.url), 'utf8'),
  );
  const warn = context.mock.method(console, 'warn', () => {});
  const fetch = context.mock.method(globalThis, 'fetch', async () =>
    Response.json({ stargazers_count: 12 }),
  );

  assert.equal(await getGitHubStarCount(env), 12);
  assert.equal(fetch.mock.callCount(), 1);
  assert.equal(warn.mock.callCount(), 0);
});

test('token mint failures fall back to public access until the retry delay expires', async (context) => {
  const { privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    privateKeyEncoding: { format: 'pem', type: 'pkcs1' },
    publicKeyEncoding: { format: 'pem', type: 'spki' },
  });
  const env = {
    GITHUB_APP_CLIENT_ID: 'test-client',
    GITHUB_APP_INSTALLATION_ID: '123',
    GITHUB_APP_PRIVATE_KEY: privateKey,
  };
  let now = Date.now();
  let tokenRequests = 0;
  const authorization: (string | null)[] = [];
  context.mock.method(Date, 'now', () => now);
  const warn = context.mock.method(console, 'warn', () => {});
  const fetchGitHub: typeof fetch = async (url, options) => {
    if (String(url).endsWith('/access_tokens')) {
      tokenRequests++;
      if (tokenRequests === 1) {
        return Response.json(
          { message: 'sensitive response' },
          { status: 403 },
        );
      }
      return Response.json({
        token: 'installation-token',
        expires_at: new Date(now + 3_600_000).toISOString(),
      });
    }
    authorization.push(new Headers(options?.headers).get('authorization'));
    return Response.json({ stargazers_count: 12 });
  };
  context.mock.method(globalThis, 'fetch', fetchGitHub);

  assert.equal(await getGitHubStarCount(env), 12);
  assert.equal(await getGitHubStarCount(env), 12);
  assert.equal(tokenRequests, 1);
  assert.equal(warn.mock.callCount(), 1);
  assert.deepEqual(warn.mock.calls[0].arguments, [
    'GitHub App authentication failed',
    'HTTP 403',
  ]);

  now += 30_000;
  assert.equal(await getGitHubStarCount(env), 12);
  assert.equal(tokenRequests, 2);
  assert.deepEqual(authorization, [null, null, 'Bearer installation-token']);
});
