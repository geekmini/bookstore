# Bookstore documentation site

# Default recipe - show available commands
default:
    @just --list

# Start local development server
serve:
    npx docsify-cli serve . --open

# List all books
list-books:
    @ls -1 books/

# Show book structure
show-book name:
    @ls -1 books/{{name}}/
