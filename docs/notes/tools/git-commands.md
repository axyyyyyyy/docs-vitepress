---
title: 常用 Git 命令
---

# Git 常用命令速查表

## 仓库操作

```bash
# 初始化仓库
git init

# 克隆仓库
git clone <repository-url>
```

## 基本操作

```bash
# 查看状态
git status

# 添加文件到暂存区
git add <file>
git add .  # 添加所有文件

# 提交更改
git commit -m "提交信息"
```

## 分支操作

```bash
# 查看分支
git branch

# 创建分支
git branch <branch-name>

# 切换分支
git checkout <branch-name>
git switch <branch-name>  # Git 2.23+ 新语法

# 合并分支
git merge <branch-name>
```

## 远程操作

```bash
# 推送到远程
git push origin <branch-name>

# 拉取更新
git pull origin <branch-name>
``` 