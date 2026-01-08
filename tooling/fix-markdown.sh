#!/bin/bash
# Auto-fix markdown linting issues

set -e

echo "📝 Fixing markdown linting issues..."

# Run markdownlint-cli2 with auto-fix (only on project files, not node_modules)
npx markdownlint-cli2 --fix "**/*.md" "!**/node_modules/**" "!**/dist/**" "!**/build/**" "!**/.git/**" || true

# Run Prettier on markdown files
npx prettier --write "**/*.md" "!**/node_modules/**" "!**/dist/**" "!**/build/**" --ignore-path .prettierignore || true

echo "✅ Markdown files fixed!"
