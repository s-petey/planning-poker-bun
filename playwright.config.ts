import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // retries: 2,
  // workers: 1,
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
  testDir: 'tests',
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
};

export default config;
