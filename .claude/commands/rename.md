---
description: Rename book chapter files from pages_XXXX-YYYY.md to Chinese chapter names
args:
  filename:
    description: The current filename (e.g., pages_0001-0010.md)
    type: string
    required: true
---

# Rename Book Chapter Command

This command renames book chapter files from the generic `pages_XXXX-YYYY.md` format to meaningful Chinese chapter names based on the content.

## Process

1. Read the specified file to analyze its content
2. Identify the main themes and chapter structure:
   - Look for the first few level 2 headings (##)
   - Determine the primary topic
3. Generate an appropriate Chinese chapter name following the pattern: `{chapter_number}-{main_topic}.md`
   - Use 01, 02, 03... for chapter numbers
   - Extract the most representative topic from the content
4. Rename the file using git mv to preserve history
5. Update the book's `_sidebar.md` to reflect the new filename
6. If the file is referenced in other places (like global `_sidebar.md` or `README.md`), update those as well

## Naming Guidelines

- **Format**: `{chapter_number}-{topic}.md`
  - Example: `01-序章-祖师源流.md`
  - Example: `02-基础心法.md`
  - Example: `03-修炼要诀-呼吸法门.md`

- **Chapter Number**:
  - Use two digits with leading zero (01, 02, etc.)
  - Derived from the original page range (pages_0001-0010 → 01)

- **Topic Selection**:
  - Use the most prominent theme from the content
  - If multiple themes exist, use a hyphen to combine (e.g., 序章-祖师源流)
  - Keep it concise but descriptive

## Example

```bash
# Before
pages_0001-0010.md

# After
01-序章-祖师源流.md
```

## Implementation Steps

1. **Validate input**: Verify the file exists and follows the `pages_XXXX-YYYY.md` pattern
2. **Read and analyze**: Read the file content to identify main themes and topics
   - Extract the first few level 2 headings (##)
   - Determine the most representative topic
3. **Generate new name**: Create appropriate Chinese chapter name
   - Format: `{chapter_number}-{topic}.md`
   - Chapter number derived from page range (e.g., pages_0001-0010 → 01)
4. **Rename file**: Execute rename using `git mv` (preserves history) or `mv`
5. **Update book's _sidebar.md**:
   - Replace the old filename reference with new one
   - Update the display name to match the chapter theme
   - Format: `[主题名](/books/{book-name}/{new-filename})`
6. **Update global README.md**:
   - Check if the book is listed in the root README.md
   - Update any direct chapter references (if any)
   - Generally README.md only links to book homepage, so updates here are rare
7. **Update global _sidebar.md**:
   - Check if there are any direct chapter references in the global sidebar
   - Usually only book homepage is referenced, so updates are typically not needed
8. **Verify all changes**: Confirm all references are updated correctly
