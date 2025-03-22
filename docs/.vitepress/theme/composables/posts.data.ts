import { createContentLoader } from 'vitepress'
import { formatDistance } from 'date-fns'

interface Post {
  title: string
  description?: string
  author: string
  url: string
  tags: string[]
  date: {
    raw: string
    time: number
    formatted: string
    since: string
  }
  published: boolean
  status: string
  createdAt?: {
    raw: string
    time: number
    formatted: string
    since: string
  }
  updatedAt?: {
    raw: string
    time: number
    formatted: string
    since: string
  }
}

declare const data: Post[]
export { Post, data }

export default createContentLoader('notes/**/*.md', {
  excerpt: true,
  transform(raw) {
    return raw
    .map(({ url, frontmatter, excerpt }) => {
      // console.log('处理文章:', url)
      // console.log('Frontmatter:', JSON.stringify(frontmatter, null, 2))
      
      // 从 URL 中提取文件名作为后备标题
      const fallbackTitle = url.split('/').pop()?.replace(/\.md$/, '') ?? 'Untitled'
      
      return {
        title: frontmatter.title ?? fallbackTitle,
        description: frontmatter.description,
        author: frontmatter.author  ?? 'ayyy',
        url,
        tags: formatTags(frontmatter.tags),
        date: formatDate(frontmatter.date),
        published: frontmatter.published !== false,
        status: frontmatter.status ?? 'draft',
        createdAt: frontmatter.createdAt ? formatDate(frontmatter.createdAt) : undefined,
        updatedAt: frontmatter.updatedAt ? formatDate(frontmatter.updatedAt) : undefined,
      }
    })
      .sort((a, b) => b.date.time - a.date.time)
  },
})

function formatDate(raw: string) {
  console.log('Raw date:', raw)
  if (raw === undefined) {
    return {
      raw: '',
      time: 0,
      formatted: '',
      since: ''
    }
  }
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    raw: date.toISOString().split('T')[0],
    time: +date,
    formatted: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    since: formatDistance(date, new Date(), { addSuffix: true }),
  }
}

function formatTags(raw: string | string[]) {
  if (typeof raw === 'string') {
    if (raw.includes(',')) {
      return raw.split(',').map((value) => value.trim())
    }
    return [raw]
  }
  if (Array.isArray(raw)) {
    return raw
  }
  return []
}