# E2E Tests Quick Reference

This directory contains end-to-end tests for the Cord-Fam-App web frontend.

**⚠️ Important:** E2E tests are NOT run in pre-commit hooks (they're too slow). Run them manually before pushing or in CI/CD.

## Quick Start

```bash
# Make sure backend and frontend are running first!
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend/web && npm run dev

# Terminal 3: Run E2E tests
cd frontend/web && npm run test:e2e
```

## Test Files

- `auth.spec.ts` - Authentication flows (login, register, logout)
- `dashboard.spec.ts` - Dashboard functionality (channels, messages)

## Common Commands

```bash
# Run all tests
npm run test:e2e

# Run tests with browser visible
npm run test:e2e:headed

# Run tests in interactive UI mode
npm run test:e2e:ui

# Debug tests step-by-step
npm run test:e2e:debug

# Run specific test file
npx playwright test e2e/auth.spec.ts

# View test report
npx playwright show-report
```

## Writing New Tests

1. Create a new `.spec.ts` file in this directory
2. Import `test` and `expect` from `@playwright/test`
3. Use `test.describe()` to group related tests
4. Use `test.beforeEach()` for setup (e.g., login)
5. Write tests that simulate real user behavior

Example:

```typescript
import { test, expect } from '@playwright/test';

test.describe('My Feature', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/my-page');
    await page.getByRole('button', { name: 'Click Me' }).click();
    await expect(page.getByText('Success')).toBeVisible();
  });
});
```

See [E2E Testing Guide](../../../docs/tech-docs/E2E_TESTING.md) for detailed documentation.
