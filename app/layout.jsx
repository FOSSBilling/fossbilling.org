import { Footer, Layout } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { config } from '@fortawesome/fontawesome-svg-core'
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
  <Banner storageKey="0.7.0-release">
    🎉 FOSSBilling 0.7.0 is released!{' '}
    <a href="https://github.com/FOSSBilling/FOSSBilling/releases/latest" target="_blank">
      Read more →
    </a>
  </Banner>
)

const navbar = (
  <DocsNavbar
    key="navbar"
    logo={
      <>
        <span className="logo"></span>
      </>
    }
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
                  <a href="/discord" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="mr-4 inline">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3603.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                    </svg>
                  </a>
                  <a href="https://fosstodon.org/@fossbilling" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank">
                    <svg width={24} height={24} viewBox="0 0 448 512" fill="currentColor" className="mr-4 inline">
                      <path d="M433 179.1c0-97.2-63.7-125.7-63.7-125.7-62.5-28.7-228.6-28.4-290.5 0 0 0-63.7 28.5-63.7 125.7 0 115.7-6.6 259.4 105.6 289.1 40.5 10.7 75.3 13 103.3 11.4 50.8-2.8 79.3-18.1 79.3-18.1l-1.7-36.9s-36.3 11.4-77.1 10.1c-40.4-1.4-83-4.4-89.6-54-.6-4.6-.9-9.3-.9-13.9 85.6 20.9 158.7 9.1 178.7 6.7 56.1-6.7 105-41.3 111.2-72.9 9.8-49.8 9-121.5 9-121.5zM357.9 304.3l-46.6 0 0-114.2c0-49.7-64-51.6-64 6.9l0 62.5-46.3 0 0-62.5c0-58.5-64-56.6-64-6.9l0 114.2-46.7 0c0-122.1-5.2-147.9 18.4-175 25.9-28.9 79.8-30.8 103.8 6.1l11.6 19.5 11.6-19.5c24.1-37.1 78.1-34.8 103.8-6.1 23.7 27.3 18.4 53 18.4 175l0 0z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com/FOSSBilling" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="mr-4 inline">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://forum.fossbilling.org" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank">
                    <svg width={24} height={24} viewBox="0 0 512 512" fill="currentColor" className="mr-4 inline">
                      <path d="M0 352L0 128C0 75 43 32 96 32l320 0c53 0 96 43 96 96l0 224c0 53-43 96-96 96l-120 0c-5.2 0-10.2 1.7-14.4 4.8L166.4 539.2c-4.2 3.1-9.2 4.8-14.4 4.8-13.3 0-24-10.7-24-24l0-72-32 0c-53 0-96-43-96-96z"/>
                    </svg>
                  </a>
                  <a href="https://status.fossbilling.org/" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank">
                    <svg width={24} height={24} viewBox="0 0 512 512" fill="currentColor" className="mr-4 inline">
                      <path d="M488 56c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 400c0 13.3 10.7 24 24 24s24-10.7 24-24l0-400zM360 128c-13.3 0-24 10.7-24 24l0 304c0 13.3 10.7 24 24 24s24-10.7 24-24l0-304c0-13.3-10.7-24-24-24zM280 248c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 208c0 13.3 10.7 24 24 24s24-10.7 24-24l0-208zM152 320c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zM48 384c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24s24-10.7 24-24l0-48c0-13.3-10.7-24-24-24z"/>
                    </svg>
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
