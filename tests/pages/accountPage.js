// pages/accountPage.js
import { Selector } from 'testcafe';

class AccountPage {
    constructor() {
        this.signupButton = Selector('a').withText('Signup / Login');
        this.firstNameInput = Selector('#form > div > div > div:nth-child(3) > div > form > input[type=text]:nth-child(2)');
        this.emailInput = Selector('#form > div > div > div:nth-child(3) > div > form > input[type=email]:nth-child(3)');
        this.submitButton = Selector('#form > div > div > div:nth-child(3) > div > form > button');
        this.genderOption = Selector('#id_gender2');
        this.passwordInput = Selector('#password');
        this.daysDropdown = Selector('#days');
        this.monthsDropdown = Selector('#months');
        this.yearsDropdown = Selector('#years');
        this.newsletterCheckbox = Selector('#newsletter');
        this.optinCheckbox = Selector('#optin');
        this.firstNameField = Selector('#first_name');
        this.lastNameField = Selector('#last_name');
        this.companyField = Selector('#company');
        this.address1Field = Selector('#address1');
        this.address2Field = Selector('#address2');
        this.stateField = Selector('#state');
        this.cityField = Selector('#city');
        this.zipCodeField = Selector('#zipcode');
        this.phoneField = Selector('#mobile_number');
        this.createAccountButton = Selector('#form > div > div > div > div.login-form > form > button');
        this.successMessage = Selector('#form > div > div > div > h2 > b');
        this.continueButton = Selector('#form > div > div > div > div > a');
    }

    async createAccount(t, userData) {
        await t
            .click(this.signupButton)
            .typeText(this.firstNameInput, userData.firstName)
            .typeText(this.emailInput, userData.email)
            .click(this.submitButton)
            .wait(2000)
            .click(this.genderOption)
            .typeText(this.passwordInput, userData.password)
            .click(this.daysDropdown)
            .click(this.daysDropdown.find('option').nth(5)) // Change index as needed
            .click(this.monthsDropdown)
            .click(this.monthsDropdown.find('option').nth(2)) // Change index as needed
            .click(this.yearsDropdown)
            .click(this.yearsDropdown.find('option').nth(16)) // Change index as needed
            .click(this.newsletterCheckbox)
            .click(this.optinCheckbox)
            .typeText(this.firstNameField, userData.firstName)
            .typeText(this.lastNameField, userData.lastName)
            .typeText(this.companyField, userData.company)
            .typeText(this.address1Field, userData.address1)
            .typeText(this.address2Field, userData.address2)
            .typeText(this.stateField, userData.state)
            .typeText(this.cityField, userData.city)
            .typeText(this.zipCodeField, userData.zipCode)
            .typeText(this.phoneField, userData.phone)
            .click(this.createAccountButton);

        await t.expect(this.successMessage.innerText).contains('ACCOUNT CREATED!');
        await t.click(this.continueButton);
        console.log('Account created successfully for: ', userData.firstName);
    }
}

export default new AccountPage(); // Export the instance
