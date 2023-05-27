import {defineConfig} from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  timeout: 180 * 1000, // тест должен прохадить за 3 минуты
  expect: {
    timeout: 10000,
  }, //ожидание для експекта
  fullyParallel: false, // проходят паралельно тест
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    actionTimeout: 5000, // на каждое действие 5 секунд(будет пытаться сделать это действие на протяжение 5 сек)
    baseURL: 'https://www.saucedemo.com',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'local chromium',
      use: {
        viewport: {width: 1920, height: 1080}, // разрешение каое будем использовать
        browserName: 'chromium',
        video: 'on',
        trace: 'on', // репорт с записью нашых действий
        screenshot: 'on', // в конце теста будет делать скриншот
        headless: true, // ture - не будет открывать браузер
        launchOptions: {
          slowMo: 0,
        }, // если быстро несется можно замедлять
      },
    },

    {
      name: ' local firefox',
      use: {
        viewport: {width: 1920, height: 1080}, // разрешение каое будем использовать
        browserName: 'firefox',
        video: 'on',
        trace: 'on', // репорт с записью нашых действий
        screenshot: 'on', // в конце теста будет делать скриншот
        headless: true, // ture - не будет открывать браузер
        launchOptions: {
          slowMo: 0,
        }, // если быстро несется можно замедлять
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
