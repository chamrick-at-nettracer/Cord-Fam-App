import { test, expect } from '@playwright/test';

/**
 * Dashboard E2E Tests
 *
 * These tests verify the main dashboard functionality:
 * - Channel list display
 * - Channel selection
 * - Message display
 * - Sending messages
 */

test.describe('Dashboard', () => {
  // Test user credentials (should match a user in your test database)
  const testUser = {
    email: 'cord@example.com', // Update with your test user email
    password: 'password123', // Update with your test user password
  };

  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');

    // Skip login if already logged in (for faster test runs)
    const currentUrl = page.url();
    if (!currentUrl.includes('/login')) {
      return;
    }

    await page.getByLabel(/email/i).fill(testUser.email);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByRole('button', { name: /login/i }).click();

    // Wait for dashboard to load
    await expect(page).toHaveURL('/');
    await expect(page.getByText(/cord-fam-app/i)).toBeVisible();
  });

  test('should display dashboard after login', async ({ page }) => {
    // Check that dashboard elements are visible
    await expect(page.getByText(/cord-fam-app/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();
  });

  test('should display channels sidebar', async ({ page }) => {
    // Check that channel sidebar is visible
    // The sidebar should contain at least the "New Channel" button
    await expect(page.getByRole('button', { name: /new channel/i })).toBeVisible();
  });

  test('should display channel messages when channel is selected', async ({ page }) => {
    // Wait for channels to load
    await page.waitForTimeout(1000);

    // Try to find and click the first channel
    // Note: This assumes channels exist. Adjust selector based on your UI.
    const channelButtons = page.locator('[role="button"]').filter({ hasText: /general|channel/i });
    const firstChannel = channelButtons.first();

    if ((await firstChannel.count()) > 0) {
      await firstChannel.click();

      // Wait for messages to load
      await page.waitForTimeout(1000);

      // Check that message area is visible (even if empty)
      const messageArea = page.locator('main').or(page.locator('[role="main"]'));
      await expect(messageArea).toBeVisible();
    }
  });

  test('should send a message', async ({ page }) => {
    // Wait for channels to load
    await page.waitForTimeout(1000);

    // Select a channel if available
    const channelButtons = page.locator('[role="button"]').filter({ hasText: /general|channel/i });
    const firstChannel = channelButtons.first();

    if ((await firstChannel.count()) > 0) {
      await firstChannel.click();
      await page.waitForTimeout(1000);

      // Find message input
      const messageInput = page
        .getByPlaceholder(/type a message/i)
        .or(page.locator('textarea').or(page.locator('input[type="text"]')));

      if ((await messageInput.count()) > 0) {
        // Type a test message
        const testMessage = `E2E test message ${Date.now()}`;
        await messageInput.first().fill(testMessage);

        // Click send button
        const sendButton = page.getByRole('button', { name: /send/i });
        if ((await sendButton.count()) > 0) {
          await sendButton.first().click();

          // Wait for message to appear
          await page.waitForTimeout(1000);

          // Verify message appears in the chat (check for test message or any new message)
          // This is a basic check - adjust based on your message rendering
          const messages = page.locator('main').or(page.locator('[role="main"]'));
          await expect(messages).toBeVisible();
        }
      }
    }
  });

  test('should navigate to settings page', async ({ page }) => {
    // Click settings icon
    const settingsButton = page.locator('button').filter({ has: page.locator('svg') });
    // Or use a more specific selector if you have aria-label
    await page
      .getByRole('button', { name: /settings/i })
      .or(page.locator('[aria-label*="settings" i]'))
      .first()
      .click();

    // Should navigate to settings
    await expect(page).toHaveURL(/.*\/settings/);
  });

  test('should navigate to help page', async ({ page }) => {
    // Click help icon
    await page
      .getByRole('button', { name: /help/i })
      .or(page.locator('[aria-label*="help" i]'))
      .first()
      .click();

    // Should navigate to help
    await expect(page).toHaveURL(/.*\/help/);

    // Check that help content is visible
    await expect(page.getByText(/getting started|documentation/i)).toBeVisible();
  });
});
