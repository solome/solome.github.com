// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '掬一捧',
  tagline: '掬一捧清水窥明月',
  url: 'https://solome.js.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'solome', // Usually your GitHub org/user name.
  projectName: 'solome.github.com', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/solome/solome.github.com',
        },

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        // title: '掬一捧',
        logo: {
          alt: '掬一捧清水窥明月',
          src: 'img/juyipeng_min.png',
        },
        items: [
          // {
          //   type: 'doc',
          //   docId: 'intro',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          { to: 'https://solome.js.org/blog', label: '博客', position: 'right' },
          { to: 'https://solome.js.org/storybook', label: 'Storybook', position: 'right' },
          { to: 'https://solome.js.org/slides', label: 'Slides', position: 'right' },

          {
            href: 'https://github.com/solome',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Docs',
          //   items: [
          //     {
          //       label: 'Tutorial',
          //       to: '/docs/intro',
          //     },
          //   ],
          // },
          // {
          //   title: 'Community',
          //   items: [
          //     // {
          //     //   label: 'Stack Overflow',
          //     //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
          //     // },
          //     // {
          //     //   label: 'Discord',
          //     //   href: 'https://discordapp.com/invite/docusaurus',
          //     // },

          //   ],
          // },
          {
            title: '外链推荐',
            items: [
              {
                label: '卡拉云低代码工具',
                to: 'https://kalacloud.com/',
              },
              {
                label: '中州韻輸入法引擎',
                href: 'https://rime.im/',
              },
              {
                label: '汉典',
                href: 'https://rime.im/',
              },

            ],
          },
          {
            title: 'More',
            items: [
              {
                label: '博客',
                to: 'https://solome.js.org/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/solome',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/juyipeng',
              },
            ],
          },
        ],
        copyright: `Copyright © 2012-${new Date().getFullYear()} 掬一捧`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
