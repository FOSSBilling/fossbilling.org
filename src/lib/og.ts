export interface OgPage {
  title: string;
  description: string;
}

export const ogPages: Record<string, OgPage> = {
  index: {
    title: 'Free and open source hosting automation',
    description:
      'Empower your hosting business with FOSSBilling, the free and open-source solution for efficient billing and client management.',
  },
  downloads: {
    title: 'Downloads',
    description:
      'Download the latest version of FOSSBilling and start managing your hosting business.',
  },
  demo: {
    title: 'Demo',
    description:
      'Explore the FOSSBilling admin and client panels with our interactive demo.',
  },
  '404': {
    title: 'Page not found',
    description: "The page you're looking for doesn't exist.",
  },
};

const DEFAULT_ROUTE = 'index';

export function ogRouteFor(pathname: string): string {
  const trimmed = pathname.replace(/^\/+|\/+$/g, '');
  if (!trimmed) return DEFAULT_ROUTE;
  const segment = trimmed.split('/')[0]!;
  return Object.prototype.hasOwnProperty.call(ogPages, segment)
    ? segment
    : DEFAULT_ROUTE;
}

export function ogImageUrlFor(pathname: string): string {
  return `https://fossbilling.org/og-image/${ogRouteFor(pathname)}.png`;
}
