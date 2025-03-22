---
title: 
date: 2025-03-15
published: false
tags: []
createdAt: 2025-03-15 18:25
updatedAt: 2025-03-16 17:01
---

## 创建项目

使用命令行界面 (CLI) 终端

```sh
pnpm add -D vitepress
pnpm vitepress init
```

初始化配置选项:

```
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◇  Theme:
│  Default Theme + Customization
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
└  Done! Now run pnpm run docs:dev and start writing.

Tips:
- Since you've chosen to customize the theme, you should also explicitly install vue as a dev dependency.

```

> 提示: 选择自定义主题后，应显式安装Vue作为开发依赖。

项目结构
```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

### 自定义美化

#### 首页布局设计
./docs/index.md:

```markdown
---

# https://vitepress.dev/reference/default-theme-home-page

layout: home

  

hero:

  name: "Ayy's NoteBase"

  text: "A VitePress Site"

  tagline: A place to record life, knowledge, and imagination.

  image:

    src: /index.png

    alt: VitePress

  actions:

    - theme: brand

      text: 开始阅读

      link: /

  #   - theme: alt

  #     text: API Examples

  #     link: /api-examples

  

features:

  - title: 多样的主题和内容

    details: 本知识库和所生成的页面均由创作者们维护，涉及到生活中各方面知识和内容，也不乏我们的回忆和畅想。

    icon: 🌈

  - title: 皆为 Markdown

    details: 使用 Markdown 和 Markdown 拓展语法编写和记录笔记，每一个页面都是 Markdown 文件。

    icon: 📃

  - title: 由 VitePress 驱动

    details: 基于 Vite 的强大静态文档页面生成器，它生成了我们知识库的页面，提供了简单易用的主题和工具。

    icon: 🚀

---
```

### 导航栏配置

安装自动侧边栏工具:
```
pnpm i -D vitepress-sidebar
```

docs\.vitepress\config.mts

```
import { generateSidebar } from 'vitepress-sidebar'

export default defineConfig({

  themeConfig: {


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

  }

})

```


### 文章的最后更新使用自定义字段
```
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
```

### 引入 tailwindcss 4.0

style.css
```
@import "tailwindcss";
```
.vitepress/config.mts
```
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({

//.....
  vite: {

    // @ts-ignore - 忽略类型错误

    plugins: [tailwindcss()],

  }
  
//.....
})

```
### 归档页面

创建post.data.ts
```
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

        author: frontmatter.author  ?? 'ayyy',

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
```

useArchives.ts
```
import { Post, data as posts } from './posts.data'

  

export function useArchives() {

  const postsByYear = [] as Post[][]

  let year = '0'

  let num = -1

  for (let i = 0; i < posts.length; i++) {

    const post = posts[i]

    console.log(post)

    if (post.date) {

      const y = post.date.raw.split('-')[0]

      if (y === year) {

        postsByYear[num].push(post)

      } else {

        num++

        postsByYear[num] = [] as Array<Post>

        postsByYear[num].push(post)

        year = y

      }

    }

    console.log(postsByYear)

  }

  return { postsByYear }

}
```

归档页面组件VPBArchives.vue
```
<script setup lang="ts">

import { useData, withBase } from 'vitepress'

import { useArchives } from '../composables/useArchives'

  

const { postsByYear } = useArchives()

const { theme } = useData()

  

</script>

  

<template>

  <div class="mx-auto max-w-screen-xl px-6 py-8 lg:px-16 lg:py-16">

    <div class="mx-auto mb-10 max-w-screen-sm text-center lg:mb-16">

      <div

        class="mb-4 flex flex-col items-center justify-center text-4xl font-extrabold tracking-tight text-[--vp-c-brand-light] dark:text-[--vp-c-brand-dark] lg:text-4xl"

      >

        <span>{{ theme.blog?.title || '' }} 归档</span>

      </div>

      <p

        class="font-light text-[--vp-c-text-light-1] dark:text-[--vp-c-text-dark-1] sm:text-xl"

      >

        {{ theme.blog?.description || '所有文章的时间归档' }}

      </p>

    </div>

  

    <div v-if="postsByYear && postsByYear.length > 0" class="space-y-8">

      <div v-for="(year, yearIndex) in postsByYear" :key="yearIndex" class="rounded-lg bg-gray-50 p-6 shadow-sm dark:bg-gray-800/20">

        <div

          class="mb-4 border-b border-gray-200 pb-3 text-2xl font-bold text-[--vp-c-brand-light] dark:border-gray-700 dark:text-[--vp-c-brand-dark]"

        >

          {{ year[0]?.date?.raw?.split('-')[0] || '未知年份' }}

        </div>

        <div class="space-y-3">

          <a

            v-for="(post, index) in year"

            :key="index"

            :href="withBase(post.url)"

            class="group flex items-center justify-between rounded-md p-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/30"

          >

            <div class="flex items-center space-x-2">

              <div class="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-[--vp-c-brand-light] dark:bg-gray-600 dark:group-hover:bg-[--vp-c-brand-dark]"></div>

              <span class="font-medium transition-colors group-hover:text-[--vp-c-brand-dark] dark:group-hover:text-[--vp-c-brand-light]">

                {{ post.title }}

              </span>

            </div>

            <div class="text-sm text-gray-500 dark:text-gray-400">

              {{ post.date?.raw?.slice(5) || '未知日期' }}

            </div>

          </a>

        </div>

      </div>

    </div>

    <div v-else class="my-16 rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-800/20">

      <p class="text-lg text-gray-500 dark:text-gray-400">暂无文章</p>

    </div>

  </div>

