import { test } from '@playwright/test';
import { AdminPage } from '../../pages/AdminPage';
import { LoginPage } from '../../pages/LoginPage';

const testUsername = `AdminTest${Date.now()}`;

test.describe('Admin OrangeHRM', () => {
  test.describe.configure({ mode: 'serial' });

  let adminPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    adminPage = new AdminPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await adminPage.open();
  });

  test('TC_Admin_001 | Menambahkan user dengan data yang benar', async () => {
    await adminPage.addUser('A', testUsername, 'Taylor123');
    await adminPage.expectUserCreated();
  });

  test('TC_Admin_002 | Mencari user yang baru ditambahkan', async () => {
    await adminPage.searchUser(testUsername);
    await adminPage.expectUserFound(testUsername);
  });
});