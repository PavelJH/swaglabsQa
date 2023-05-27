import {expect, Locator, Page} from '@playwright/test';

export class PageObject {
  readonly page: Page;
  protected readonly pageUrl: string;
  protected readonly cart: Locator;
  protected readonly hamburgerMenuButton: Locator;
  protected readonly leftMenu: Locator;

  constructor(page: Page, pageUrl: string) {
    this.page = page;
    this.pageUrl = pageUrl;
    this.cart = page.locator("//a[@class='shopping_cart_link']");
    this.hamburgerMenuButton = page.locator("//button[@id='react-burger-menu-btn']");
    this.leftMenu = page.locator("//div[@class='bm-menu']");
  }

  async goto(options?: object) {
    let pageUrl: string = this.pageUrl;
    for (const key in options) {
      const reqExp = new RegExp('\\{' + key + '\\}', 'gi');
      pageUrl = pageUrl.replace(reqExp, options[key]);
    }
    await this.page.goto(pageUrl);
  }

  async clickOnCart() {
    await this.cart.click();
  }

  async openLeftMenu() {
    await this.hamburgerMenuButton.click();
    await expect(this.leftMenu).toBeVisible();
  }
}
