import { Locator, Page, test } from '@playwright/test';
import { LeadData } from '../Types/lead.type';


export class LeadsPage {
    readonly page: Page;
    readonly newLeadButton: Locator;
    readonly salutationCombobox: Locator;
    readonly newLeadDialog: Locator;
    readonly firstNameTextbox: Locator;
    readonly lastNameTextbox: Locator;
    readonly companyTextbox: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newLeadButton = page.getByRole('button', { name: 'New' });
        this.salutationCombobox = page.getByRole('combobox', { name: 'Salutation' });
        this.newLeadDialog = page.getByRole('dialog', { name: 'New Lead' });
        this.firstNameTextbox = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameTextbox = page.getByRole('textbox', { name: 'Last Name' });
        this.companyTextbox = page.getByRole('textbox', { name: 'Company' });
        this.saveButton = this.saveButton = this.newLeadDialog.getByRole('button', { name: 'Save', exact: true });
    }



    async leadCreation(instanceUrl: string, lead: LeadData) {

        //  await this.page.goto('https://orgfarm-569efaa45f-dev-ed.develop.lightning.force.com/lightning/o/Lead/list?filterName=__Recent');
        await test.step('Open the Leads list', async () => {
            await this.page.goto(`${instanceUrl}/lightning/o/Lead/list`);
            await test.step('Open the New Lead form', async () => {
                await this.newLeadButton.click();
            });

            await test.step('Enter the lead details', async () => {

                await this.salutationCombobox.click();
                await this.newLeadDialog.click();
                await this.firstNameTextbox.click();
                await this.firstNameTextbox.fill(lead.firstName);
                await this.lastNameTextbox.click();
                await this.lastNameTextbox.fill(lead.lastName);
                await this.companyTextbox.click();
                await this.companyTextbox.fill(lead.company);
                await this.saveButton.click();

            });

        });
    }
}