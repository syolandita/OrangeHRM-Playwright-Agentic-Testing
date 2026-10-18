---
name: gherkin-to-playwright
description: Cara mengubah skenario Gherkin (.feature) menjadi test Playwright JavaScript sesuai pola. Pakai setiap kali diminta generate test dari file .feature.
---

# Gherkin to Playwright

## Mapping
- Given -> biasanya precondition/navigasi -> panggil method goto() atau setup di page object
- When -> aksi yang dilakukan user -> panggil method aksi di page object (misal login, click, fill)
- Then -> hasil yang harus diverifikasi -> panggil method expect di page object

## Aturan tambahan
- Satu Scenario di Gherkin = satu test() di Playwright
- Judul test pakai format: TC_<Modul>_<Nomor> | <deskripsi scenario>
- Semua locator dan aksi ditaruh di pages/, file spec HANYA berisi pemanggilan method dan assertion
- Locator prioritas: getByRole, getByLabel, getByPlaceholder. Baru pakai data-testid/ID kalau tidak ada opsi lain

## Contoh

Input (tests/features/login.feature):

    Scenario: Login berhasil dengan akun admin valid
      Given user membuka halaman login OrangeHRM
      When user login dengan username "Admin" dan password "admin123"
      Then user melihat halaman dashboard

Output spec (tests/specs/login.spec.js):

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
    });

Page object yang dipakai (pages/LoginPage.js):

    export class LoginPage {
      constructor(page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
      }

      async goto() {
        await this.page.goto('/web/index.php/auth/login');
      }

      async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
      }
    }

Page object kedua (pages/DashboardPage.js):

    import { expect } from '@playwright/test';

    export class DashboardPage {
      constructor(page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Dashboard' });
      }

      async expectLoaded() {
        await expect(this.heading).toBeVisible();
      }
    }

## Larangan
- Jangan pakai locator CSS/XPath acak (contoh: .css-1a2b3c) kalau ada role atau label yang lebih stabil
- Jangan bikin assertion kosong, assertion harus memeriksa sesuatu yang benar-benar menandakan hasilnya sesuai
- Jangan duplikasi page object untuk halaman yang sama di file berbeda, cek dulu folder pages/ sebelum bikin baru

## Pola khusus: autocomplete/dropdown dinamis
Untuk field yang munculkan dropdown setelah diketik (misal Employee Name di Add User),
JANGAN langsung klik option setelah fill(). Tunggu option hasil yang bisa dipilih benar-benar
visible dulu, bukan indikator "Searching..." atau "No Records Found":

  await input.fill(text);
  const suggestion = page.getByRole('option')
    .filter({ hasNotText: /Searching|No Records Found/ })
    .first();
  await suggestion.waitFor({ state: 'visible' });
  await suggestion.click();

Setelah option visible, klik option yang sesuai. Jika nama option diketahui, prioritaskan
locator berdasarkan nama yang tepat; gunakan `.first()` hanya bila pilihan pertama memang
sesuai dengan kebutuhan skenario.

Jangan pakai waitForTimeout (hardcoded delay).