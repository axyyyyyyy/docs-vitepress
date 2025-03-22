---
title: Git 高级使用技巧
description: 掌握 Git 高级操作和工作流程，提升版本控制效率
date: 2025-03-22
createdAt: 2025-03-22 20:15
updatedAt: 2024-08-19 09:30
tags: ['Git', '版本控制', '开发工具']
published: false
status: draft
author: ayyy
---

# Git 高级使用技巧

## 1. Git Rebase 的艺术

### 交互式 rebase

```bash
# 对最近的 3 个提交进行交互式 rebase
git rebase -i HEAD~3
```

常用操作：
- `pick`：保留该提交
- `reword`：修改提交信息
- `squash`：将提交合并到前一个提交
- `fixup`：合并到前一个提交，丢弃提交信息
- `drop`：删除该提交

## 2. Git Stash 进阶操作

```bash
# 保存当前修改，包含未跟踪的文件
git stash -u

# 保存时添加说明信息
git stash save "feature/login 开发中断"

# 查看 stash 列表
git stash list

# 应用特定的 stash
git stash apply stash@{2}

# 删除特定的 stash
git stash drop stash@{0}
```

## 3. Git Submodule 使用

### 添加子模块

```bash
# 添加子模块
git submodule add https://github.com/example/repo.git

# 初始化子模块
git submodule init

# 更新子模块
git submodule update --remote
```

## 4. Git Hooks 实战

### pre-commit 钩子示例

```bash
#!/bin/sh
# .git/hooks/pre-commit

# 运行代码格式化
npm run format

# 运行 lint 检查
npm run lint

# 运行测试
npm run test
```

## 5. 常用配置技巧

```bash
# 设置全局 .gitignore
git config --global core.excludesfile ~/.gitignore_global

# 设置提交模板
git config --global commit.template ~/.gitmessage

# 配置别名
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status
```

持续更新中... 