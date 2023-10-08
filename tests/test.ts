import { expect, test } from '@playwright/test';
import { LandingPage } from './fixtures/landing';
import { RoomPage } from './fixtures/room';
import { DisplayHostPage, DisplayNormalPage } from './fixtures/display';

test.describe('Layout', () => {
  test.describe('Landing Page', () => {
    let landingPage: LandingPage;

    test.beforeEach(async ({ page }) => {
      landingPage = new LandingPage(page);
      await landingPage.goto();
    });

    test('has expected h1', async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: 'Planning Poker' })
      ).toBeVisible();
      await expect(landingPage.inputRoom).toBeVisible();
      await expect(landingPage.createOrJoinButton).toBeVisible();
      await expect(landingPage.createOrJoinButton).toBeEnabled();
    });

    test('shows Available rooms', async ({ page, browser }) => {
      await landingPage.goToRoomPage('Fazzo');

      const page1 = await browser.newPage();
      const landingPage1 = new LandingPage(page1);
      await landingPage1.goto();
      await expect(
        landingPage1.page.getByRole('link', { name: 'Fazzo' })
      ).toBeVisible();
    });
  });

  test.describe('Room Page', () => {
    let landingPage: LandingPage;
    let roomPage: RoomPage;

    test.beforeEach(async ({ page }) => {
      landingPage = new LandingPage(page);
      await landingPage.goto();
      await landingPage.goToRoomPage('Fazzo');
      roomPage = new RoomPage(landingPage.page);
    });

    test('room page has expected form', async () => {
      await expect(roomPage.inputDisplay).toBeVisible();
      await expect(roomPage.slideToggle).toBeVisible();
      await expect(roomPage.joinButton).toBeEnabled();
      await expect(
        roomPage.page.getByRole('heading', {
          name: 'There are no displays currently in Fazzo',
        })
      ).toBeEnabled();
    });

    test('room page has other displays listed', async ({ browser }) => {
      await landingPage.goToRoomPage('Fazzo');
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
      await expect(
        roomPage1.page.getByRole('heading', {
          name: 'Current displays in room: Fazzo',
        })
      ).toBeEnabled();
    });
  });

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
      await expect(
        displayPage.page.getByTestId('conic-gradient')
      ).toBeVisible();
    });
  });
});

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
  });

  test('update label', async ({ browser }) => {
    const page1 = await browser.newPage();
    const landingPage1 = new LandingPage(page1);
    await landingPage1.goto();
    await landingPage1.page.getByRole('link', { name: 'Fazzo' }).click();
    const roomPage1 = new RoomPage(page1);
    await roomPage1.goToDisplayPage('Wazzo', true);
    const displayPage1 = new DisplayHostPage(page1);

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
