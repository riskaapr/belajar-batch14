const { Builder } = require('selenium-webdriver');
const LoginAction = require('../actions/login.action');
const SharingAction = require('../actions/sharing.action');
const LoginPage = require('../pageobjects/login.page');

describe('Login', () => {
    let driver;
    let loginAction;
    let sharingAction;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        loginAction = new LoginAction(driver);
        sharingAction = new SharingAction(driver);
        await loginAction.openLoginPage('https://www.saucedemo.com/');
    });

    afterEach(async () => {
        await driver.quit();
    });
    it('Login with valid credentials', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginSuccess();
        await sharingAction.fullPageScreenshot('login_success');        
    });
    it('Login not filling in credentials', async () => {
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Username is required');
        await sharingAction.fullPageScreenshot('login_failed_empty_credentials');
        await sharingAction.partialScreenshot(LoginPage.errorMessage, 'login_failed_empty_credentials_partial');
    });
    it('Login with Empty Username', async () => {
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Username is required');
        await sharingAction.fullPageScreenshot('login_failed_empty_username');
        await sharingAction.partialScreenshot(LoginPage.errorMessage, 'login_failed_empty_username_partial');
    });
    it('Login with Empty Password', async () => {
        await loginAction.inputUsername('standard_userr');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Password is required');
        await sharingAction.fullPageScreenshot('login_failed_empty_password');
        await sharingAction.partialScreenshot(LoginPage.errorMessage, 'login_failed_empty_password_partial');
    });
    it('Login with Lock out User', async () => {
        await loginAction.inputUsername('locked_out_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Sorry, this user has been locked out.');
        await sharingAction.fullPageScreenshot('login_failed_lock_user');
        await sharingAction.partialScreenshot(LoginPage.errorMessage, 'login_failed_lock_user_partial');
    });
    it('Login with Wrong Password', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('xxxxxx');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');
        await sharingAction.fullPageScreenshot('login_failed_wrong_password');
        await sharingAction.partialScreenshot(LoginPage.errorMessage, 'login_failed_wrong_password_partial');
    });
    it('Login with Invalid Username', async () => {
        await loginAction.inputUsername('standard_userr');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');
        await sharingAction.fullPageScreenshot('login_failed_invalid_username');
        await sharingAction.partialScreenshot(LoginPage.errorMessage, 'login_failed_invalid_username_partial');
    });
    it('Login with uppercase Username', async () => {
        await loginAction.inputUsername('STANDARD_USER');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');
        await sharingAction.fullPageScreenshot('login_uppercase_username_user');
        await sharingAction.partialScreenshot(LoginPage.errorMessage, 'login_failed_uppercase_username_partial');
    });
});
