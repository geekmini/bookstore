---
description: Format markdown files using professional typography rules. Accepts a file or folder path.
arguments:
  - name: path
    description: File or folder path to format (relative or absolute)
    required: true
---

Format markdown files at the specified path using the `markdown-aesthetics-expert` agent.

## Input
- **Path**: $ARGUMENTS.path

## Rules

### Files to Skip
Always skip these files (they have special purposes and should not be auto-formatted):
- `_sidebar.md`
- `_navbar.md`
- `README.md`
- `404.md`
- `about.md`
- `CLAUDE.md`

### Execution Strategy

1. **Determine scope**: Check if the path is a file or directory.
   - If it's a single `.md` file (and not in the skip list), process it directly.
   - If it's a directory, find all `.md` files recursively, excluding the skip list.

2. **Group files for parallel processing**:
   - Group markdown files into batches of 3-5 files each.
   - This allows efficient parallel processing without overwhelming the system.

3. **Launch parallel agents**:
   - Use the `Task` tool with `subagent_type: markdown-aesthetics-expert` and `run_in_background: true`.
   - Launch multiple agents in a **single message** to ensure true parallel execution.
   - Each agent handles one batch of files.

4. **Wait for completion**:
   - Use `TaskOutput` with `block: true` to wait for all agents to complete.
   - Only report whether all tasks completed successfully or if any failed.
   - Do NOT report detailed results from each agent.

## Example Usage

```
/format-markdown books/my-book/
/format-markdown books/my-book/chapter1.md
/format-markdown .
```

## Output

Report only:
- Total number of markdown files found
- Number of files skipped
- Number of agents launched
- Final status: "All files formatted successfully" or "Some files failed to format"
