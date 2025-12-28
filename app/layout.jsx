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
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="mr-4 inline">
                      <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792.242 14.007.003h-.097C12.125.003 10.45.09 8.758.323c-2.68.393-4.877 2.59-5.233 5.17-.306 2.258-.306 6.974 0 9.232.35 2.58 2.553 4.608 5.233 4.982 1.69.232 3.408.245 5.103.09 2.687-.393 4.954-2.426 5.304-5.004.306-2.259.306-6.975 0-9.233ZM20.646 14.98c-.328 2.4-2.508 4.3-4.938 4.63-1.633.22-3.299.24-4.94.09-2.43-.328-4.295-2.188-4.624-4.59-.275-2.054-.275-6.38 0-8.434.33-2.4 2.195-4.257 4.625-4.586 1.64-.24 3.306-.22 4.94.084 2.43.33 4.61 2.23 4.938 4.63.274 2.055.274 6.38 0 8.435Z"/>
                      <path d="M17.954 8.51c-.12 0-.237.004-.355.011-.584.036-1.24.25-1.477.548-.309.393-.397 1.048-.397 1.879v2.154h1.891c.503 0 .912.41.912.912v1.89h-2.803v6.372c0 .503-.41.913-.913.913h-1.89c-.503 0-.913-.41-.913-.913v-6.372H9.111V8.51c0-.218-.102-.436-.275-.57-.155-.12-.37-.17-.63-.14-.147.017-.295.037-.442.06-.503.074-.87.516-.796 1.02l.12.852c.074.503.516.87 1.02.796l.06-.009h.013c.008.001.016.002.025.003.03.004.061.007.093.01.086.008.176.012.267.012h.451v1.378c0 .433.17.842.479 1.15.308.307.716.479 1.15.479h1.89c.434 0 .842-.172 1.15-.48.308-.307.48-.716.48-1.149v-1.378h.452c.143 0 .284-.003.424-.01.506-.024.902-.45.877-.956-.024-.506-.45-.902-.956-.877-.102.005-.205.008-.308.008h-.49c-.12 0-.24-.005-.356-.011-.584-.036-1.24-.25-1.477-.548-.309-.393-.397-1.048-.397-1.879v-2.544c0-.831.088-1.486.397-1.879.237-.299.893-.513 1.477-.548.119-.007.237-.011.355-.011h1.89c.503 0 .913-.41.913-.913v-1.89c0-.504-.41-.913-.913-.913h-1.89Z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com/FOSSBilling" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="mr-4 inline">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://forum.fossbilling.org" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="mr-4 inline">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L1 23l6.71-1.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </a>
                  <a href="https://status.fossbilling.org/" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="mr-4 inline">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
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
