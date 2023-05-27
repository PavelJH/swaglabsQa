import {expect, Locator, Page} from '@playwright/test';
import {PageObject} from '../PageObject';
import {ProductNames} from '../../helpers/common';

export enum SortOptions {
  A_TO_Z = 'az',
  Z_TO_A = 'za',
  LOW_TO_HIGHT = 'lohi',
  HIGHT_TO_LOW = 'hilo',
}

export class ProductsPage extends PageObject {
  protected readonly pageNameText: Locator;
  protected readonly productsSortContainer: Locator;
  protected readonly shoppingCart: Locator;

  constructor(page: Page) {
    super(page, '/inventory.html'); // => / = это урл страницы
    this.pageNameText = page.locator("//span[@class='title']");
    this.productsSortContainer = page.locator("//select[@class='product_sort_container']");
    this.shoppingCart = page.locator('class="shopping_cart_link"');
  }

  async openProduct(productName: ProductNames) {
    await expect(this.page.locator(`//div[normalize-space()='${productName}']`)).toBeVisible();
    await this.page.locator(`//div[normalize-space()='${productName}']`).click();
  }

  async addToProduct(cardName: ProductNames) {
    await this.page.locator(`//div[normalize-space()='${cardName}']`).locator('Add to cart').click();
  }

  async selectSortOption(sortOptions: SortOptions) {
    await this.page.locator("//select[@class='product_sort_container']").selectOption(sortOptions);
  }
}
