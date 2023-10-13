import { expect, test } from '@playwright/test';
import { LandingPage } from './fixtures/landing';

test.describe('Landing Page', () => {
  let landingPage: LandingPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.goto();
  });

  test('has expected form', async () => {
    await expect(
      landingPage.page.getByRole('heading', { name: 'Planning Poker' })
    ).toBeVisible();
    await expect(await landingPage.inputRoom).toBeVisible();

    const button = await landingPage.createOrJoinButton;
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
  });
});
