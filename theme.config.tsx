import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub, faTwitter, faMastodon } from '@fortawesome/free-brands-svg-icons'
import { faMessage, faSignal } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import React from "react";

export default {
    docsRepositoryBase: 'https://github.com/FOSSBilling/FOSSBilling.org/blob/main',
    color: {
      hue: { dark: 200, light: 200 },
    },
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
        key: 'mollie',
        content: <a href="https://github.com/NerdbyteIO/FOSSBilling-CyberPanel" target="_blank">
          ⭐️ There's now a community maintained integration for CyberPanel! Click here to check it out.
        </a>,
    },
    feedback: {
        content: undefined
    },
    sidebar: {
        defaultMenuCollapseLevel: 1
    },
    head: function useHead() {
      const config = useConfig()
      const { route } = useRouter()

      const title = config.title + (route === '/' ? '' : ' | FOSSBilling')

      return (
        <>
          <title>{title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="Content-Language" content="en" />
          <meta
            name="description"
            content="Empower your hosting business with FOSSBilling, the free and open-source solution for efficient billing and client management."
          />
          <meta
            name="og:description"
            content="Empower your hosting business with FOSSBilling, the free and open-source solution for efficient billing and client management."
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="" />
          <meta name="twitter:site:domain" content="fossbilling.org" />
          <meta name="twitter:url" content="https://fossbilling.org" />
          <meta property="og:title" content={title} />
          <meta name="og:image" content="" />
          <meta name="apple-mobile-web-app-title" content="FOSSBilling" />
        </>
      )
    },
    footer: {
        content: () => {
         return (
            <div>
              <div className="mb-2">
                <a href="mailto:hello@fossbilling.org" className="hover:text-gray-500 dark:hover:text-gray-300">hello@fossbilling.org</a>
              </div>
              <div className="mb-6">
                <a href="/discord" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank"><FontAwesomeIcon icon={faDiscord} size="xl" className="mr-4" /></a>
                <a href="https://fosstodon.org/@fossbilling" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank"><FontAwesomeIcon icon={faMastodon} size="xl" className="mr-4" /></a>
                <a href="https://twitter.com/FOSSBilling" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank"><FontAwesomeIcon icon={faTwitter} size="xl" className="mr-4" /></a>
                <a href="https://forum.fossbilling.org" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank"><FontAwesomeIcon icon={faMessage} size="xl" className="mr-4" /></a>
                <a href="https://status.fossbilling.org/" className="hover:text-gray-500 dark:hover:text-gray-300" target="_blank"><FontAwesomeIcon icon={faSignal} size="xl" className="mr-4" /></a>
              </div>
              <p className="mt-6 text-xs">© {new Date().getFullYear()}, The FOSSBilling project. Content licensed under the <a href="https://github.com/FOSSBilling/fossbilling.org/blob/main/LICENSE" target="_blank">Apache 2.0 license</a>.</p>
            </div>
        )
      }
    },
  }
