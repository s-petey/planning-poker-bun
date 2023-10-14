import { expect, test } from '@playwright/test';
import { LandingPage } from './fixtures/landing';
import { RoomPage } from './fixtures/room';
import { DisplayHostPage, DisplayNormalPage } from './fixtures/display';

test.describe('Display Page', () => {
  let landingPage: LandingPage;
  let roomPage: RoomPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.goto();
    await landingPage.goToRoomPage('Fazzo');

    roomPage = new RoomPage(landingPage.page);
  });

  test('display page has all buttons', async () => {
    await roomPage.goToDisplayPage('Wizzo');
    const displayPage = new DisplayNormalPage(roomPage.page);

    await expect(
      displayPage.page.getByRole('heading', { name: 'Fazzo' })
    ).toBeVisible();

    await expect(displayPage.getNumberButton(1)).toBeEnabled();
    await expect(displayPage.getNumberButton(2)).toBeEnabled();
    await expect(displayPage.getNumberButton(3)).toBeEnabled();
    await expect(displayPage.getNumberButton(5)).toBeEnabled();
    await expect(displayPage.getNumberButton(8)).toBeEnabled();
    await expect(displayPage.getNumberButton(13)).toBeEnabled();
    await expect(displayPage.getNumberButton(21)).toBeEnabled();
    await expect(displayPage.getNumberButton(34)).toBeEnabled();
    await expect(displayPage.getNumberButton(55)).toBeEnabled();

    await expect(displayPage.changeRoomLink).toBeVisible();
    await expect(displayPage.resetSelectionButton).toBeDisabled();
  });

  test('display page has host details', async () => {
    await roomPage.goToDisplayPage('Wizzo', true);
    const displayPage = new DisplayHostPage(roomPage.page);

    await expect(displayPage.inputLabel).toBeVisible();
    await expect(displayPage.updateLabelButton).toBeEnabled();
    await expect(displayPage.resetCardsButton).toBeEnabled();
    await expect(displayPage.showVotesButton).toBeEnabled();

    await displayPage.showVotesButton.click();

    await expect(
      displayPage.page.getByRole('heading', { name: 'Room voting results:' })
    ).toBeVisible();
    await expect(displayPage.page.getByTestId('conic-gradient')).toBeVisible();
  });
});
