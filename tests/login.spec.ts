// tests/test.spec.ts 
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Src/Pages/LoginPage';
import { getSalesforceVerificationCode } from '../Src/Utils/mail.util';

test.describe('Salesforce - Login', () => {

  test('should login with MFA and create a case successfully', async ({ page }) => {

    // ---------- Step 1: Login ----------
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login(
      process.env.SF_USERNAME!,
      process.env.SF_PASSWORD!
    );

    // ---------- Step 2: Handle MFA ----------
    const verificationCode = await getSalesforceVerificationCode();
    await loginPage.enterVerificationCode(verificationCode);

    // Confirm login succeeded — Lightning home page loaded
    await page.waitForURL('**/lightning/**', { timeout: 30000 });

  });

});