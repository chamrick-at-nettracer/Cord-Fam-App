# End-to-End (E2E) Testing Guide

This guide explains how to write and run end-to-end tests for Cord-Fam-App using
Playwright. E2E tests verify that the entire application works correctly from a
user's perspective, testing the full flow from frontend to backend.

## Table of Contents

- [What is E2E Testing?](#what-is-e2e-testing)
- [Why Playwright?](#why-playwright)
- [Prerequisites](#prerequisites)
- [Running E2E Tests](#running-e2e-tests)
- [Writing E2E Tests](#writing-e2e-tests)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Examples](#examples)

## What is E2E Testing?

**End-to-End (E2E) testing** simulates real user interactions with your
application. Unlike unit tests that test individual functions, E2E tests:

- Test the **entire application** (frontend + backend + database)
- Simulate **real user behavior** (clicking buttons, filling forms, navigating
  pages)
- Verify **complete workflows** (e.g., "user can register, login, and send a
  message")
- Run in **real browsers** (Chrome, Firefox, Safari)

### E2E vs Unit Tests

| Unit Tests                           | E2E Tests                        |
| ------------------------------------ | -------------------------------- |
| Test individual functions/components | Test complete user workflows     |
| Fast (milliseconds)                  | Slower (seconds to minutes)      |
| Isolated (mocked dependencies)       | Real (actual servers, databases) |
| Many small tests                     | Fewer comprehensive tests        |
| Catch bugs in logic                  | Catch bugs in integration        |

**Both are important!** Unit tests catch bugs early, E2E tests ensure everything
works together.

## Why Playwright?

We use **Playwright** because it:

- ✅ Works with **all major browsers** (Chrome, Firefox, Safari, Edge)
- ✅ Has **excellent documentation** and developer experience
- ✅ Provides **powerful debugging tools** (UI mode, trace viewer)
- ✅ Supports **mobile device emulation**
- ✅ Has **auto-waiting** (waits for elements to be ready automatically)
- ✅ Can **record tests** (generate tests by interacting with the app)

## Prerequisites

Before running E2E tests, ensure:

1. **Backend server is running** on `http://localhost:3000`

   ```bash
   cd backend
   npm run dev
   ```

2. **Frontend dev server is running** on `http://localhost:5173`

   ```bash
   cd frontend/web
   npm run dev
   ```

3. **Databases are running and initialized**
   - MySQL on `localhost:3306`
   - MongoDB on `localhost:27017`

4. **Playwright browsers are installed**

   ```bash
   cd frontend/web
   npx playwright install chromium
   ```

   (The config will install browsers automatically on first run, but you can
   install them manually)

## Running E2E Tests

### When to Run E2E Tests

**E2E tests are NOT run automatically in pre-commit hooks** because they:

- Take a long time to run (minutes vs seconds for unit tests)
- Require the backend and frontend servers to be running
- Are better suited for CI/CD pipelines or manual runs before pushing

**Run E2E tests:**

- ✅ Before pushing to a branch
- ✅ In CI/CD pipelines (GitHub Actions, etc.)
- ✅ When testing complete user workflows
- ✅ Before releases or deployments
- ❌ NOT in pre-commit hooks (too slow)

### Basic Commands

```bash
cd frontend/web

# Run all E2E tests
npm run test:e2e

# Run tests in headed mode (see the browser)
npm run test:e2e:headed

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Debug tests step-by-step
npm run test:e2e:debug
```

### Running Specific Tests

```bash
# Run a specific test file
npx playwright test e2e/auth.spec.ts

# Run tests matching a pattern
npx playwright test --grep "login"

# Run tests in a specific browser
npx playwright test --project=chromium
```

### Viewing Test Results

After running tests, Playwright generates an HTML report:

```bash
npx playwright show-report
```

This opens an interactive report showing:

- Which tests passed/failed
- Screenshots of failures
- Video recordings (if enabled)
- Trace files for debugging

## Writing E2E Tests

### Test File Structure

E2E tests are located in `frontend/web/e2e/`:

```text
frontend/web/e2e/
├── auth.spec.ts          # Authentication tests
├── dashboard.spec.ts     # Dashboard tests
└── channels.spec.ts      # Channel tests (future)
```

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    // 1. Navigate to a page
    await page.goto('/login');

    // 2. Interact with elements
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Verify the result
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Welcome')).toBeVisible();
  });
});
```

### Common Playwright Actions

#### Navigation

```typescript
// Go to a URL
await page.goto('/login');

// Go back
await page.goBack();

// Reload
await page.reload();
```

#### Finding Elements

Playwright provides many ways to find elements. **Prefer semantic selectors**
(by role, label, text):

```typescript
// By role (button, link, textbox, etc.)
await page.getByRole('button', { name: 'Login' }).click();
await page.getByRole('link', { name: 'Register' }).click();

// By label (for form inputs)
await page.getByLabel('Email').fill('user@example.com');
await page.getByLabel('Password').fill('password123');

// By text content
await page.getByText('Welcome back').click();

// By placeholder
await page.getByPlaceholder('Enter your email').fill('user@example.com');

// By test ID (add data-testid to your components)
await page.getByTestId('login-button').click();

// CSS selector (use sparingly, prefer semantic selectors)
await page.locator('.login-form').click();
```

#### Interacting with Elements

```typescript
// Click
await page.getByRole('button', { name: 'Submit' }).click();

// Fill input fields
await page.getByLabel('Username').fill('myusername');

// Type (simulates typing character by character)
await page.getByLabel('Message').type('Hello world');

// Select dropdown option
await page.getByLabel('Country').selectOption('USA');

// Check/uncheck checkbox
await page.getByLabel('Remember me').check();
await page.getByLabel('Remember me').uncheck();

// Upload file
await page.getByLabel('Upload').setInputFiles('path/to/file.pdf');
```

#### Assertions (Verifying Results)

```typescript
// URL assertions
await expect(page).toHaveURL('/dashboard');
await expect(page).toHaveURL(/.*\/dashboard/); // Regex

// Visibility assertions
await expect(page.getByText('Welcome')).toBeVisible();
await expect(page.getByText('Error')).not.toBeVisible();

// Text content assertions
await expect(page.getByText('Hello')).toHaveText('Hello');
await expect(page.getByText('Count')).toContainText('5');

// Element state assertions
await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();
await expect(page.getByLabel('Checkbox')).toBeChecked();

// Count assertions
await expect(page.getByRole('listitem')).toHaveCount(5);
```

### Waiting for Elements

Playwright **automatically waits** for elements to be ready, but sometimes you
need explicit waits:

```typescript
// Wait for element to be visible
await page.getByText('Loading complete').waitFor();

// Wait for navigation
await page.getByRole('button').click();
await page.waitForURL('/dashboard');

// Wait for network request to complete
await page.waitForResponse(
  (response) =>
    response.url().includes('/api/users') && response.status() === 200
);

// Wait for a specific time (use sparingly!)
await page.waitForTimeout(1000); // 1 second
```

### Test Organization

#### Using `test.describe()` to Group Tests

```typescript
test.describe('Authentication', () => {
  test('should login successfully', async ({ page }) => {
    // Test code
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Test code
  });
});
```

#### Using `test.beforeEach()` for Setup

```typescript
test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // This runs before each test in the describe block
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/');
  });

  test('should display channels', async ({ page }) => {
    // Already logged in from beforeEach
    await expect(page.getByText('Channels')).toBeVisible();
  });
});
```

#### Using `test.afterEach()` for Cleanup

```typescript
test.afterEach(async ({ page }) => {
  // Clean up after each test (e.g., logout, clear data)
  await page.getByRole('button', { name: 'Logout' }).click();
});
```

## Best Practices

### 1. Use Semantic Selectors

**✅ Good:**

```typescript
await page.getByRole('button', { name: 'Login' }).click();
await page.getByLabel('Email').fill('user@example.com');
```

**❌ Bad:**

```typescript
await page.locator('.btn-primary').click();
await page.locator('#email-input').fill('user@example.com');
```

**Why?** Semantic selectors are more resilient to CSS changes and better reflect
user intent.

### 2. Keep Tests Independent

Each test should be able to run independently:

**✅ Good:**

```typescript
test('should login', async ({ page }) => {
  await page.goto('/login');
  // ... login steps
});

