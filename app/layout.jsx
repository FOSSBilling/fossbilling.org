import { config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faMastodon, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faServer } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import GitHubStarButton from '../components/GitHubStarButton'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/globals.css'

config.autoAddCss = false

export const metadata = {
  title: {
    template: '%s | FOSSBilling',
    default: 'FOSSBilling'
  },
  description: 'Empower your hosting business with FOSSBilling, the free and open-source solution for efficient billing and client management.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site:domain" content="fossbilling.org" />
        <meta name="twitter:url" content="https://fossbilling.org" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()` }} />
      </head>
      <body className="min-h-screen bg-white dark:bg-[#111111] text-gray-900 dark:text-gray-100 antialiased">
        <div className="sticky top-0 z-30">
          <Banner />
          <Navbar starButton={<GitHubStarButton />} />
        </div>
        <main>{children}</main>
        <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
          <div className="content-container">
            <div className="mb-2">
              <a href="mailto:hello@fossbilling.org" className="hover:text-gray-500 dark:hover:text-gray-300">hello@fossbilling.org</a>
            </div>
            <div className="mb-6">
              <a href="/discord" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <FontAwesomeIcon icon={faDiscord} size="lg" className="mr-4" />
              </a>
              <a href="https://fosstodon.org/@fossbilling" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank" rel="noopener noreferrer" aria-label="Mastodon">
                <FontAwesomeIcon icon={faMastodon} size="lg" className="mr-4" />
              </a>
              <a href="https://twitter.com/FOSSBilling" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <FontAwesomeIcon icon={faXTwitter} size="lg" className="mr-4" />
              </a>
              <a href="https://status.fossbilling.org/" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank" rel="noopener noreferrer" aria-label="Status page">
                <FontAwesomeIcon icon={faServer} size="lg" className="mr-4" />
              </a>
            </div>
            <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()}, The FOSSBilling project. Content licensed under the <a href="https://github.com/FOSSBilling/fossbilling.org/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">Apache 2.0 license</a>.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
