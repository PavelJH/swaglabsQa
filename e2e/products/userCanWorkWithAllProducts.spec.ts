import {expect, test} from '@playwright/test';
import {ProductsPage} from '../../pages/products/ProductsPage';
import {loginTestHelper, ProductNames} from '../../helpers/common';
import {ProductPage} from '../../pages/products/ProductPage';

test.describe('User can work with all products', async () => {
  test('User can open all products', async ({page}) => {
    await loginTestHelper(page, 'standard_user');

    const productsPage = new ProductsPage(page);
    const productPage = new ProductPage(page);
    for (let productName of Object.values(ProductNames)) {
      await productsPage.openProduct(productName);
      await expect(await productPage.getProductTitle(), 'Product title is not correct').toEqual(productName);
      await productPage.takeScreenshotForProductImage(`${productName}.png`); // название динамическое
      await productPage.clickOnBackToProduct();
    }
  });
});
