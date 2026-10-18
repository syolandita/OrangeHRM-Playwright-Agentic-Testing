import { expect } from '@playwright/test';

export class AdminPage {
  constructor(page) {
    this.page = page;
    this.adminLink = page.getByRole('link', { name: 'Admin' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.systemUsersHeading = page.getByRole('heading', { name: 'System Users' });
    this.systemUsersUsernameInput = page.getByRole('textbox').nth(1);
    this.systemUsersTable = page.getByRole('table');
    this.addUserHeading = page.getByRole('heading', { name: 'Add User' });
    this.addUserForm = this.addUserHeading.locator('../..');
    this.selectDropdown = this.addUserForm.getByText('-- Select --', { exact: true });
    this.employeeNameInput = this.addUserForm.getByPlaceholder('Type for hints...');
    this.employeeOptions = this.addUserForm
      .getByRole('option')
      .filter({ hasNotText: /Searching|No Records Found/ });
    this.formTextboxes = this.addUserForm.getByRole('textbox');
    this.usernameInput = this.formTextboxes.nth(1);
    this.passwordInput = this.formTextboxes.nth(2);
    this.confirmPasswordInput = this.formTextboxes.nth(3);
    this.saveButton = this.addUserForm.getByRole('button', { name: 'Save' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.successToast = page.getByText('Successfully Saved', { exact: true });
  }

  async open() {
    await this.adminLink.click();
    await expect(this.systemUsersHeading).toBeVisible();
  }

  async addUser(employeeInitial, username, password) {
    await this.addButton.click();
    await expect(this.addUserHeading).toBeVisible();
    await this.selectDropdown.first().click();
    await this.page.getByRole('option', { name: 'Admin', exact: true }).click();
    await this.selectDropdown.first().click();
    await this.page.getByRole('option', { name: 'Enabled', exact: true }).click();
    await this.employeeNameInput.fill(employeeInitial);
    await this.employeeOptions.first().waitFor({ state: 'visible' });
    await this.employeeOptions.first().click();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.saveButton.click();
  }

  async expectUserCreated() {
    await expect(this.successToast).toBeVisible({ timeout: 15000 });
  }

  async searchUser(username) {
    await this.systemUsersUsernameInput.waitFor({ state: 'visible' });
    await this.systemUsersUsernameInput.fill(username);
    await this.searchButton.click();
  }

  async expectUserFound(username) {
    await expect(this.systemUsersTable.getByRole('cell', { name: username, exact: true })).toBeVisible();
  }
}