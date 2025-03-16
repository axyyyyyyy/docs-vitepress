import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ayy",
  description: "A VitePress Site",
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Notes', link: '/notes/' }
    ],

    sidebar: generateSidebar({
      documentRootPath: 'docs',
      scanStartPath: 'notes',
      resolvePath: '/notes/',
      useTitleFromFrontmatter: false,
      collapsed: false,
      sortMenusByName: true
    }),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/axyyyyyyy' }
    ],

    footer: {

    }
  }
})
