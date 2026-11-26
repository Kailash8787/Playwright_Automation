
import { expect } from '@playwright/test';

export class RegistrationPage {
  constructor(page) {
    this.page = page;

    // Registration form locators
    this.nameInput = page.getByPlaceholder('Nisha Shrestha');
    this.phoneInput = page.getByPlaceholder('98XXXXXXXX');
    this.emailInput = page.getByPlaceholder('you@yourbusiness.com');
    this.passwordInput = page.getByPlaceholder('Create a password');
    this.confirmPasswordInput = page.getByPlaceholder(
      'Re-enter your password'
    );

    this.termsCheckbox = page.getByRole('checkbox');
    this.createAccountButton = page.getByRole('button', {
      name: /create account/i
    });

    this.workspaceHeading = page.getByRole('heading', {
      name: 'Create your workspace'
    });
  }

  // Open registration page directly
  async goto() {
    await this.page.goto(
      'https://staging.salesai.cliffbyte.com/register'
    );
  }

  // Fill registration form
  async fillRegistrationForm(name, phone, email, password, confirmPassword) {
    await this.nameInput.fill(name);
    await this.phoneInput.fill(phone);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  // Accept terms and conditions
  async acceptTerms() {
    await this.termsCheckbox.check();
  }

  // Submit registration form
  async clickCreateAccount() {
    await this.createAccountButton.click();
  }

  // Verify registration page is visible
  async verifyRegistrationPage() {
    await expect(this.workspaceHeading).toBeVisible();
    await expect(this.nameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.confirmPasswordInput).toBeVisible();
  }
}
