# Bookstore documentation site

# Default recipe - show available commands
default:
    @just --list

# Start local development server
serve:
    npx docsify-cli serve .

# Start server on specific port
serve-port port="3001":
    npx docsify-cli serve . --port {{port}}

# List all books
list-books:
    @ls -1 books/

# Show book structure
show-book name:
    @ls -1 books/{{name}}/
