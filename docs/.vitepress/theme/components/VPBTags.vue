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
  <div class="container max-w-screen-xl mx-auto px-4 py-8 md:px-8 lg:px-16">
    <!-- 头部标题区域 -->
    <div class="max-w-2xl mx-auto mb-10 text-center">
      <div class="mb-4 flex flex-col items-center justify-center">
        <span class="text-4xl font-extrabold tracking-tight text-primary">{{ theme.blog?.title || '' }} 标签</span>
      </div>
      <p class="text-base md:text-lg text-gray-600 dark:text-gray-400">
        {{ theme.blog?.description || '按标签浏览所有文章' }}
      </p>
    </div>
    
    <!-- 标签云区域 -->
    <div class="flex flex-wrap justify-center gap-3 mb-12">
      <button 
        v-for='(posts, tag) in tags' 
        @click='tagSwitcher(`${tag}`)' 
        class="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors duration-200 shadow-sm"
        :class="blogStore.selectedTag === tag 
          ? 'bg-primary text-white' 
          : 'bg-gray-100 dark:bg-gray-800 hover:bg-primary-light hover:text-white dark:hover:bg-primary-dark'"
      >
        <span>{{ tag }}</span>
        <span class="text-xs px-2 py-0.5 rounded-full bg-white/50 dark:bg-black/20">{{ posts.length }}</span>
      </button>
    </div>

    <!-- 选中标签的文章列表 -->
    <div v-if="blogStore.selectedTag" class="bg-gray-50 dark:bg-gray-800/20 rounded-lg p-6 shadow-sm">
      <!-- 标签标题 -->
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2 text-2xl font-bold text-primary">
          <span>#</span>
          <span>{{ blogStore.selectedTag }}</span>
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ tags[blogStore.selectedTag].length }} 篇文章
        </div>
      </div>

      <!-- 文章列表 -->
      <div class="space-y-3">
        <a 
          v-for='post in tags[blogStore.selectedTag]' 
          :href='withBase(post.url)'
          class="group flex items-center justify-between p-2 rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/30"
        >
          <div class="flex items-center gap-2">
            <div class="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary"></div>
            <span class="font-medium transition-colors group-hover:text-primary">
              {{ post.title }}
            </span>
          </div>
          <div v-if="post.date" class="text-sm text-gray-500 dark:text-gray-400">
            {{ post.date?.raw?.slice(5) || '' }}
          </div>
        </a>
      </div>
    </div>
    
    <!-- 空状态 -->
    <div v-else class="my-16 text-center bg-gray-50 dark:bg-gray-800/20 rounded-lg p-8">
      <div class="i-carbon-tag-group text-4xl mb-4 text-gray-400 dark:text-gray-600 mx-auto"></div>
      <p class="text-lg text-gray-500 dark:text-gray-400">请选择一个标签查看相关文章</p>
    </div>
  </div>
</template> 