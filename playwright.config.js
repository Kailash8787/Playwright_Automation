
 // @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // CI configuration
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Generate HTML report
  reporter: 'html',

  // Shared settings for all tests
  use: {
    // Show the browser window
    headless: false,

    // Slow down browser actions by 1 second
    launchOptions: {
      slowMo: 1000,
    },

    // Capture trace when a test is retried
    trace: 'on-first-retry',

    // Capture screenshots on test failure
    screenshot: 'only-on-failure',

    // Record video when a test fails
    video: 'retain-on-failure',
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
