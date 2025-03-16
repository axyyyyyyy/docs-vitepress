---
date: 2024-08-10
createdTime: 2024-08-10 08:57
lastEditedTime: 2024-08-11 12:38
publish: false
---
https://redis.com.cn/commands/keys.html
https://www.redis.net.cn/order/3535.html

## 键（key）命令

### keys 查找所有符合给定模式(pattern)的 key

> keys pattern

时间复杂度O(n)，不建议在生产环境中使用。*如果需要一个寻找键空间中的key子集，考虑使用 SCAN 或 sets。*

**返回值**
数组: 以数组的形式返回匹配模式 pattern 的 key 的列表。

%% 可用版本 >= 1.0.0.  %%

### del 用于删除给定的一个或多个 key
> del key_name

用于删除给定的一个或多个key，不存在的key会被忽略。

**返回值**
整数: 被删除 key 的数量。

