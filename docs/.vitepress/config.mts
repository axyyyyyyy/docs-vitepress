import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import tailwindcss from '@tailwindcss/vite'
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
    // @ts-ignore - 忽略类型错误
    plugins: [tailwindcss()],
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
    {
      text: '📝 笔记',
      items: [
        { text: '后端', link: '/notes/backend' },
        { text: '前端', link: '/notes/frontend' },
        { text: '学习', link: '/notes/learn' }
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
    },{
      documentRootPath: 'docs',
      scanStartPath: 'notes/learn',
      resolvePath: '/notes/learn/',
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
