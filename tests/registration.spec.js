//Registration page opens

import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage.js';

test('Get started navigates to registration page', async ({ page }) => {
  // Step 1: Open landing page
  await page.goto('https://staging.salesai.cliffbyte.com/');

  // Step 2: Click Get started
  await page.getByRole('link', { name: /get started/i }).first().click();

  // Step 3: Create RegistrationPage object
  const registrationPage = new RegistrationPage(page);

  // Step 4: Verify registration page and form
  await expect(page).toHaveURL(/\/register/);
  await registrationPage.verifyRegistrationPage();

  // Step 5: Verify optional phone field and submit button
  await expect(registrationPage.phoneInput).toBeVisible();
  await expect(registrationPage.createAccountButton).toBeVisible();
});

//Empty registration form test

test('Empty registration form does not proceed', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  // Step 1: Open registration page
  await registrationPage.goto();

  // Step 2: Submit without entering details
  await registrationPage.clickCreateAccount();

  // Step 3: Verify the user remains on registration
  await expect(page).toHaveURL(/\/register/);
});

//Valid registration test

// Test 3: Valid registration
test('Valid registration creates an account', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await registrationPage.goto();

  await registrationPage.fillRegistrationForm(
    'Playwright Test User',
    '9812345678',
    'panthakailash0806+232@gmail.com',
    'TestPass123!',
    'TestPass123!'
  );

  await registrationPage.acceptTerms();
  await registrationPage.clickCreateAccount();
  // Pause so you can enter the OTP from Gmail manually
await page.pause();

// Verify navigation after OTP verification
await expect(page).not.toHaveURL(/\/register$/);

});
