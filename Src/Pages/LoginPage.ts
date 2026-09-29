import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly verificationCodeInput: Locator;
  readonly verifyButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.verificationCodeInput = page.getByRole('textbox', { name: 'Verification Code' });
    this.verifyButton = page.getByRole('button', { name: 'Verify' });
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.loginButton.click();
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async enterVerificationCode(code: string) {
    await this.verificationCodeInput.fill(code);
    await this.verifyButton.click();
  }
}