test('should register', async ({ page }) => {
  await page.goto('/register');
  // ... registration steps
});
```

**❌ Bad:**

```typescript
let loggedInPage; // Shared state

test('should login', async ({ page }) => {
  // ... login
  loggedInPage = page; // Other tests depend on this
});
```

### 3. Use Test Data That Doesn't Conflict

**✅ Good:**

```typescript
const timestamp = Date.now();
const testUser = {
  email: `test${timestamp}@example.com`,
  username: `user${timestamp}`,
};
```

**❌ Bad:**

```typescript
const testUser = {
  email: 'test@example.com', // Might conflict with other tests
  username: 'testuser',
};
```

### 4. Test User Flows, Not Implementation Details

**✅ Good:**

```typescript
test('should send a message', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByPlaceholder('Type a message').fill('Hello');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByText('Hello')).toBeVisible();
});
```

**❌ Bad:**

```typescript
test('should call sendMessage API', async ({ page }) => {
  // Testing implementation details, not user behavior
});
```

### 5. Handle Async Operations

Always wait for async operations to complete:

```typescript
// ✅ Good: Wait for navigation
await page.getByRole('button', { name: 'Submit' }).click();
await expect(page).toHaveURL('/dashboard');

// ✅ Good: Wait for element
await page.getByText('Loading...').waitFor({ state: 'hidden' });

