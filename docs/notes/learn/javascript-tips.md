---
title: JavaScript 实用技巧集锦
description: 收集整理常用的 JavaScript 编程技巧和最佳实践
date: 2025-03-22
createdAt: 2025-03-22 18:26
updatedAt: 2024-08-19 07:53
tags: ['JavaScript', '编程技巧', '最佳实践']
published: true
status: published
author: ayyy
---

# JavaScript 实用技巧集锦

## 1. 数组去重的多种方法

### 使用 Set

```javascript
const array = [1, 2, 3, 3, 4, 4, 5];
const uniqueArray = [...new Set(array)];
console.log(uniqueArray); // [1, 2, 3, 4, 5]
```

### 使用 filter

```javascript
const array = [1, 2, 3, 3, 4, 4, 5];
const uniqueArray = array.filter((item, index) => array.indexOf(item) === index);
```

## 2. 优雅的条件判断

### 使用对象映射替代 if-else

```javascript
const fruits = {
  apple: '🍎',
  banana: '🍌',
  orange: '🍊'
};

const getFruit = (name) => fruits[name] || '未知水果';
```

## 3. 异步操作的最佳实践

### async/await 错误处理

```javascript
async function fetchData() {
  try {
    const response = await fetch('api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('数据获取失败:', error);
    return null;
  }
}
```

持续更新中... 