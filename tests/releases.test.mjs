import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { getLatestStableRelease } from '../src/lib/releases.ts';

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});
const version = '0.8.8';
const github = `https://github.com/FOSSBilling/FOSSBilling/releases/download/${version}`;
const fixture = (download_url, overrides = {}) => ({
  version,
  released_on: '2026-01-01',
  minimum_php_version: '8.2',
  download_url,
  size_bytes: 1024,
  is_prerelease: false,
  ...overrides,
});
function mockReleases(...releases) {
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({
      error_code: 0,
      result: Object.fromEntries(releases.map((r, i) => [i, r])),
    }),
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
    assert.deepEqual(await getLatestStableRelease(), { release, error: null });
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
    assert.deepEqual(await getLatestStableRelease(), {
      release: null,
      error: null,
    });
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
  assert.deepEqual(await getLatestStableRelease(), {
    release: stable,
    error: null,
  });
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
    assert.deepEqual(await getLatestStableRelease(), {
      release: null,
      error: null,
    });
  });
}

test('retains API error semantics', async () => {
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({ error_code: 7, result: {} }),
  });
  const result = await getLatestStableRelease();
  assert.equal(result.release, null);
  assert.equal(result.error.message, 'API returned error code: 7');
});
