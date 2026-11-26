
import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.emailInput = page.getByPlaceholder('you@yourbusiness.com');
    this.passwordInput = page.getByPlaceholder('Enter your password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });

    // Validation messages
    this.invalidCredentialsMessage = page.getByText(
      'Invalid email or password'
    );
    this.invalidEmailMessage = page.getByText(
      'Enter a valid email address.'
    );
    this.emptyPasswordMessage = page.getByText(
      'Enter your password.'
    );
  }

  // Open login page
  async goto() {
    await this.page.goto(
      'https://staging.salesai.cliffbyte.com/login'
    );
  }

  // Enter email and password
  async enterCredentials(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  // Click Sign in
  async clickSignIn() {
    await this.signInButton.click();
  }

  // Verify invalid credentials error
  async verifyInvalidCredentials() {
    await expect(this.invalidCredentialsMessage).toBeVisible();
  }

  // Verify empty field validation
  async verifyEmptyCredentials() {
    await expect(this.invalidEmailMessage).toBeVisible();
    await expect(this.emptyPasswordMessage).toBeVisible();
  }
}
