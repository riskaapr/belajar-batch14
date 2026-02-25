import { APIDemosPage } from "../pageobjects/apidemos.page";

export class APIDemosActions {
    async waitForAppBtn() {
        await APIDemosPage.appBtn().waitForDisplayed({ timeout: 5000 });
    }

    async clickAppBtn() {
        await APIDemosPage.appBtn().click();
    }

    async verifyAppBtn() {
        return await APIDemosPage.appBtn().isDisplayed();
    }

    async ClickAlertDialogs(){
        await APIDemosPage.allertDlgs().waitForDisplayed({ timeout: 5000 });
        await APIDemosPage.allertDlgs().click();
    }

    async ClickTextEntryDialog(){
        await APIDemosPage.textEntryDlg().waitForDisplayed({ timeout: 5000 });
        await APIDemosPage.textEntryDlg().click();
    }

    async fillUsernameField(query: string) {
        await APIDemosPage.usernameField().setValue(query);
    }

    async fillPasswordField(query: string) {
        await APIDemosPage.passwordField().setValue(query);
    }

    async getUsernameValue() {
        return await APIDemosPage.usernameField().getText();
    }

    async getPasswordValue() {
        return await APIDemosPage.passwordField().getText();
    }

    async clickOkBtn() {
        await APIDemosPage.okBtn().click();
    }

    async clickCancelBtn() {
        await APIDemosPage.cancelBtn().click();
    }

    // async ClickSearchBtn() {
    //     await APIDemosPage.searchBtn().waitForDisplayed({ timeout: 5000 });
    //     await APIDemosPage.searchBtn().click();
    // }

    // async ClickInvokeSearchBtn() {
    //     await APIDemosPage.InvokeSearchBtn().click();
    // }

    // async fillQueryField(query: string) {
    //     await APIDemosPage.prefillQueryField().setValue(query);
    // }

    // async fillAppDataField(query: string) {
    //     await APIDemosPage.appDataField().setValue(query);
    // }

    // async getQueryFieldValue() {
    //     return await APIDemosPage.prefillQueryField().getText();
    // }

    // async getAppDataFieldValue() {
    //     return await APIDemosPage.appDataField().getText();
    // }
}