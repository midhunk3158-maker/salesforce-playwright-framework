import { test, expect } from '@playwright/test';
import { LoginPage } from '../Src/Pages/LoginPage';
import { CasePage } from '../Src/Pages/CasePage';
import * as allure from 'allure-js-commons';
import { getSalesforceVerificationCode } from '../Src/Utils/mail.util';
// NEW
import { getSalesforceSession } from '../Src/Utils/jwtAuth.util';

test.describe('Salesforce - Case Creation', () => {
  test('should create a case and verify it saved', async ({ page }) => {

     // Allure Reporting Functionalities 
            await allure.epic('Service Cloud');
            await allure.feature('Case Management');
            await allure.severity('critical');
            await allure.tag('smoke');

    const { sessionId, instanceUrl } = await getSalesforceSession();
    const loginPage = new LoginPage(page);
    await loginPage.loginViaJWT(instanceUrl, sessionId);


    // Now the actual test focus: case creation
    const casePage = new CasePage(page);
    await page.goto(`${instanceUrl}/lightning/o/Case/list`);
    await casePage.createNewCase()

  });
});


