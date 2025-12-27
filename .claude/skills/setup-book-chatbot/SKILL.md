---
name: setup-book-chatbot
description: Set up chatbot configuration for a book. Use when user wants to "add chatbot", "setup chatbot", "enable chatbot for book", or configure AI assistant for a specific book.
---

# Setup Book Chatbot Skill

Use this skill when the user wants to:
- Add a chatbot to a book
- Set up AI assistant for a book
- Configure chatbot settings for a book
- Enable the chat feature for a book

## Workflow

### Step 1: Identify the Book

Check which book needs chatbot setup:
```bash
ls books/
```

If multiple books exist and user hasn't specified, ask which book to configure.

### Step 2: Gather Information via AskUserQuestion

Use the AskUserQuestion tool to collect the following information:

**Question 1: Book Title (for Dify)**
```
What is the display name of this book for the AI assistant?
Example: "炁體源流"
```

**Question 2: Assistant Name**
```
What should the chatbot assistant be called?
Example: "炁體源流助手"
```

**Question 3: Assistant Description**
```
What is the assistant's specialty/subtitle?
Example: "专注于道家内丹修炼经典"
```

**Question 4: Welcome Title**
```
What welcome title should be shown?
Example: "欢迎阅读《炁體源流》"
```

**Question 5: Welcome Message**
```
What welcome message should greet users?
Example: "我是本书的专属问答助手，可以帮您解答关于道家内丹修炼的问题，解读书中经典章节，或解释丹道术语。请问有什么可以帮您的？"
```

### Step 3: Create _chatbot.json

Create the configuration file at `books/<book-name>/_chatbot.json`:

```json
{
  "enabled": true,
  "bookTitle": "<book title from Q1>",
  "title": "<assistant name from Q2>",
  "subtitle": "<description from Q3>",
  "welcomeTitle": "<welcome title from Q4>",
  "welcomeMessage": "<welcome message from Q5>"
}
```

### Step 4: Remind User About Dify Knowledge Base

After creating the config, remind the user:

```
Chatbot configuration created!

IMPORTANT: To complete setup, ensure you have:
1. Uploaded this book's content as a Knowledge Base in Dify
2. Added the Knowledge Base to your Dify App

The chatbot will appear on this book's pages after deployment.
```

## Configuration Fields Reference

| Field | Description | Example |
|-------|-------------|---------|
| `enabled` | Whether chatbot is active | `true` |
| `bookTitle` | Book name sent to Dify (for context) | "炁體源流" |
| `title` | Chatbot header title | "炁體源流助手" |
| `subtitle` | Chatbot header subtitle | "专注于道家内丹修炼经典" |
| `welcomeTitle` | Welcome card title | "欢迎阅读《炁體源流》" |
| `welcomeMessage` | Welcome card message | "我是本书的专属问答助手..." |

## Example Output

For a book at `books/dao-de-jing/`:

```json
{
  "enabled": true,
  "bookTitle": "道德经",
  "title": "道德经助手",
  "subtitle": "老子智慧解读",
  "welcomeTitle": "欢迎阅读《道德经》",
  "welcomeMessage": "我是本书的专属问答助手，可以帮您解读老子的智慧，理解道家哲学思想。请问有什么可以帮您的？"
}
```

## Notes

- The `bookTitle` is passed to Dify as `book_title` input variable
- Chatbot only appears on book pages (not homepage)
- Each book has independent chat history stored in localStorage
- If `_chatbot.json` doesn't exist or `enabled: false`, chatbot won't appear
