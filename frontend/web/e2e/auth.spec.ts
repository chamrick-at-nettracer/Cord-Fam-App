import { test, expect } from '@playwright/test';

/**
 * Authentication E2E Tests
 *
 * These tests verify the complete authentication flow:
 * - User registration
 * - User login
 * - Session persistence
 * - Logout
 */

test.describe('Authentication', () => {
  // Generate unique test user data
  const timestamp = Date.now();
  const testUser = {
    email: `test${timestamp}@example.com`,
    username: `testuser${timestamp}`,
    password: 'testpass123',
    first_name: 'Test',
    last_name: 'User',
  };

  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto('/login');
  });

  test('should display login page', async ({ page }) => {
    // Check that login form elements are visible
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  });

  test('should navigate to register page', async ({ page }) => {
    // Click the register link
    await page.getByRole('link', { name: /register/i }).click();

    // Verify we're on the register page
    await expect(page).toHaveURL(/.*\/register/);
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/username/i)).toBeVisible();
  });

  test('should register a new user', async ({ page }) => {
    // Navigate to register page
    await page.goto('/register');

    // Fill in registration form
    await page.getByLabel(/email/i).fill(testUser.email);
    await page.getByLabel(/username/i).fill(testUser.username);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByLabel(/first name/i).fill(testUser.first_name);
    await page.getByLabel(/last name/i).fill(testUser.last_name);

    // Submit the form
    await page.getByRole('button', { name: /register/i }).click();

    // Should redirect to dashboard after successful registration
    await expect(page).toHaveURL('/');
    await expect(page.getByText(/cord-fam-app/i)).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    // First, register a user (or use existing test user)
    await page.goto('/register');
    await page.getByLabel(/email/i).fill(testUser.email);
    await page.getByLabel(/username/i).fill(testUser.username);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByRole('button', { name: /register/i }).click();

    // Wait for redirect to dashboard
    await expect(page).toHaveURL('/');

    // Logout
    await page.getByRole('button', { name: /logout/i }).click();

    // Should redirect to login
    await expect(page).toHaveURL(/.*\/login/);

    // Now test login
    await page.getByLabel(/email/i).fill(testUser.email);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByRole('button', { name: /login/i }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL('/');
    await expect(page.getByText(/cord-fam-app/i)).toBeVisible();
  });

  test('should show error for invalid login credentials', async ({ page }) => {
    // Try to login with invalid credentials
    await page.getByLabel(/email/i).fill('invalid@example.com');
    await page.getByLabel(/password/i).fill('wrongpassword');
    await page.getByRole('button', { name: /login/i }).click();

    // Should show error message
    await expect(page.getByText(/invalid|error|failed/i)).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // First login
    await page.goto('/register');
    await page.getByLabel(/email/i).fill(testUser.email);
    await page.getByLabel(/username/i).fill(testUser.username);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByRole('button', { name: /register/i }).click();

    await expect(page).toHaveURL('/');

    // Click logout
    await page.getByRole('button', { name: /logout/i }).click();

    // Should redirect to login page
    await expect(page).toHaveURL(/.*\/login/);

    // Should not be able to access dashboard
    await page.goto('/');
    await expect(page).toHaveURL(/.*\/login/);
  });
});
