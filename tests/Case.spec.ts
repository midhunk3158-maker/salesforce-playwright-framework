import { test, expect } from '@playwright/test';
import { LoginPage } from '../Src/Pages/LoginPage';
import { CasePage } from '../Src/Pages/CasePage';
import * as allure from 'allure-js-commons';
import { getSalesforceVerificationCode } from '../Src/Utils/mail.util';
// NEW
import { getSalesforceSession } from '../Src/Utils/jwtAuth.util';
// Importing the CaseData interface for type safety
import type { CaseData } from '../Src/Types/case.type'; 
// Importing the fs and path modules for file operations
import fs from 'fs';
import path from 'path'

// Load the data once, before the tests are generated 
const cases: CaseData[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../Src/Testdata/case.json'), 'utf-8')
);


test.describe('Salesforce - Case Creation', () => {
  for (const caseData of cases) {
    test(`should create case ${caseData.id}: ${caseData.subject}`, async ({ page }) => {
      // Allure labels 

     // Allure Reporting Functionalities 
            await allure.epic('Service Cloud');
            await allure.feature('Case Management');
            await allure.severity('critical');
            await allure.tag('smoke');

    const uniqueCase: CaseData = {
      ...caseData,
      subject: `${caseData.subject}_${Date.now()}`,
    };

    // Authenticate
    const { sessionId, instanceUrl } = await getSalesforceSession();


    const loginPage = new LoginPage(page);
    await loginPage.loginViaJWT(instanceUrl, sessionId);


    // Now the actual test focus: case creation
    const casePage = new CasePage(page);
  //  await page.goto(`${instanceUrl}/lightning/o/Case/list`);
    await casePage.createNewCase(instanceUrl, uniqueCase);

  });
}

});


