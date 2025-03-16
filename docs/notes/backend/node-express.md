---
title: Express 框架入门
---

# Express 框架入门指南

## 安装和基本设置

```bash
npm init -y
npm install express
```

## 创建基本服务器

```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`)
})
```

## 中间件使用

Express 的中间件是其核心特性之一：

```javascript
app.use(express.json()) // 处理 JSON 请求体
app.use(express.urlencoded({ extended: true })) // 处理表单数据
```

## 路由处理

```javascript
// 创建路由
const router = express.Router()

router.get('/users', (req, res) => {
  res.json({ users: [] })
})

// 使用路由
app.use('/api', router)
``` 