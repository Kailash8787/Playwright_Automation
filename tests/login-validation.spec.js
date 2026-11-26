
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

// Test 1: Login with invalid credentials
test('Login with invalid credentials shows error message', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.enterCredentials(
    'sachinmyname278+1@gmail.com',
    'WrongPassword123!'
  );
  await loginPage.clickSignIn();

  await loginPage.verifyInvalidCredentials();
  await expect(page).toHaveURL(/\/login/);
});

// Test 2: Login with empty credentials
test('Login with empty credentials shows validation messages', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.clickSignIn();

  await loginPage.verifyEmptyCredentials();
  await expect(page).toHaveURL(/\/login/);
});
