import {expect, Locator, Page} from '@playwright/test';
import {PageObject} from '../PageObject';
import {takeScreenshotOfElement} from '../../helpers/common';

export const defaultPassword = 'secret_sauce';

export class LoginPage extends PageObject {
  // типизируем
  protected readonly usernameField: Locator;
  protected readonly passwordField: Locator;
  protected readonly loginButton: Locator;
  protected readonly errorMassage: Locator;

  //protected readonly okay:string;

  constructor(page: Page) {
    super(page, '/'); // => / = это урл страницы
    //this.titleSwagLabs = page.getByText('Swag Labs'); // ищем по тексту
    this.usernameField = page.locator("//input[@id='user-name']");
    this.passwordField = page.locator("//input[@id='password']");
    this.loginButton = page.locator("//input[@id='login-button']");
    // this.loginButton = page.getByRole('button', {name: 'Login'}); //nth(0); выбор кнопки по счету//this.loginButton = page.locator('.login-box').getByRole('button', {name: 'Login'}); = это отталкивание от определеного обьекта
    //this.passwordField = page.getByPlaceholder('Password'); //идем по плейсхолдеру
    this.errorMassage = page.locator('//*[@data-test="error"]');
    //this.page = 'fhgdf';
  }

  async fillLoginForm(username: string, password: string = 'secret_sauce') {
    // secte если параметр passwodr задаем
    // это необязательный параметр
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    //await this.titleSwagLabs.selectOption('standarrd_user'); // это выбор из списка
  }

  async clickOnLoginButton() {
    await this.loginButton.click({timeout: 10000}); // timeout задаем параметры обязательно в {}
  }

  async checkSuccessLogin() {
    await expect(this.usernameField).not.toBeVisible();
    await expect(this.passwordField).not.toBeVisible();
    await expect(this.loginButton).not.toBeVisible();
    // await expect(this.page).toHaveURL(''); // что урл есть и он правельный
  }

  async checkNotSuccessLogin() {
    await expect(this.usernameField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    // await expect(this.page).toHaveURL(''); // что урл есть и он правельный
  }

  async takeScreenshotForErrorMessage(fileName: string) {
    await takeScreenshotOfElement(this.errorMassage, fileName);
  }
}
