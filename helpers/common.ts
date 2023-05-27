import {expect, Locator, Page} from '@playwright/test';
import {LoginPage} from '../pages/login/LoginPage';

export const getMaxDiffPixels = (width: number, height: number): number => {
  return Math.round(((width * height) / 100) * 0.01);
};

export enum ProductNames {
  SAUCE_LABS_BACKPACK = 'Sauce Labs Backpack',
  SAUCE_LABS_BIKE_LIGHT = 'Sauce Labs Bike Light',
  SAUCE_LABS_BOLT_T_SHIRT = 'Sauce Labs Bolt T-Shirt',
  SAUCE_LABS_FLEECE_JACKET = 'Sauce Labs Fleece Jacket',
  SAUCE_LABS_Onesie = 'Sauce Labs Onesie',
  TEST = 'Test.allTheThings() T-Shirt (Red)',
}

export const takeScreenshotOfElement = async (selector: Locator, fileName: string) => {
  const boundingBox = await selector.boundingBox();
  const width = boundingBox?.width || 0;
  const height = boundingBox?.height || 0;
  await expect(selector).toHaveScreenshot(fileName, {
    maxDiffPixels: getMaxDiffPixels(width, height),
  });
};

export const loginTestHelper = async (page: Page, username: string, password: string = 'secret_sauce') => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillLoginForm(username, password);
  await loginPage.clickOnLoginButton();
  await loginPage.checkSuccessLogin();
};
