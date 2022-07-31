// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FOSSBilling Documentation',
  url: 'https://docs.fossbilling.org',
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
          routeBasePath: '/',
          breadcrumbs: false,
          sidebarPath: require.resolve('./sidebars.js'),
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/fossbilling/docs/blob/main/',
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
        externalUrlRegex: 'fossbilling\.org|github\.com',
  
        // Optional: Algolia search parameters
        searchParameters: {},
  
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        // The text that appears in the search box input when there is no query.
        placeholder: 'Search our documentation'
      },
      announcementBar: {
        id: 'contribute',
        content:
          '<b>We are looking for new people to join our team, join <a href="https://fossbilling.org/discord" target="_blank">our Discord server</a> if you are interested.</b>',
        backgroundColor: '#4cb3d4',
        textColor: '#fafafa',
        isCloseable: false,
      },
      navbar: {
        title: 'FOSSBilling Documentation',
        logo: {
          alt: 'FOSSBilling logo',
          src: 'img/fossbilling.png',
        },
        items: [
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/fossbilling',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://fossbilling.org/discord',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/fossbilling',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/fossbilling/fossbilling',
              },
            ],
          },
        ],
        copyright: `FOSSBilling`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    },
};

module.exports = config;
