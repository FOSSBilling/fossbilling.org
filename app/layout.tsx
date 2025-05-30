import { Analytics } from '@vercel/analytics/react';
import { Layout, Navbar, Footer } from 'nextra-theme-docs';
import { Banner, Head, Search } from 'nextra/components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub, faTwitter, faMastodon } from '@fortawesome/free-brands-svg-icons';
import { faMessage, faSignal } from "@fortawesome/free-solid-svg-icons";
import { getPageMap } from 'nextra/page-map';
import { config } from '@fortawesome/fontawesome-svg-core';
import type { Metadata, Viewport } from 'next';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import '../style.css'; 
import '../styles/globals.css';
import 'nextra-theme-docs/style.css';

const navbarProps = {
  logo: <>
          <span className="logo"></span>
        </>,
  projectLink: 'https://github.com/FOSSBilling/FOSSBilling',
  projectIcon: <FontAwesomeIcon icon={faGithub} size="xl" />,
  chatLink: 'https://fossbilling.org/discord',
  chatIcon: <FontAwesomeIcon icon={faDiscord} size="xl" />,
};

const bannerProps = {
  storageKey: 'mollie',
  children: (
    <a href="https://github.com/NerdbyteIO/FOSSBilling-CyberPanel" target="_blank" rel="noopener noreferrer">
      ⭐️ There's now a community maintained integration for CyberPanel! Click here to check it out.
    </a>
  ),
};

const SiteFooter = () => {
  return (
    <div>
      <div className="mb-2">
        <a href="mailto:hello@fossbilling.org" className="hover:text-gray-500 dark:hover:text-gray-300">hello@fossbilling.org</a>
      </div>
      <div className="mb-6">
        <a href="/discord" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faDiscord} size="xl" className="mr-4" /></a>
        <a href="https://fosstodon.org/@fossbilling" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faMastodon} size="xl" className="mr-4" /></a>
        <a href="https://twitter.com/FOSSBilling" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} size="xl" className="mr-4" /></a>
        <a href="https://forum.fossbilling.org" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faMessage} size="xl" className="mr-4" /></a>
        <a href="https://status.fossbilling.org/" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faSignal} size="xl" className="mr-4" /></a>
      </div>
      <p className="mt-6 text-xs">© {new Date().getFullYear()}, The FOSSBilling project. Content licensed under the <a href="https://github.com/FOSSBilling/fossbilling.org/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">Apache 2.0 license</a>.</p>
    </div>
  );
};

export const metadata: Metadata = {
  title: {
    default: 'FOSSBilling',
    template: '%s | FOSSBilling',
  },
  description: "Empower your hosting business with FOSSBilling, the free and open-source solution for efficient billing and client management.",
  openGraph: {
    title: {
      default: 'FOSSBilling',
      template: '%s | FOSSBilling',
    },
    description: "Empower your hosting business with FOSSBilling, the free and open-source solution for efficient billing and client management.",
    images: [
      {
        url: ''
      },
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: "summary_large_image",
    site: "@FOSSBilling",
    images: [''],
  },
  appleWebApp: {
     title: "FOSSBilling",
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0
}

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap();
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head
        color={{
          hue: { dark: 200, light: 200 }
        }}
      />
      <body>
        <Layout
          banner={<Banner {...bannerProps} />}
          navbar={<Navbar {...navbarProps} />}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/FOSSBilling/FOSSBilling.org/blob/main" 
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          feedback={{ content: undefined }}
          footer={<Footer><SiteFooter /></Footer>}
        >
          {children}
        </Layout>
        <Analytics />
      </body>
    </html>
  );
}
