# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static documentation website built with [Docsify](https://docsify.js.org/) for hosting multiple books in Markdown format. No build step required - pure client-side rendering.

## Development Commands

Using [just](https://github.com/casey/just) command runner:

```bash
just              # Show available commands
just serve        # Start local dev server
just serve-port 3001  # Start on specific port
just list-books   # List all books
```

Or directly with npx:

```bash
npx docsify-cli serve .
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

### Syncing Book Info
Use the skill in `.claude/skills/sync-book-info/` - it automates:
1. Creating `README.md` and `_sidebar.md` for new books
2. Updating global `_sidebar.md`, `_navbar.md`, and `README.md`
3. Removing entries for deleted book folders

The user only needs to create the book folder with markdown content files, then ask to "sync book".

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
