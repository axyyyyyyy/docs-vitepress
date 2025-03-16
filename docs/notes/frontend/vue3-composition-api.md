---
title: Vue3 Composition API 基础
---

# Vue3 Composition API 基础

## 什么是 Composition API

Composition API 是 Vue3 中新增的特性，它提供了一种更灵活的方式来组织组件的逻辑。

## 核心概念

### 1. setup 函数

```js
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    onMounted(() => {
      console.log('组件已挂载')
    })

    return {
      count
    }
  }
}
```

### 2. 响应式引用

- ref：用于基本类型
- reactive：用于对象类型

### 3. 生命周期钩子

在 Composition API 中，生命周期钩子需要手动导入：

- onMounted
- onUpdated
- onUnmounted
- 等等... 