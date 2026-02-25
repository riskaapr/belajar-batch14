import { APIDemosActions } from "../actions/apidemos.action";

const apiDemosAction = new APIDemosActions();
//let fillText: string;

describe("ApiDemos", async () => {
    // before(async function() {
    //     fillText = "Hello";
    // })

    beforeEach(async function() {
        await driver.relaunchActiveApp();
        //fillText = this.currentTest?.title as string
        await apiDemosAction.waitForAppBtn();
        await apiDemosAction.clickAppBtn();
        await apiDemosAction.ClickAlertDialogs();
        await apiDemosAction.ClickTextEntryDialog();
        await apiDemosAction.fillUsernameField('username');
        await apiDemosAction.fillPasswordField('123456');
    })

    afterEach(async function() {
        if (this.currentTest?.state !== undefined) {
            await driver.takeScreenshot();
            await driver.saveScreenshot(`./screenshots/${this.currentTest.title}.png`);
        }
    })

    after(async function() {
        await driver.terminateApp('io.appium.android.apis');
    })

    it("@TC001 - First Login - Username Password Correct", async () => {
        await apiDemosAction.clickOkBtn();
        await apiDemosAction.ClickTextEntryDialog();

        expect(await apiDemosAction.getUsernameValue()).toEqual('username');
        expect(await apiDemosAction.getPasswordValue()).toEqual('••••••');
    });
    it("@TC002 - Second Login - Click Cancel Button", async () => {
        await apiDemosAction.clickCancelBtn();
        await apiDemosAction.ClickTextEntryDialog();

        expect(await apiDemosAction.getUsernameValue()).toEqual('username');
        expect(await apiDemosAction.getPasswordValue()).toEqual('••••••');
    });
    it("@TC003 - Third Login - Count Length Username Password", async () => {
        await apiDemosAction.clickOkBtn();
        await apiDemosAction.ClickTextEntryDialog();

        expect(await apiDemosAction.getUsernameValue()).toHaveLength(8);
        expect(await apiDemosAction.getPasswordValue()).toHaveLength(6);
    });
    it("@TC004 - Fourth Login - Username Password Not Empty", async () => {
        await apiDemosAction.clickOkBtn();
        await apiDemosAction.ClickTextEntryDialog();

        expect(await apiDemosAction.getUsernameValue()).not.toEqual('');
        expect(await apiDemosAction.getPasswordValue()).not.toEqual('');
    });
});