// ❌ Bad: Assuming things happen instantly
await page.getByRole('button').click();
expect(page.url()).toBe('/dashboard'); // Might fail!
```

### 6. Use Meaningful Test Names

**✅ Good:**

```typescript
test('should display error message when login credentials are invalid', async ({ page }) => {
```

**❌ Bad:**

```typescript
test('test login', async ({ page }) => {
```

### 7. Clean Up Test Data

If your tests create data (users, channels, messages), clean it up:

```typescript
test.afterEach(async ({ page, request }) => {
  // Delete test user via API
  await request.delete('/api/v1/auth/test-user');
});
```

## Troubleshooting

### Tests Fail with "Target closed" or "Browser closed"

**Problem:** The browser closed unexpectedly.

**Solution:**

- Check that your backend/frontend servers are running
- Increase timeout in `playwright.config.ts`:

  ```typescript
  use: {
    actionTimeout: 10000, // 10 seconds
  }
  ```

### Tests Can't Find Elements

**Problem:** `page.getByRole('button')` returns "Locator not found".

**Solutions:**

1. **Wait for the element:**

   ```typescript
   await page.getByRole('button', { name: 'Submit' }).waitFor();
   ```

2. **Check if the element exists:**

   ```typescript
   const button = page.getByRole('button', { name: 'Submit' });
   if ((await button.count()) > 0) {
     await button.click();
   }
   ```

3. **Use a different selector:**

   ```typescript
   // Try by text instead of role
   await page.getByText('Submit').click();
   ```

4. **Check the page state:**

   ```typescript
   // Take a screenshot to see what's on the page
   await page.screenshot({ path: 'debug.png' });
   ```

### Tests Are Flaky (Sometimes Pass, Sometimes Fail)

**Problem:** Tests pass sometimes but fail other times.

**Solutions:**

1. **Add explicit waits:**

   ```typescript
   await page.waitForLoadState('networkidle');
   await page.waitForSelector('[data-testid="content"]');
   ```

2. **Use `waitForResponse` for API calls:**

   ```typescript
   await page.waitForResponse((response) =>
     response.url().includes('/api/channels')
   );
   ```

3. **Increase timeouts:**

   ```typescript
   test.setTimeout(60000); // 60 seconds for this test
   ```

### Debug Mode

Use debug mode to step through tests:

```bash
npm run test:e2e:debug
```

This opens Playwright Inspector where you can:

- Step through each action
- See the current page state
- Inspect elements
- View console logs

## Examples

### Example 1: Complete Registration Flow

```typescript
import { test, expect } from '@playwright/test';

test('should complete user registration flow', async ({ page }) => {
  const timestamp = Date.now();
  const user = {
    email: `user${timestamp}@example.com`,
    username: `user${timestamp}`,
    password: 'SecurePass123!',
    firstName: 'John',
    lastName: 'Doe',
  };

  // Navigate to register page
  await page.goto('/register');

  // Fill registration form
  await page.getByLabel('Email').fill(user.email);
  await page.getByLabel('Username').fill(user.username);
  await page.getByLabel('Password').fill(user.password);
  await page.getByLabel('First Name').fill(user.firstName);
  await page.getByLabel('Last Name').fill(user.lastName);

  // Submit form
  await page.getByRole('button', { name: /register/i }).click();

  // Verify redirect to dashboard
  await expect(page).toHaveURL('/');

  // Verify user is logged in (check for username in header)
  await expect(page.getByText(user.username)).toBeVisible();
});
```

### Example 2: Sending a Message

```typescript
import { test, expect } from '@playwright/test';

test.describe('Messaging', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: /login/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('should send a message in a channel', async ({ page }) => {
    // Select first channel
    const channels = page.locator('[role="button"]').filter({
      hasText: /channel|general/i,
    });
    await channels.first().click();

    // Wait for channel to load
    await page.waitForTimeout(1000);

    // Type message
    const messageText = `Test message ${Date.now()}`;
    await page.getByPlaceholder(/type a message/i).fill(messageText);

    // Send message
    await page.getByRole('button', { name: /send/i }).click();

    // Verify message appears
    await expect(page.getByText(messageText)).toBeVisible();
  });
});
```

### Example 3: Testing Error Handling

```typescript
import { test, expect } from '@playwright/test';

test('should display error for invalid login', async ({ page }) => {
  await page.goto('/login');

  // Try to login with invalid credentials
  await page.getByLabel('Email').fill('invalid@example.com');
  await page.getByLabel('Password').fill('wrongpassword');
  await page.getByRole('button', { name: /login/i }).click();

  // Verify error message appears
  await expect(page.getByText(/invalid|error|failed/i)).toBeVisible();

  // Verify we're still on login page
  await expect(page).toHaveURL(/.*\/login/);
});
```

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)

## Getting Help

If you're stuck:

1. **Check the error message** - Playwright provides detailed error messages
2. **Use debug mode** - `npm run test:e2e:debug` to step through tests
3. **Take screenshots** - Add `await page.screenshot()` to see page state
4. **Check the HTML report** - `npx playwright show-report` shows detailed
   failure info
5. **Ask for help** - Share the error message and test code with your team

---

**Remember:** E2E tests are meant to verify that features work end-to-end. Write
tests that reflect real user behavior, not implementation details. Start with
critical user flows (login, registration, core features) and expand from there.
