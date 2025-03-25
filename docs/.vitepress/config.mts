import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import tailwindcss from '@tailwindcss/vite'
import UnoCSS from 'unocss/vite'
import { localSearchOptions } from './theme/search/local-search'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ayy",
  description: "A VitePress Site",
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],
  transformPageData(pageData) {
    if (pageData.frontmatter.updatedAt) {
      pageData.lastUpdated = new Date(pageData.frontmatter.updatedAt).getTime();
    }
  },
  vite: {
    plugins: [
      UnoCSS()
    ],
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
    
  // 导航配置
  nav: [
    { text: '🏠 首页', link: '/' },
    { text: '📚 归档', link: '/archives' },
    { text: '🏷️ 标签', link: '/tags' },
    {
      text: '📝 笔记',
      items: [
        { text: '生活', link: '/notes/life' },
        { text: '学习', link: '/notes/learn' },
        { text: '工具', link: '/notes/tools' }
      ]
    }
  ],

    sidebar: generateSidebar([{
      documentRootPath: 'docs',
      scanStartPath: 'notes/life',
      resolvePath: '/notes/life/',
      collapsed: false,
      debugPrint: false
    },{
      documentRootPath: 'docs',
      scanStartPath: 'notes/learn',
      resolvePath: '/notes/learn/',
      useFolderLinkFromIndexFile: true,
      collapsed: false,
      debugPrint: false
    },{
      documentRootPath: 'docs',
      scanStartPath: 'notes/tools',
      resolvePath: '/notes/tools/',
      useFolderLinkFromIndexFile: true,
      collapsed: false,
      debugPrint: false
    }]),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/axyyyyyyy' }
    ],

    footer: {
      message: `Powered by <a target='_blank' href='https://vitepress.dev'>VitePress</a>`,
      copyright: `<a target='_blank' href='https://creativecommons.org/licenses/by/4.0/'>
        CC BY 4.0</a> | © ${new Date().getFullYear()}`
    },

    search: {
    // 本地离线搜索
      provider: 'local',
      options: localSearchOptions
    },

  }
})
