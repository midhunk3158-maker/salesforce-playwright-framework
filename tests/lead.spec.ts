import { test, expect } from '@playwright/test';
import { LoginPage } from '../Src/Pages/LoginPage';
import { LeadsPage } from '../Src/Pages/LeadsPage';
import { getSalesforceVerificationCode } from '../Src/Utils/mail.util';
// NEW
import { getSalesforceSession } from '../Src/Utils/jwtAuth.util'
// Allure Import 
import * as allure from 'allure-js-commons';
// Importing the LeadData interface for type safety
import type { LeadData } from '../Src/Types/lead.type';
// Importing the fs and path modules for file operations
import fs from 'fs';
import path from 'path'


// Load the data once, before the tests are generated
const leads: LeadData[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../Src/TestData/leads.json'), 'utf-8')
);

test.describe('Salesforce - Lead Creation (data-driven)', () => {
  for (const lead of leads) {
    test(`should create lead ${lead.id}: ${lead.firstName} ${lead.lastName}`, async ({ page }) => {
      // Allure labels
      await allure.epic('Sales Cloud');
      await allure.feature('Lead Management');
      await allure.tag('smoke');
      await allure.parameter('Lead ID', lead.id);

      // Unique last name so re-runs don't create identical duplicate leads
      const uniqueLead: LeadData = {
        ...lead,
        lastName: `${lead.lastName}_${Date.now()}`,
      };

      // Authenticate
      const { sessionId, instanceUrl } = await test.step(
        'Get Salesforce session via JWT',
        () => getSalesforceSession()
      );

      const loginPage = new LoginPage(page);
      await test.step('Log in to Lightning using the session', () =>
        loginPage.loginViaJWT(instanceUrl, sessionId)
      );

      // Create the lead
      const leadsPage = new LeadsPage(page);
      await leadsPage.leadCreation(instanceUrl, uniqueLead);
    });
  }
});