import { expect, test } from '@playwright/test';
import { LandingPage } from './fixtures/landing';
import { RoomPage } from './fixtures/room';
import { DisplayHostPage, DisplayNormalPage } from './fixtures/display';

test.describe('normal display flow', () => {
  let landingPage: LandingPage;
  let roomPage: RoomPage;
  let displayPage: DisplayNormalPage | DisplayHostPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.goto();
    await landingPage.goToRoomPage('Fazzo');

    roomPage = new RoomPage(landingPage.page);
  });

  test('Start to end and reset', async () => {
    await roomPage.goToDisplayPage('Wizzo');
    displayPage = new DisplayHostPage(roomPage.page);

    await displayPage.getNumberButton(1).click();

    await expect(displayPage.resetSelectionButton).toBeEnabled();

    await displayPage.resetSelectionButton.click();

    await expect(displayPage.resetSelectionButton).toBeDisabled();
  });

  test('change room', async () => {
    await roomPage.goToDisplayPage('Wizzo');
    displayPage = new DisplayHostPage(roomPage.page);

    await displayPage.getNumberButton(1).click();

    await expect(displayPage.changeRoomLink).toBeVisible();

    await displayPage.changeRoomLink.click();

    await expect(landingPage.createOrJoinButton).toBeVisible();
  });
});

test.describe('host display flow', () => {
  let landingPage: LandingPage;
  let roomPage: RoomPage;
  let displayPage: DisplayNormalPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.goto();
    await landingPage.goToRoomPage('Fazzo');

    roomPage = new RoomPage(landingPage.page);
    await roomPage.goToDisplayPage('Wizzo');
    displayPage = new DisplayNormalPage(roomPage.page);
    await displayPage.getNumberButton(3).click();
  });

  test('Start to end and reset all', async ({ page, browser }) => {
    const page1 = await browser.newPage();
    const landingPage1 = new LandingPage(page1);
    await landingPage1.goto();
    await landingPage1.page.getByRole('link', { name: 'Fazzo' }).click();
    const roomPage1 = new RoomPage(page1);
    await roomPage1.goToDisplayPage('Wazzo', true);
    const displayPage1 = new DisplayHostPage(page1);

    await expect(displayPage1.showVotesButton).toBeEnabled();
    await displayPage1.showVotesButton.click();

    await expect(
      displayPage1.page.getByRole('heading', { name: 'Room voting results:' })
    ).toBeVisible();

    await displayPage1.page
      .getByRole('heading', { name: '1 of 2 voted' })
      .scrollIntoViewIfNeeded();
    await displayPage.page
      .getByRole('heading', { name: '1 of 2 voted' })
      .scrollIntoViewIfNeeded();

    await expect(
      displayPage1.page.getByRole('heading', { name: '1 of 2 voted' })
    ).toBeVisible();
    await expect(
      displayPage.page.getByRole('heading', { name: '1 of 2 voted' })
    ).toBeVisible();

    await expect(displayPage1.resetCardsButton).toBeEnabled();
    await displayPage1.resetCardsButton.click();

    await expect(
      displayPage1.page.getByRole('heading', { name: '0 of 2 voted' })
    ).toBeVisible();
    await expect(
      displayPage.page.getByRole('heading', { name: '0 of 2 voted' })
    ).toBeVisible();

    // Label testing
    await expect(
      displayPage.page.getByText('Room Label: No Room Label')
    ).toBeVisible();
    await expect(displayPage1.inputLabel).toBeVisible();

    await displayPage1.inputLabel.fill('Harry');
    await page1.getByRole('button', { name: 'Update label' }).click();

    await expect(displayPage.page.getByText('Room Label: Harry')).toBeVisible();
    await expect(displayPage1.inputLabel).toHaveValue('Harry');
  });
});
