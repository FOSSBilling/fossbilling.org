import { Footer, Layout } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faMastodon, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import DocsNavbar from '../components/DocsNavbar'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'nextra-theme-docs/style.css'
import '../styles/globals.css'
import { Fragment } from 'react'

config.autoAddCss = false

export const metadata = {
  title: {
    template: '%s | FOSSBilling',
    default: 'FOSSBilling'
  },
  description: 'Empower your hosting business with FOSSBilling, the free and open-source solution for efficient billing and client management.'
}

const banner = (
  <Banner storageKey="0.7.2-release">
    🎉 FOSSBilling 0.7.2 is released!{' '}
    <a href="https://github.com/FOSSBilling/FOSSBilling/releases/latest" target="_blank">
      Read more →
    </a>
  </Banner>
)

const navbar = (
  <DocsNavbar
    key="navbar"
    logo={<span className="logo"></span>}
    projectLink="https://github.com/FOSSBilling/FOSSBilling"
    chatLink="https://fossbilling.org/discord"
  />
)

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site:domain" content="fossbilling.org" />
        <meta name="twitter:url" content="https://fossbilling.org" />
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          copyPageButton={false}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/FOSSBilling/FOSSBilling.org/blob/main"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          footer={
            <Footer key="footer">
              <div>
                <div className="mb-2">
                  <a href="mailto:hello@fossbilling.org" className="hover:text-gray-500 dark:hover:text-gray-300">hello@fossbilling.org</a>
                </div>
                <div className="mb-6">
                  <a href="/discord" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank" aria-label="Discord">
                    <FontAwesomeIcon icon={faDiscord} size="lg" className="mr-4" />
                  </a>
                  <a href="https://fosstodon.org/@fossbilling" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank" aria-label="Mastodon">
                    <FontAwesomeIcon icon={faMastodon} size="lg" className="mr-4" />
                  </a>
                  <a href="https://twitter.com/FOSSBilling" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank" aria-label="X (Twitter)">
                    <FontAwesomeIcon icon={faXTwitter} size="lg" className="mr-4" />
                  </a>
                  <a href="https://status.fossbilling.org/" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank" aria-label="Status page">
                    <FontAwesomeIcon icon={faServer} size="lg" className="mr-4" />
                  </a>
                </div>
                <p className="mt-6 text-xs">© {new Date().getFullYear()}, The FOSSBilling project. Content licensed under the <a href="https://github.com/FOSSBilling/fossbilling.org/blob/main/LICENSE" target="_blank">Apache 2.0 license</a>.</p>
              </div>
            </Footer>
          }
        >
          <Fragment key="content">{children}</Fragment>
        </Layout>
      </body>
    </html>
  )
}
