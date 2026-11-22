import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { getLatestStableRelease } from '../src/lib/releases.ts';
import type { Release } from '../src/lib/releases.ts';
import { GET as redirectToStable } from '../src/pages/downloads/stable.ts';

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});
const version = '0.8.8';
const github = `https://github.com/FOSSBilling/FOSSBilling/releases/download/${version}`;
const fixture = (
  download_url: string,
  overrides: Partial<Release> = {},
): Release => ({
  version,
  released_on: '2026-01-01',
  minimum_php_version: '8.2',
  download_url,
  size_bytes: 1024,
  is_prerelease: false,
  ...overrides,
});
function mockReleases(...releases: Release[]) {
  globalThis.fetch = async () =>
    Response.json({
      error_code: 0,
      result: Object.fromEntries(releases.map((r, i) => [i, r])),
    });
}

for (const url of [
  `${github}/FOSSBilling.zip`,
  `${github}/FOSSBilling-${version}.zip`,
  `https://download.fossbilling.org/releases/${version}/FOSSBilling-${version}.zip`,
]) {
  test(`accepts official release asset: ${url}`, async () => {
    const release = fixture(url);
    mockReleases(release);
    assert.deepEqual(await getLatestStableRelease(), release);
  });
}

for (const url of [
  `https://github.com/attacker/FOSSBilling/releases/download/${version}/FOSSBilling.zip`,
  `https://github.com/FOSSBilling/attacker/releases/download/${version}/FOSSBilling.zip`,
  `${github}/malware.zip`,
  `${github}/FOSSBilling-9.9.9.zip`,
  'https://github.com/FOSSBilling/FOSSBilling/releases/download/9.9.9/FOSSBilling.zip',
  `${github}/FOSSBilling.zip?download=attacker`,
  `${github}/FOSSBilling.zip#fragment`,
  `${github}/FOSSBilling.zip?`,
  `${github}/FOSSBilling.zip#`,
  `${github.replace('https://', 'https://attacker:password@')}/FOSSBilling.zip`,
  `${github.replace('github.com', 'github.com:8443')}/FOSSBilling.zip`,
  `${github.replace('github.com', 'github.com:443')}/FOSSBilling.zip`,
  `${github.replace('https:', 'http:')}/FOSSBilling.zip`,
  `${github.replace('github.com', 'github.com.attacker.example')}/FOSSBilling.zip`,
  `${github}/../../../../attacker/repo/releases/download/${version}/FOSSBilling.zip`,
  `${github}/%2e%2e/%2e%2e/FOSSBilling.zip`,
  `${github.replace('FOSSBilling/FOSSBilling', 'FOSSBilling%2fFOSSBilling')}/FOSSBilling.zip`,
  `${github.replaceAll('/', '\\')}/FOSSBilling.zip`,
  ` ${github}/FOSSBilling.zip`,
  `${github}/FOSSBilling.zip\n`,
  'https://download.fossbilling.org/FOSSBilling-preview.zip',
  `https://download.fossbilling.org/releases/${version}/evil.zip`,
  'https://download.fossbilling.org/releases/9.9.9/FOSSBilling-9.9.9.zip',
  'not a URL',
]) {
  test(`rejects untrusted release asset: ${JSON.stringify(url)}`, async () => {
    mockReleases(fixture(url));
    assert.equal(await getLatestStableRelease(), null);
  });
}

test('filters an attacker release and a prerelease while preserving the legitimate stable metadata', async () => {
  const stable = fixture(`${github}/FOSSBilling.zip`);
  mockReleases(
    fixture(
      'https://github.com/attacker/repo/releases/download/9.9.9/FOSSBilling.zip',
      { version: '9.9.9', released_on: '2026-03-01' },
    ),
    fixture(
      'https://github.com/FOSSBilling/FOSSBilling/releases/download/0.9.0-beta.1/FOSSBilling.zip',
      {
        version: '0.9.0-beta.1',
        released_on: '2026-02-01',
        is_prerelease: true,
      },
    ),
    stable,
  );
  assert.deepEqual(await getLatestStableRelease(), stable);
});

for (const unsafeVersion of [
  '../attacker',
  '.',
  '..',
  '0.8.8/../../attacker',
  '0.8.8%2f..',
  '0.8.8?foo',
  '0.8.8#foo',
]) {
  test(`rejects unsafe version: ${unsafeVersion}`, async () => {
    mockReleases(
      fixture(
        `https://github.com/FOSSBilling/FOSSBilling/releases/download/${unsafeVersion}/FOSSBilling.zip`,
        { version: unsafeVersion },
      ),
    );
    assert.equal(await getLatestStableRelease(), null);
  });
}

test('logs API errors and returns no release', async (t) => {
  const logError = t.mock.method(console, 'error', () => {});
  globalThis.fetch = async () => Response.json({ error_code: 7, result: null });

  assert.equal(await getLatestStableRelease(), null);
  assert.equal(logError.mock.callCount(), 1);
  assert.match(
    String(logError.mock.calls[0].arguments[1]),
    /API returned error code: 7/,
  );
});

test('selects the newest published stable release from an unordered feed', async () => {
  const oldest = fixture(`${github}/FOSSBilling.zip`);
  const newest = fixture(
    'https://github.com/FOSSBilling/FOSSBilling/releases/download/0.8.9/FOSSBilling-0.8.9.zip',
    { version: '0.8.9', released_on: '2026-02-01T00:00:00Z' },
  );
  const undated = fixture(`${github}/FOSSBilling.zip`, {
    released_on: 'unknown',
  });

  mockReleases(undated, newest, oldest);
  assert.deepEqual(await getLatestStableRelease(), newest);
});

test('redirects stable downloads to the validated release asset', async () => {
  const release = fixture(`${github}/FOSSBilling.zip`);
  mockReleases(release);
  const response = await redirectToStable();

  assert.equal(response.status, 302);
  assert.equal(response.headers.get('Location'), release.download_url);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
});

test('redirects to the GitHub release page when release metadata is unavailable', async (t) => {
  t.mock.method(console, 'error', () => {});
  globalThis.fetch = async () =>
    Response.json({ error_code: 503, result: null }, { status: 503 });
  const response = await redirectToStable();

  assert.equal(response.status, 302);
  assert.equal(
    response.headers.get('Location'),
    'https://github.com/FOSSBilling/FOSSBilling/releases/latest',
  );
});
