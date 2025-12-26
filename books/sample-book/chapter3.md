# 第三章：最佳实践

本章总结一些最佳实践建议。

## 3.1 文档组织

推荐的文档组织方式：

```
books/
├── my-book/
│   ├── README.md      # 书籍首页/简介
│   ├── _sidebar.md    # 章节目录
│   ├── chapter1.md    # 第一章
│   ├── chapter2.md    # 第二章
│   └── images/        # 书籍专用图片
│       └── fig1.png
```

## 3.2 命名规范

- 使用小写字母和连字符命名文件：`chapter-01.md`
- 避免使用空格和特殊字符
- 保持命名简短但有意义

## 3.3 图片管理

建议：

1. 每本书有自己的 `images` 文件夹
2. 使用有意义的图片名称
3. 优化图片大小，减少加载时间

## 3.4 添加新书籍

添加新书籍的步骤：

1. 在 `books/` 下创建新目录
2. 添加 `README.md` 作为书籍首页
3. 添加 `_sidebar.md` 配置章节
4. 编写各章节的 Markdown 文件
5. 更新根目录的 `_sidebar.md` 添加书籍链接

## 3.5 部署到 GitHub Pages

1. 创建 GitHub 仓库
2. 上传所有文件
3. 在仓库设置中启用 GitHub Pages
4. 选择 `main` 分支作为源
5. 访问 `https://yourusername.github.io/bookstore/`

## 3.6 总结

恭喜！你已经掌握了使用 Bookstore 的所有技巧。现在开始添加你自己的书籍吧！

---

**祝阅读愉快！**
