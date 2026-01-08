#!/bin/bash
# Pre-commit hook script
# Runs linting, formatting, and tests before commit

set -e

echo "🔍 Running pre-commit checks..."

# Run lint-staged (handles formatting and linting)
npx lint-staged

# Run tests if they exist
if [ -f "backend/package.json" ]; then
  echo "🧪 Running backend tests..."
  cd backend && npm test --if-present && cd ..
fi

if [ -f "frontend/web/package.json" ]; then
  echo "🧪 Running frontend tests..."
  cd frontend/web && npm test --if-present && cd ../..
fi

echo "✅ Pre-commit checks passed!"
