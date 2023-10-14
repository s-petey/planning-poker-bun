import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // retries: 2,
  // workers: 1,
  reporter: process.env.CI ? 'github' : 'html',
  testDir: 'tests',
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  use: {
    baseURL: 'http://localhost:5173',
  },
  webServer: [
    {
      command: 'bun run dev:api',
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'bun run dev:web',
      port: 5173,
      reuseExistingServer: !process.env.CI,
    },
  ],
};

export default config;
