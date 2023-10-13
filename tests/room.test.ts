import { expect, test } from '@playwright/test';
import { LandingPage } from './fixtures/landing';
import { RoomPage } from './fixtures/room';

test.describe('Room Page', () => {
  let landingPage: LandingPage;
  let roomPage: RoomPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.goto();
    await landingPage.goToRoomPage('Fazzo');
    roomPage = new RoomPage(page);
  });

  test('room page has expected form', async () => {
    await expect(await roomPage.joinButton).toBeEnabled();
    await expect(await roomPage.slideToggle).toBeVisible();
    await expect(await roomPage.inputDisplay).toBeVisible();
    await expect(
      roomPage.page.getByRole('heading', {
        name: 'There are no displays currently in Fazzo',
      })
    ).toBeVisible();
  });

  test('room page has other displays listed', async ({ browser }) => {
    await roomPage.goToDisplayPage('Wizzo');

    await expect(
      roomPage.page.getByRole('heading', { name: 'Fazzo' })
    ).toBeVisible();

    const page1 = await browser.newPage();
    const landingPage1 = new LandingPage(page1);
    await landingPage1.goto();
    await landingPage1.page.getByRole('link', { name: 'Fazzo' }).click();
    const roomPage1 = new RoomPage(page1);

    await expect(roomPage1.inputDisplay).toBeVisible();
    await expect(roomPage1.slideToggle).toBeVisible();
    await expect(roomPage1.joinButton).toBeEnabled();
    await roomPage1.page.reload();

    // TODO: This is flakey not sure why...
    await expect(
      await roomPage1.page.getByRole('heading', {
        name: 'Current displays in room: Fazzo',
      })
    ).toBeVisible();
  });
});