</template>
```

引入组件

index.ts
```
// components

import VPBArchives from './components/VPBArchives.vue'

  

export default {

  extends: DefaultTheme,

  Layout: () => {

    return h(DefaultTheme.Layout, null, {

      // https://vitepress.dev/guide/extending-default-theme#layout-slots

    })

  },

  enhanceApp({ app, router, siteData }) {

    // ...

    app.component('VPBArchives', VPBArchives)

  }

} satisfies Theme
```

### 添加本地搜索功能

1. 创建本地搜索配置文件：

```typescript
// .vitepress/config/search/local-search.ts
import type { DefaultTheme } from 'vitepress'

export const localSearchOptions: DefaultTheme.LocalSearchOptions = {
  locales: {
    root: {
      translations: {
        button: {
          buttonText: '搜索文档',
          buttonAriaLabel: '搜索文档'
        },
        modal: {
          noResultsText: '无法找到相关结果',
          resetButtonTitle: '清除查询条件',
          footer: {
            selectText: '选择',
            navigateText: '切换'
          }
        }
      }
    }
  }
}
```

3. 在 `config.ts` 中启用搜索功能：
```typescript
import { localSearchOptions } from './config/search/local-search'

export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local',
      options: localSearchOptions
    }
  }
})
```

### 2. 添加标签功能

1. 创建数据处理相关文件：

```bash
mkdir -p docs/.vitepress/theme/composables
touch docs/.vitepress/theme/composables/store.ts
touch docs/.vitepress/theme/composables/useTags.ts
```

2. 实现状态管理 `store.ts`：
```typescript
import { reactive } from 'vue'

const blogStore = reactive({
  selectedTag: '',
})

export default blogStore
```

3. 实现标签处理逻辑 `useTags.ts`：
```typescript
import { Post } from './posts.data'

type Data = { [key: string]: Post[] };

export function initTags(posts: Post[]): Data {
  const data: Data = {};
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const tags = post.tags;
    if (Array.isArray(tags)) {
      tags.forEach(tag => {
        if (!data[tag]) {
          data[tag] = [];
        }
        data[tag].push(post);
      });
    }
  }
  
  return Object.fromEntries(Object.entries(data).sort());
}
```

4. 创建标签云组件 `VPBTags.vue`：
```vue
<script setup lang='ts'>
import { withBase, useData } from 'vitepress';
import blogStore from '../composables/store'
import { initTags } from '../composables/useTags'
import { data as posts } from '../composables/posts.data'

const tags = initTags(posts)
const { theme } = useData()

function tagSwitcher(tag: string) {
  blogStore.selectedTag = tag
}
</script>

<template>
  <!-- 标签云组件模板 -->
</template>
```

5. 注册组件到主题：
```typescript
// docs/.vitepress/theme/index.ts
import VPBTags from './components/VPBTags.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('VPBTags', VPBTags)
  }
}
```

6. 创建标签页面：
```markdown
<!-- docs/tags.md -->
---
layout: page
---

<VPBTags />
```

### 3. 添加归档功能

1. 创建归档数据处理文件：
```bash
touch docs/.vitepress/theme/composables/useArchives.ts
```

2. 实现归档逻辑：
```typescript
import { Post, data as posts } from './posts.data'

export function useArchives() {
  const postsByYear = [] as Post[][]
  let year = '0'
  let num = -1
  
  for (const post of posts) {
    if (post.date) {
      const y = post.date.raw.split('-')[0]
      if (y === year) {
        postsByYear[num].push(post)
      } else {
        num++
        postsByYear[num] = [post]
        year = y
      }
    }
  }
  
  return { postsByYear }
}
```

3. 创建归档组件：
```bash
touch docs/.vitepress/theme/components/VPBArchives.vue
```

4. 注册归档组件：
```typescript
// docs/.vitepress/theme/index.ts
import VPBArchives from './components/VPBArchives.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('VPBArchives', VPBArchives)
  }
}
```

5. 创建归档页面：
```markdown
<!-- docs/archives.md -->
---
layout: page
---

