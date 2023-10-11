import type { Page, Locator } from '@playwright/test';

abstract class DisplayBasePage {
  readonly changeRoomLink: Locator;
  readonly resetSelectionButton: Locator;

  constructor(public readonly page: Page) {
    this.changeRoomLink = this.page.getByRole('link', { name: 'Change Room' });
    this.resetSelectionButton = this.page.getByRole('button', {
      name: 'Reset Selection',
    });
  }

  getNumberButton(value: number) {
    return this.page.getByRole('button', {
      name: value.toString(),
      exact: true,
    });
  }

  async goToLandingPage() {
    await this.changeRoomLink.click();
  }
}

export class DisplayNormalPage extends DisplayBasePage {

  constructor(public readonly page: Page) {
    super(page);

  }
}

export class DisplayHostPage extends DisplayBasePage {
  readonly inputLabel: Locator;
  readonly updateLabelButton: Locator;
  readonly resetCardsButton: Locator;
  readonly showVotesButton: Locator;

  constructor(public readonly page: Page) {
    super(page);

    this.inputLabel = this.page.getByRole('textbox', {
      name: 'Current Room Label',
    });

    this.updateLabelButton = this.page.getByRole('button', {
      name: 'Update label',
    });

    this.resetCardsButton = this.page.getByRole('button', {
      name: 'Reset cards',
    });

    this.showVotesButton = this.page.getByRole('button', {
      name: 'Show Votes',
    });
  }
}
