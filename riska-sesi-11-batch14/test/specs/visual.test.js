const { Builder } = require('selenium-webdriver');
const LoginAction = require('../actions/login.action');
const { compareScreenshot } = require('../../utilities/visual_regression.helper');

describe('Login', () => {
    let driver;
    let loginAction;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        loginAction = new LoginAction(driver);
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
        //await compareScreenshot(driver, 'success_login', 2);
        await compareScreenshot(driver, 'success_login');
    });
    it('Login not filling in credentials', async () => {
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Username is required');
        await compareScreenshot(driver, 'failed_login_empty_credentials');
    });
    it('Login with Empty Username', async () => {
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Username is required');
        await compareScreenshot(driver, 'failed_login_empty_username');
    });
    it('Login with Empty Password', async () => {
        await loginAction.inputUsername('standard_userr');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Password is required');
        await compareScreenshot(driver, 'failed_login_empty_password');
    });
    it('Login with Lock out User', async () => {
        await loginAction.inputUsername('locked_out_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Sorry, this user has been locked out.');
        await compareScreenshot(driver, 'failed_login_lock_user');
    });
    it('Login with Wrong Password', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('xxxxxx');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');
        await compareScreenshot(driver, 'failed_login_wrong_password');
    });
    it('Login with Invalid Username', async () => {
        await loginAction.inputUsername('standard_userr');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');
        await compareScreenshot(driver, 'failed_login_invalid_username');
    });
    it('Login with uppercase Username', async () => {
        await loginAction.inputUsername('STANDARD_USER');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');
        await compareScreenshot(driver, 'failed_login_uppercase_username');
    });
});
