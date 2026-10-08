import { Page, Locator, expect, test } from '@playwright/test';

export class CasePage {
  readonly page: Page;
  readonly caseOriginCombobox: Locator;
  readonly newCaseDialog: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.caseOriginCombobox = page.getByRole('combobox', { name: 'Case Origin' });
    this.newCaseDialog = page.getByRole('dialog', { name: 'New Case' });
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
  }




  async createNewCase() {
    // Click the "New" button to open the new case dialog

    await test.step('Open the New Case form', async () => {
      await this.page.getByRole('button', { name: 'New' }).click();
    });

    await test.step('Enter the case details', async () => {
      await this.caseOriginCombobox.click();
      await this.page.getByText('Phone', { exact: true }).click();
    });

    await test.step('Save the new case', async () => {
      await this.saveButton.click();
    });

  }
}