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
  <div class="mx-auto max-w-screen-xl px-6 py-8 lg:px-16 lg:py-16">
    <!-- 头部标题区域 -->
    <div class="mx-auto mb-10 max-w-screen-sm text-center lg:mb-16">
      <div class="mb-4 flex flex-col items-center justify-center text-4xl font-extrabold tracking-tight text-[--vp-c-brand-light] dark:text-[--vp-c-brand-dark] lg:text-4xl">
        <span>{{ theme.blog?.title || '' }} 标签</span>
      </div>
      <p class="font-light text-[--vp-c-text-light-1] dark:text-[--vp-c-text-dark-1] sm:text-xl">
        {{ theme.blog?.description || '按标签浏览所有文章' }}
      </p>
    </div>
    
    <!-- 标签云区域 -->
    <div class="flex flex-wrap justify-center gap-3 mb-12">
      <button 
        v-for='(posts, tag) in tags' 
        @click='tagSwitcher(`${tag}`)' 
        class="px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 bg-gray-50 dark:bg-gray-800/20 hover:bg-[--vp-c-brand-light] hover:text-white dark:hover:bg-[--vp-c-brand-dark] shadow-sm transition-all duration-200"
        :class="{'bg-[--vp-c-brand-light] text-white dark:bg-[--vp-c-brand-dark]': blogStore.selectedTag === tag}"
      >
        <span>{{ tag }}</span>
        <span class="text-xs px-2 py-0.5 rounded-full bg-gray-200/70 dark:bg-gray-700/70">{{ posts.length }}</span>
      </button>
    </div>

    <!-- 选中标签的文章列表 -->
    <div v-if="blogStore.selectedTag" class="rounded-lg bg-gray-50 p-6 shadow-sm dark:bg-gray-800/20">
      <!-- 标签标题 -->
      <div class="mb-4 border-b border-gray-200 pb-3 text-2xl font-bold text-[--vp-c-brand-light] dark:border-gray-700 dark:text-[--vp-c-brand-dark] flex items-center justify-between">
        <div class="flex items-center space-x-2">
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
          class="group flex items-center justify-between rounded-md p-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/30"
        >
          <div class="flex items-center space-x-2">
            <div class="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-[--vp-c-brand-light] dark:bg-gray-600 dark:group-hover:bg-[--vp-c-brand-dark]"></div>
            <span class="font-medium transition-colors group-hover:text-[--vp-c-brand-dark] dark:group-hover:text-[--vp-c-brand-light]">
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
    <div v-else class="my-16 rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-800/20">
      <p class="text-lg text-gray-500 dark:text-gray-400">请选择一个标签查看相关文章</p>
    </div>
  </div>
</template> 