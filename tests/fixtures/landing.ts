import type { Page, Locator } from '@playwright/test';

export class LandingPage {
  readonly inputRoom: Locator;
  readonly createOrJoinButton: Locator;

  constructor(public readonly page: Page) {
    this.inputRoom = this.page.getByRole('textbox', {
      name: 'Create or filter rooms:',
    });
    this.createOrJoinButton = this.page.getByRole('button', {
      name: 'Create or Join Room',
    });
  }

  async goToRoomPage(roomName: string) {
    await this.inputRoom.click();
    await this.inputRoom.fill(roomName);
    await this.createOrJoinButton.click();
  }

  async goto() {
    await this.page.goto('/');
  }
}
