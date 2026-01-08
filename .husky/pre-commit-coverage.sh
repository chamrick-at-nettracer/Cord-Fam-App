#!/bin/sh
# Pre-commit hook that enforces 90% test coverage

# Run lint-staged (handles formatting, linting, and markdown fixes)
npx lint-staged

# Run tests with coverage requirements (blocking)
BACKEND_COVERAGE_PASS=false
FRONTEND_COVERAGE_PASS=false

if [ -f "backend/package.json" ]; then
  echo "🧪 Running backend tests with coverage..."
  cd backend
  npm run test:coverage > /tmp/backend-coverage.log 2>&1
  if grep -q "All files.*[9-9][0-9]\|All files.*100" /tmp/backend-coverage.log; then
    echo "✅ Backend coverage meets 90% threshold"
    BACKEND_COVERAGE_PASS=true
  else
    echo "❌ Backend coverage below 90% threshold"
    cat /tmp/backend-coverage.log
  fi
  cd ..
fi

if [ -f "frontend/web/package.json" ]; then
  echo "🧪 Running frontend tests with coverage..."
  cd frontend/web
  npm run test:coverage > /tmp/frontend-coverage.log 2>&1
  if grep -q "All files.*[9-9][0-9]\|All files.*100" /tmp/frontend-coverage.log; then
    echo "✅ Frontend coverage meets 90% threshold"
    FRONTEND_COVERAGE_PASS=true
  else
    echo "❌ Frontend coverage below 90% threshold"
    cat /tmp/frontend-coverage.log
  fi
  cd ../..
fi

# Check if both passed (or if one doesn't exist, that's ok)
if [ -f "backend/package.json" ] && [ "$BACKEND_COVERAGE_PASS" = false ]; then
  echo "❌ Pre-commit failed: Backend coverage below 90%"
  exit 1
fi

if [ -f "frontend/web/package.json" ] && [ "$FRONTEND_COVERAGE_PASS" = false ]; then
  echo "❌ Pre-commit failed: Frontend coverage below 90%"
  exit 1
fi

echo "✅ Pre-commit checks completed!"
exit 0
