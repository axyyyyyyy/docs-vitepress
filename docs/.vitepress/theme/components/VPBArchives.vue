<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { useArchives } from '../composables/useArchives'

const { postsByYear } = useArchives()
const { theme } = useData()

</script>

<template>
  <div class="container max-w-screen-xl mx-auto px-4 py-8 md:px-8 lg:px-16">
    <!-- 头部标题区域 -->
    <div class="max-w-2xl mx-auto mb-10 text-center">
      <div class="mb-4 flex flex-col items-center justify-center">
        <span class="text-4xl font-extrabold tracking-tight text-primary">{{ theme.blog?.title || '' }} 归档</span>
      </div>
      <p class="text-base md:text-lg text-gray-600 dark:text-gray-400">
        {{ theme.blog?.description || '所有文章的时间归档' }}
      </p>
    </div>

    <!-- 年份归档列表 -->
    <div v-if="postsByYear && postsByYear.length > 0" class="space-y-6">
      <div 
        v-for="(year, yearIndex) in postsByYear" 
        :key="yearIndex" 
        class="bg-gray-50 dark:bg-gray-800/20 rounded-lg p-6 shadow-sm"
      >
        <!-- 年份标题 -->
        <div class="flex items-center mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
          <span class="text-2xl font-bold text-primary flex items-center gap-2">
            <i class="i-carbon-calendar text-xl"></i>
            {{ year[0]?.date?.raw?.split('-')[0] || '未知年份' }}
          </span>
        </div>
        
        <!-- 文章列表 -->
        <div class="space-y-3">
          <a
            v-for="(post, index) in year"
            :key="index"
            :href="withBase(post.url)"
            class="group flex items-center justify-between p-2 rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/30"
          >
            <div class="flex items-center gap-2">
              <div class="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary"></div>
              <span class="font-medium transition-colors group-hover:text-primary">
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
    
    <!-- 空状态 -->
    <div v-else class="my-16 text-center bg-gray-50 dark:bg-gray-800/20 rounded-lg p-8">
      <div class="i-carbon-calendar text-4xl mb-4 text-gray-400 dark:text-gray-600 mx-auto"></div>
      <p class="text-lg text-gray-500 dark:text-gray-400">暂无文章</p>
    </div>
  </div>
</template>