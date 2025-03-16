import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ayy",
  description: "A VitePress Site",
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],
  transformPageData(pageData) {
    if (pageData.frontmatter.updatedAt) {
      pageData.lastUpdated = new Date(pageData.frontmatter.updatedAt).getTime();
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      },
    },
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'notes',
        items: [
          { text: 'backend', link: '/notes/backend' },
          { text: 'frontend ', link: '/notes/frontend' },
          { text: 'learn', link: '/notes/learn' }
        ]
      }
    ],

    sidebar: generateSidebar([{
      documentRootPath: 'docs',
      scanStartPath: 'notes/backend',
      resolvePath: '/notes/backend/',
      collapsed: false,
      debugPrint: false
    },{
      documentRootPath: 'docs',
      scanStartPath: 'notes/frontend',
      resolvePath: '/notes/frontend/',
      useFolderLinkFromIndexFile: true,
      collapsed: false,
      debugPrint: false
    }]),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/axyyyyyyy' }
    ],

    footer: {

    }
  }
})
