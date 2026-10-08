import { test, expect } from '@playwright/test';
import { LoginPage } from '../Src/Pages/LoginPage';
import { CasePage } from '../Src/Pages/CasePage';
import { getSalesforceVerificationCode } from '../Src/Utils/mail.util';
// NEW
import { getSalesforceSession } from '../Src/Utils/jwtAuth.util';

test.describe('Salesforce - Case Creation', () => {
  test('should create a case and verify it saved', async ({ page }) => {
    // Login first (prerequisite, not the focus of this test)
    // const loginPage = new LoginPage(page);
    // await page.goto('/');
    // await loginPage.login(process.env.SF_USERNAME!, process.env.SF_PASSWORD!);
    // const code = await getSalesforceVerificationCode();
    // await loginPage.enterVerificationCode(code);


    const { sessionId, instanceUrl } = await getSalesforceSession();
    const loginPage = new LoginPage(page);
    await loginPage.loginViaJWT(instanceUrl, sessionId);


    // Now the actual test focus: case creation
    const casePage = new CasePage(page);
    await page.goto(`${instanceUrl}/lightning/o/Case/list`);
    await casePage.createNewCase()

  });
});


