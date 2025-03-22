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