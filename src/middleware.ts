import { defineMiddleware } from 'astro:middleware';

const SECURITY_HEADERS: Record<string, string> = {
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
};

export const onRequest = defineMiddleware(async (context, next) => {
  const nonce = crypto.randomUUID();
  context.locals.nonce = nonce;

  const response = await next();

  response.headers.set(
    'Content-Security-Policy',
    `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self' 'nonce-${nonce}' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://raw.githubusercontent.com; font-src 'self' data:; connect-src 'self' https://api.github.com https://api.fossbilling.net`,
  );
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  return response;
});
