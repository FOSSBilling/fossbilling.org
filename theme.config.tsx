import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub, faTwitter, faMastodon } from '@fortawesome/free-brands-svg-icons'

import { useRouter } from "next/router";
import React from "react";

export default {
    docsRepositoryBase: 'https://github.com/FOSSBilling/FOSSBilling.org/blob/main',
    primaryHue: { dark: 200, light: 200 },
    logo: (
      <>
        <span className="logo"></span>
      </>
    ),
    project: {
        link: 'https://github.com/FOSSBilling/FOSSBilling',
        icon: <FontAwesomeIcon icon={faGithub} size="xl" />,
    },
    chat: {
        link: 'https://fossbilling.org/discord',
        icon: <FontAwesomeIcon icon={faDiscord} size="xl" />,
    },
    banner: {
        key: '0.1.1-release',
        text: <a href="https://github.com/FOSSBilling/FOSSBilling/releases/latest" target="_blank">
          🎉 FOSSBilling 0.1.1 is released. Read more →
        </a>,
    },
    feedback: {
        content: undefined
    },
    sidebar: {
        defaultMenuCollapseLevel: 1
    },
    footer: {
        text: () => {
         return (
            <div>
              <div className="mb-6">
                <a href="/discord" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank"><FontAwesomeIcon icon={faDiscord} size="xl" className="mr-4" /></a>
                <a href="https://fosstodon.org/@fossbilling" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank"><FontAwesomeIcon icon={faMastodon} size="xl" className="mr-4" /></a>
                <a href="https://twitter.org/FOSSBilling" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank"><FontAwesomeIcon icon={faTwitter} size="xl" className="mr-4" /></a>
              </div>
              <p className="mt-6 text-xs">© {new Date().getFullYear()}, The FOSSBilling project. Content licensed under the <a href="https://github.com/FOSSBilling/fossbilling.org/blob/main/LICENSE" target="_blank">Apache 2.0 license</a>.</p>
            </div>
        )
      }
    },
    useNextSeoProps() {
        const { route } = useRouter()
        if (route !== '/') {
          return {
            titleTemplate: '%s | FOSSBilling'
          }
        }
      },
  }