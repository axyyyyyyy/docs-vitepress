---
title: Vue3 组合式 API 实战指南
description: 深入理解 Vue3 组合式 API 的使用方法和最佳实践
date: 2025-03-22
createdAt: 2025-03-22 19:30
updatedAt: 2024-08-19 08:15
tags: ['Vue3', '组合式API', '前端开发']
published: false
status: draft
author: ayyy
---

# Vue3 组合式 API 实战指南

## 1. 响应式数据的声明和使用

### ref 和 reactive

```vue
<script setup>
import { ref, reactive } from 'vue'

// 使用 ref 声明基础类型数据
const count = ref(0)

// 使用 reactive 声明对象类型数据
const user = reactive({
  name: '张三',
  age: 25,
  hobbies: ['读书', '游泳']
})

// 修改数据
const incrementCount = () => {
  count.value++
}

const updateUser = () => {
  user.age = 26
  user.hobbies.push('跑步')
}
</script>
```

## 2. 生命周期钩子

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('组件已挂载')
  // 执行初始化操作
})

onUnmounted(() => {
  console.log('组件已卸载')
  // 执行清理操作
})
</script>
```

## 3. 计算属性和监听器

```vue
<script setup>
import { ref, computed, watch } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

// 计算属性
const fullName = computed(() => {
  return firstName.value + lastName.value
})

// 监听器
watch(firstName, (newValue, oldValue) => {
  console.log(`firstName 从 ${oldValue} 变为 ${newValue}`)
})
</script>
```

## 待补充内容

- 依赖注入（provide/inject）
- 组合式函数（Composables）
- 自定义指令
- 性能优化技巧 