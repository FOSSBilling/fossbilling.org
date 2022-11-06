// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FOSSBilling',
  url: 'https://fossbilling.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/docs',
          breadcrumbs: true,
          sidebarPath: require.resolve('./sidebars.ts'),
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/fossbilling/fossbilling.org/blob/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      algolia: {
        // Algolia DocSearch configuration. See https://docusaurus.io/docs/search#using-algolia-docsearch for full documentation
        // The application ID provided by Algolia
        appId: 'F4VVX366PN',
  
        // Public API key: it is safe to commit it
        apiKey: 'd2e44ef06cc9ad30c4cb582e93e5753e',
  
        indexName: 'fossbilling',
  
        // Optional: Ensures that search results are relevant to the current language and version.
        contextualSearch: true,
  
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'github\.com',
  
        // Optional: Algolia search parameters
        searchParameters: {},
  
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        // The text that appears in the search box input when there is no query.
        placeholder: 'Search our documentation'
      },
      announcementBar: {
        id: 'announcementBar-1', // Increment on change
        content:
          '<b>We are looking for new people to join the community, join <a href="https://fossbilling.org/discord" target="_blank">our Discord server</a> if you are interested.</b>',
        backgroundColor: '#0081c5',
        textColor: '#fafafa',
        isCloseable: true,
      },
      navbar: {
        logo: {
          alt: 'FOSSBilling logo',
          src: 'img/logo-black.svg',
          srcDark: 'img/logo-white.svg',
        },
        items: [
          // Left
          {
            href: '/docs',
            label: 'Docs',
            position: 'left',
          },
          {
            href: 'https://github.com/sponsors/FOSSBilling',
            label: 'Donate',
            position: 'left',
          },
          // Right
          {
            type: 'localeDropdown',
            position: 'right',
            dropdownItemsAfter: [
              {
                type: 'html',
                value: '<hr style="margin: 0.3rem 0;">',
              },
              {
                href: 'https://translate.fossbilling.org',
                label: 'Help us translate',
              },
            ],
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Get started',
            items: [
              {
                label: 'Installation',
                href: '/docs/category/getting-started',
              },
              {
                label: 'Web server configuration',
                href: 'https://config.fossbilling.org',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://fossbilling.org/discord',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Open Collective',
                href: 'https://opencollective.com/FOSSBilling',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/FOSSBilling/FOSSBilling',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/FOSSBilling',
              },
            ],
          },
        ],
        copyright: `<a href="https://github.com/FOSSBilling/fossbilling.org" target="_blank">Help us improve the website!</a><br />Copyright © 2022 The FOSSBilling Team.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    },

    plugins: [
      [
        '@docusaurus/plugin-client-redirects',
        {
          redirects: [
            {
              to: '/docs/category/getting-started',
              from: '/docs/getting-started',
            },
          ],
        },
      ],
    ],
  };

module.exports = config;
