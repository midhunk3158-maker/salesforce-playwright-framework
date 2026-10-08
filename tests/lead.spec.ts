import { test, expect } from '@playwright/test';
import { LoginPage } from '../Src/Pages/LoginPage';
import { LeadsPage } from '../Src/Pages/LeadsPage';
import { getSalesforceVerificationCode } from '../Src/Utils/mail.util';
// NEW
import { getSalesforceSession } from '../Src/Utils/jwtAuth.util'
// Allure Import 
import * as allure from 'allure-js-commons';

test.describe('Salesforce - Lead Creation', () => {
    test('should create a lead and verify it saved', async ({ page }) => {

        // Allure Reporting Functionalities 
        await allure.epic('Service Cloud');
        await allure.feature('Case Management');
        await allure.severity('critical');
        await allure.tag('smoke');



        const { sessionId, instanceUrl } = await getSalesforceSession();
        const loginPage = new LoginPage(page);
        await loginPage.loginViaJWT(instanceUrl, sessionId);
        const leadsPage = new LeadsPage(page);
        await page.goto(`${instanceUrl}/lightning/o/Lead/list`);
        await leadsPage.leadCreation();
    });
});