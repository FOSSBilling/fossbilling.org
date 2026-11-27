import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = () =>
  new Response('FOSSBilling Website Worker fork preview smoke test 33e78fe.\n');
