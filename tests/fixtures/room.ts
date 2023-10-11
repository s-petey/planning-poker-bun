import type { Page, Locator } from '@playwright/test';

export class RoomPage {
  readonly inputDisplay: Locator;
  readonly joinButton: Locator;
  readonly slideToggle: Locator;

  constructor(public readonly page: Page) {
    this.inputDisplay = this.page.getByRole('textbox', {
      name: 'Your Display Name:',
    });

    this.joinButton = this.page.getByRole('button', {
      name: 'Join room',
    });

    this.slideToggle = this.page.getByTestId('slide-toggle');
  }

  async goToDisplayPage(displayName: string, isHost?: boolean) {
    await this.inputDisplay.click();
    await this.inputDisplay.fill(displayName);

    if (typeof isHost === 'boolean' && isHost) {
      await this.slideToggle.click();
    }

    await this.joinButton.click();
  }
}
