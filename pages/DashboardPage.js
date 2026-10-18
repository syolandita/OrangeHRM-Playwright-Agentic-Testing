import { expect } from '@playwright/test';

export class DashboardPage {
  constructor(page) {
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible();
  }
}