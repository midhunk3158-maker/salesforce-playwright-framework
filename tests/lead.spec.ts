import { test, expect } from '@playwright/test';
import { LoginPage } from '../Src/Pages/LoginPage';
import { LeadsPage } from '../Src/Pages/LeadsPage';
import { getSalesforceVerificationCode } from '../Src/Utils/mail.util';
// NEW
import { getSalesforceSession } from '../Src/Utils/jwtAuth.util'

test.describe('Salesforce - Lead Creation', () => {
    test('should create a lead and verify it saved', async ({ page }) => {
        // const loginPage = new LoginPage(page);
        // const leadsPage = new LeadsPage(page);

        // await page.goto('/');
        // await loginPage.login(process.env.SF_USERNAME!, process.env.SF_PASSWORD!);
        // const code = await getSalesforceVerificationCode();
        // await loginPage.enterVerificationCode(code);
        // await page.waitForURL('**/lightning/**', { timeout: 30000 });

        const { sessionId, instanceUrl } = await getSalesforceSession();
            const loginPage = new LoginPage(page);
            await loginPage.loginViaJWT(instanceUrl, sessionId);
            const leadsPage = new LeadsPage(page);
            await page.goto(`${instanceUrl}/lightning/o/Lead/list`);
            await leadsPage.leadCreation();
    });
});