export class APIDemosPage {
    static appBtn() {
        return $('//android.widget.TextView[@content-desc="App"]');
    }
    static allertDlgs() {
        return $('//android.widget.TextView[@content-desc="Alert Dialogs"]');
    }
    static textEntryDlg() {
        return $('//android.widget.Button[@content-desc="Text Entry dialog"]');
    }
    static usernameField() {
        return $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/username_edit"]');
    }
    static passwordField() {
        return $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/password_edit"]')
    }
    static okBtn() {
        return $('//android.widget.Button[@resource-id="android:id/button1"]')
    }
    static cancelBtn() {
        return $('//android.widget.Button[@resource-id="android:id/button2"]')
    }
    // static searchBtn() {
    //     return $('//android.widget.TextView[@content-desc="Search"]');
    // }
    // static InvokeSearchBtn() {
    //     return $('//android.widget.TextView[@content-desc="Invoke Search"]');
    // }
    // static prefillQueryField() {
    //     return $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/txt_query_prefill"]');
    // }
    // static appDataField() {
    //     return $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/txt_query_appdata"]');
    // }
}