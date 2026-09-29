import { Page, Locator, expect } from '@playwright/test';

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
    await this.page.getByRole('button', { name: 'New' }).click();
    await this.page.getByRole('combobox', { name: 'Case Origin' }).click();
    await this.page.getByText('Phone', { exact: true }).click();
    await this.saveButton.click();
  }
}