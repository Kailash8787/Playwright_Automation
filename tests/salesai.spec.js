
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

// Test 1: Verify landing page and navigation to login
test('SalesAI landing page and login navigation', async ({ page }) => {
  // Step 1: Open SalesAI landing page
  await page.goto('https://staging.salesai.cliffbyte.com/');

  // Step 2: Verify landing page heading
  await expect(
    page.getByRole('heading', {
      name: 'One inbox to chat, sell and support your customers'
    })
  ).toBeVisible();

  // Step 3: Navigate to login page
  await page.locator('a[href="/login"]').first().click();

  // Step 4: Verify login page heading
  await expect(
    page.getByRole('heading', { name: 'Welcome back' })
  ).toBeVisible();

  // Step 5: Verify login form fields
  await expect(
    page.getByPlaceholder('you@yourbusiness.com')
  ).toBeVisible();

  await expect(
    page.getByPlaceholder('Enter your password')
  ).toBeVisible();

  // Step 6: Verify login URL
  await expect(page).toHaveURL(/\/login/);
});

// Test 2: Verify login with valid credentials
test('Login with valid credentials redirects to dashboard', async ({ page }) => {
  // Step 1: Create LoginPage object
  const loginPage = new LoginPage(page);

  // Step 2: Open login page
  await loginPage.goto();

  // Step 3: Enter valid staging credentials
  await loginPage.enterCredentials(
    'sachinmyname278+1@gmail.com',
    'Admin@123'
  );

  // Step 4: Click Sign in
  await loginPage.clickSignIn();

  // Step 5: Verify successful login redirects away from login
  await expect(page).not.toHaveURL(/\/login/);
});
