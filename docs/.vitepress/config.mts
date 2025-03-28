import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'FRC',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quick Start', link: '/introduction' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is FCR', link: '/introduction' },
          {
            text: 'usage',
            link: '/usage',
          },
        ],
      },
      {
        text: 'demo',
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/llzzasdf89/frontend-components-repository',
      },
    ],
  },
})
