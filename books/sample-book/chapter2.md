# 第二章：进阶技巧

本章将介绍一些进阶的使用技巧。

## 2.1 使用表格

Markdown 支持表格语法：

| 功能 | 描述 | 状态 |
|------|------|------|
| 搜索 | 全文搜索 | 已支持 |
| 导航 | 侧边栏导航 | 已支持 |
| 主题 | 自定义主题 | 已支持 |

## 2.2 使用图片

你可以在文档中插入图片：

```markdown
![图片描述](/assets/images/example.png)
```

图片会自动居中并支持点击放大。

## 2.3 使用提示框

> **注意**: 这是一个重要的提示。

> **警告**: 请注意这个操作可能有风险。

## 2.4 多语言代码

支持多种编程语言的语法高亮：

**Python:**
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

**Go:**
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

## 2.5 小结

本章我们学习了：

- 如何使用表格
- 如何插入图片
- 如何使用提示框
- 多语言代码展示
