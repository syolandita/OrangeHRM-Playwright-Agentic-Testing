import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('Login OrangeHRM', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto();
  });

  test('TC_Login_001 | Login berhasil dengan akun admin valid', async () => {
    await loginPage.login('Admin', 'admin123');
    await dashboardPage.expectLoaded();
  });

  test('TC_Login_002 | Login gagal dengan password salah', async () => {
    await loginPage.login('Admin', 'salahpassword');
    await loginPage.expectError('Invalid credentials');
  });
});