<VPBArchives />
```

### 4. 添加导航链接

在 `config.ts` 中添加导航配置：

```typescript
export default defineConfig({
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/archives' },
      { text: '标签', link: '/tags' }
    ]
  }
})
```

### 5. 文章 Frontmatter 规范

为确保功能正常运行，文章需遵循以下 frontmatter 格式：

```yaml
---
title: 文章标题
date: YYYY-MM-DD
tags: ['标签1', '标签2']
published: true
createdAt: YYYY-MM-DD HH:mm
updatedAt: YYYY-MM-DD HH:mm
---
```

## 功能实现流程

### 1. 添加本地搜索功能

1. 创建配置文件目录：
```bash
mkdir -p docs/.vitepress/config/search
```

2. 创建本地搜索配置文件 `local-search.ts`：
```typescript
// .vitepress/config/search/local-search.ts
import type { DefaultTheme } from 'vitepress'

export const localSearchOptions: DefaultTheme.LocalSearchOptions = {
  locales: {
    root: {
      translations: {
        button: {
          buttonText: '搜索文档',
          buttonAriaLabel: '搜索文档'
        },
        modal: {
          noResultsText: '无法找到相关结果',
          resetButtonTitle: '清除查询条件',
          footer: {
            selectText: '选择',
            navigateText: '切换'
          }
        }
      }
    }
  }
}
```

3. 在 `config.ts` 中启用搜索功能：
```typescript
import { localSearchOptions } from './config/search/local-search'

export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local',
      options: localSearchOptions
    }
  }
})
```

### 2. 添加标签功能

1. 创建数据处理相关文件：

```bash
mkdir -p docs/.vitepress/theme/composables
touch docs/.vitepress/theme/composables/store.ts
touch docs/.vitepress/theme/composables/useTags.ts
```

2. 实现状态管理 `store.ts`：
```typescript
import { reactive } from 'vue'

const blogStore = reactive({
  selectedTag: '',
})

export default blogStore
```

3. 实现标签处理逻辑 `useTags.ts`：
```typescript
import { Post } from './posts.data'

type Data = { [key: string]: Post[] };

export function initTags(posts: Post[]): Data {
  const data: Data = {};
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const tags = post.tags;
    if (Array.isArray(tags)) {
      tags.forEach(tag => {
        if (!data[tag]) {
          data[tag] = [];
        }
        data[tag].push(post);
      });
    }
  }
  
  return Object.fromEntries(Object.entries(data).sort());
}
```

4. 创建标签云组件 `VPBTags.vue`：
```vue
<script setup lang='ts'>
import { withBase, useData } from 'vitepress';
import blogStore from '../composables/store'
import { initTags } from '../composables/useTags'
import { data as posts } from '../composables/posts.data'

const tags = initTags(posts)
const { theme } = useData()

function tagSwitcher(tag: string) {
  blogStore.selectedTag = tag
}
</script>

<template>
  <!-- 标签云组件模板 -->
</template>
```

5. 注册组件到主题：
```typescript
// docs/.vitepress/theme/index.ts
import VPBTags from './components/VPBTags.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('VPBTags', VPBTags)
  }
}
```

6. 创建标签页面：
```markdown
<!-- docs/tags.md -->
---
layout: page
---

<VPBTags />
```

### 3. 添加归档功能

1. 创建归档数据处理文件：
```bash
touch docs/.vitepress/theme/composables/useArchives.ts
```

2. 实现归档逻辑：
```typescript
import { Post, data as posts } from './posts.data'

export function useArchives() {
  const postsByYear = [] as Post[][]
  let year = '0'
  let num = -1
  
  for (const post of posts) {
    if (post.date) {
      const y = post.date.raw.split('-')[0]
      if (y === year) {
        postsByYear[num].push(post)
      } else {
        num++
        postsByYear[num] = [post]
        year = y
      }
    }
  }
  
  return { postsByYear }
}
```

3. 创建归档组件：
```bash
touch docs/.vitepress/theme/components/VPBArchives.vue
```

4. 注册归档组件：
```typescript
// docs/.vitepress/theme/index.ts
import VPBArchives from './components/VPBArchives.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('VPBArchives', VPBArchives)
  }
}
```

5. 创建归档页面：
```markdown
<!-- docs/archives.md -->
---
layout: page
---

<VPBArchives />
```

### 4. 添加导航链接

在 `config.ts` 中添加导航配置：

```typescript
export default defineConfig({
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/archives' },
      { text: '标签', link: '/tags' }
    ]
  }
})
```

### 5. 文章 Frontmatter 规范

为确保功能正常运行，文章需遵循以下 frontmatter 格式：

```yaml
---
title: 文章标题
date: YYYY-MM-DD
tags: ['标签1', '标签2']
published: true
createdAt: YYYY-MM-DD HH:mm
updatedAt: YYYY-MM-DD HH:mm
---
```











