const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
//const firefox = require('selenium-webdriver/firefox');

describe('Google Search Test', function () {
    let driver;

    before(async function () {
        console.log('before() hook for open browser')
        options = new chrome.Options();
        //options.addArguments("--headless");
        options.addArguments("--incognito");
        options.addArguments("--log-level=3");
        options.addArguments("--silent");

        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

        //options = new firefox.Options();
        //options.addArguments("--headless");
        //driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
    });

    after(async function () {
        console.log('after() hook for close browser')
        await driver.quit();
    });

    it('Open Website', async function () {
        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();
        // assert: memastikan object sama persis
        assert.strictEqual(title, 'Swag Labs');
        await driver.sleep(3000);        
    });

    it('Login Website', async function () {
        // inputs
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
        await inputUsername.sendKeys('visual_user')
        await inputPassword.sendKeys('secret_sauce')
        await driver.sleep(1000)
        await buttonLogin.click()
        
        // tunggu element tampil
        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="shopping_cart_container"]')), 
            10000
        );
        await driver.wait(until.elementIsVisible(buttonCart), 5000, 'Shopping cart harus tampil');
        
        // assert: elememt ada
        await buttonCart.isDisplayed()

        // assert: text dalam element benar
        let textAppLogo = await driver.findElement(By.className('app_logo'))
        let logotext = await textAppLogo.getText()
        assert.strictEqual(logotext, 'Swag Labs')
        await driver.sleep(1700)
    });
    it('Dropdown Filter', async function () {
        // dropdown search
        let dropdownSort = await driver.findElement(By.xpath('//select[@data-test="product-sort-container"]'))
        await dropdownSort.click()
        let optionPriceLow = await driver.findElement(By.xpath('//option[text()="Price (low to high)"]'));
        await optionPriceLow.click();

        // assert: text Sorting
        let checkText = await driver.findElement(By.className('active_option')).getText();
        assert.strictEqual(checkText, 'Price (low to high)');
        await driver.sleep(500);

        dropdownSort = await driver.findElement(By.xpath('//select[@data-test="product-sort-container"]'))
        await dropdownSort.click()
        let optionPriceHigh = await driver.findElement(By.xpath('//option[text()="Price (high to low)"]'));
        await optionPriceHigh.click();

        // assert: text Sorting
        checkText = await driver.findElement(By.className('active_option')).getText();
        assert.strictEqual(checkText, 'Price (high to low)');
        await driver.sleep(500);

        dropdownSort = await driver.findElement(By.xpath('//select[@data-test="product-sort-container"]'))
        await dropdownSort.click()
        let optionNameZtoA = await driver.findElement(By.xpath('//option[text()="Name (Z to A)"]'));
        await optionNameZtoA.click();

        // assert: text Sorting
        checkText = await driver.findElement(By.className('active_option')).getText();
        assert.strictEqual(checkText, 'Name (Z to A)');
        await driver.sleep(500);

        dropdownSort = await driver.findElement(By.xpath('//select[@data-test="product-sort-container"]'))
        await dropdownSort.click()
        let optionNameAtoZ = await driver.findElement(By.xpath('//option[text()="Name (A to Z)"]'));
        await optionNameAtoZ.click();

        // assert: text Sorting
        checkText = await driver.findElement(By.className('active_option')).getText();
        assert.strictEqual(checkText, 'Name (A to Z)');
        await driver.sleep(2000);       
    });
});
