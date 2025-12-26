---
name: sync-book-info
description: Sync book information with the documentation site. Use when user creates a new book folder, adds chapters, asks to "sync book", "add book", "update book", "register book", wants to refresh sidebar/navbar, or references a book folder that no longer exists (removal).
---

# Sync Book Info Skill

Use this skill when the user:
- Creates a new book folder with markdown files in `books/`
- Adds new markdown files to an existing book folder
- Asks to "add a book", "update book", "sync book", "register book"
- Wants to refresh sidebar/navbar after modifying book content
- References a book folder that cannot be found (trigger removal cleanup)

## Workflow

### Step 1: Scan Books Directory
```bash
ls books/
ls books/<book-name>/
```
- For new books: folders missing `README.md` or `_sidebar.md`
- For existing books: compare current `.md` files with entries in `_sidebar.md`
- For missing books: folder referenced but doesn't exist → trigger removal

### Step 2: Analyze Book Content
- Read the first markdown file to extract:
  - Book title (from headers or content)
  - Author (if mentioned)
  - Brief description
- List all `.md` files (excluding README.md and _sidebar.md) to build chapter navigation

### Step 3: Create or Update Book Config Files

**`books/<book-name>/README.md`** (create if missing, preserve if exists):
```markdown
# Book Title

> Brief description or quote from the book

## 简介

Author and publication info if available.

## 目录

从左侧侧边栏选择章节开始阅读。
```

**`books/<book-name>/_sidebar.md`** (create or regenerate):
```markdown
- [返回首页](/)

- **Book Title**
  - [简介](/books/<book-name>/)
  - [Chapter 1](/books/<book-name>/file1.md)
  - [Chapter 2](/books/<book-name>/file2.md)
  ...
```

### Step 4: Update Global Config Files

Check if book already exists in global files. If not, add it.

**`_sidebar.md`** - Add/ensure book in list:
```markdown
- **书籍列表**
  - [Book Name](/books/<book-name>/)
```

**`_navbar.md`** - Add/ensure in navigation:
```markdown
- 书籍
  - [Book Name](/books/<book-name>/)
```

**`README.md`** - Add/ensure in book list section:
```markdown
## 书籍列表
- [Book Name](/books/<book-name>/) - Brief description
```

### Step 5: Remove Book (when folder not found)

When a referenced book folder doesn't exist:

1. **Remove from `_sidebar.md`**: Delete the line `- [Book Name](/books/<book-name>/)`
2. **Remove from `_navbar.md`**: Delete the line `- [Book Name](/books/<book-name>/)`
3. **Remove from `README.md`**: Delete the line in 书籍列表 section
4. **Confirm with user** before deletion if uncertain

## Scenarios

| Scenario                    | Actions                                                      |
| --------------------------- | ------------------------------------------------------------ |
| New book folder             | Create README.md, _sidebar.md; Update all global files       |
| New chapters added          | Regenerate _sidebar.md with new files                        |
| Book renamed                | Update _sidebar.md title; Update global files                |
| Book folder removed/missing | Remove from global _sidebar.md, _navbar.md, README.md        |
| User @ non-existent book    | Detect missing folder, trigger removal from all global files |

## Notes
- Always regenerate `_sidebar.md` based on actual files in the folder
- Preserve existing README.md content if it exists (don't overwrite)
- Keep chapter names descriptive (use page ranges, chapter titles, or content-based names)
- Use Chinese for UI text (简介, 返回首页, etc.)
- When removing, scan all global files to ensure complete cleanup
