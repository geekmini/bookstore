# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static documentation website built with [Docsify](https://docsify.js.org/) for hosting multiple books in Markdown format. No build step required - pure client-side rendering.

## Development Commands

```bash
# Start local development server
npx docsify-cli serve .

# Or with specific port
npx docsify-cli serve . --port 3001
```

## Architecture

### Core Files
- `index.html` - Single entry point containing all Docsify configuration, plugins, and custom CSS
- `_sidebar.md` - Global sidebar navigation (book list)
- `_navbar.md` - Top navigation bar
- `.nojekyll` - Required for GitHub Pages deployment

### Book Structure
Each book lives in `books/<book-name>/` with:
- `README.md` - Book homepage/introduction
- `_sidebar.md` - Chapter navigation for that book
- `chapter*.md` - Individual chapters

### Adding a New Book
1. Create directory: `books/new-book/`
2. Add `README.md` (book intro) and `_sidebar.md` (chapter list)
3. Add chapter Markdown files
4. Update root `_sidebar.md` to include the new book link
5. Update root `_navbar.md` if needed

### Docsify Configuration
All configuration is in `index.html` within `window.$docsify`:
- Search, pagination, copy-code plugins enabled
- Code highlighting for: bash, python, javascript, typescript, json, yaml, markdown, java, go
- Chinese typography optimizations
- Hash-based routing for GitHub Pages compatibility

## Deployment

Designed for GitHub Pages:
1. Push to GitHub repository
2. Enable Pages in repository settings (use main branch)
3. Site available at `https://github.com/geekmini/bookstore`
