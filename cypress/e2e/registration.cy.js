///<reference types="cypress"/>

import Home from "../support/page_objects/Home.js"
import RegistrationPage from "../support/page_objects/RegistrationPage.js";

function generateUniqueEmail() {
    const timestamp = new Date().getTime(); 
    return `user${timestamp}@test.com`;
}

describe('User Registration', () => {
    beforeEach(function() {
        cy.fixture('registrationData').then((data) => {
            this.registrationData = data;
        });
        cy.openHomePage();
        Home.signIn.click()
    });

    afterEach(() => {
        cy.get('body').then(($body) => {
            if ($body.find('.logout').length > 0) {
                cy.get('.logout').click();
            }
        });
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    describe('Positive test cases', () => {
        it('Should register a user with a valid email and all fields completed', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'Valid email, all fields completed');
            dataSets.forEach((validData) => {
                const uniqueEmail = generateUniqueEmail();
                const dataToSubmit = { ...validData, email: uniqueEmail };
                RegistrationPage.enterEmail(dataToSubmit.email);
                cy.wait(2000);
                RegistrationPage.fillPersonalInformation(dataToSubmit);
                RegistrationPage.submitRegistration();
                RegistrationPage.assertSuccessMessage(dataToSubmit.message);
                cy.writeFile('cypress/fixtures/tempLoginData.json', {
                    email: dataToSubmit.email,
                    password: dataToSubmit.password
                });
            });
        });

        it('Should register a user with a valid email and only mandatory fields completed', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'Valid email, mandatory fields completed');
            dataSets.forEach((validData) => {
                const uniqueEmail = generateUniqueEmail();
                const dataToSubmit = { ...validData, email: uniqueEmail };
                RegistrationPage.enterEmail(dataToSubmit.email);
                cy.wait(2000);
                RegistrationPage.fillPersonalInformation(dataToSubmit);
                RegistrationPage.submitRegistration();
                RegistrationPage.assertSuccessMessage(dataToSubmit.message);
            });
        });
    });

    describe('Negative test cases', () => {

        it('Should show an error when trying to register with invalid email', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'Invalid email format');
            dataSets.forEach((invalidData) => {
                const dataToSubmit = { ...invalidData};
                RegistrationPage.enterEmail(dataToSubmit.email);
                RegistrationPage.assertErrorMessage(dataToSubmit.message)
            });
        });    

        it('Should show an error when trying to register without an email', () => {
            RegistrationPage.clickOnCreateAnAccount();
            RegistrationPage.assertErrorMessage("Invalid email address.")
        });

        it('Should show an error when trying to register with empty first name', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'Empty first name');
            dataSets.forEach((validData) => {
                const dataToSubmit = { ...validData};
                RegistrationPage.enterEmail(dataToSubmit.email);
                cy.wait(2000);
                RegistrationPage.fillPersonalInformation(dataToSubmit);
                RegistrationPage.submitRegistration();
                RegistrationPage.assertErrorMessage(dataToSubmit.message);
            });
        });

        it('Should show an error when trying to register with empty last name', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'Empty last name');
            dataSets.forEach((validData) => {
                const dataToSubmit = { ...validData};
                RegistrationPage.enterEmail(dataToSubmit.email);
                cy.wait(2000);
                RegistrationPage.fillPersonalInformation(dataToSubmit);
                RegistrationPage.submitRegistration();
                RegistrationPage.assertErrorMessage(dataToSubmit.message);
            });
        });

        it('Should show an error when trying to register with too short password', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'Password too short');
            dataSets.forEach((validData) => {
                const dataToSubmit = { ...validData};
                RegistrationPage.enterEmail(dataToSubmit.email);
                cy.wait(2000);
                RegistrationPage.fillPersonalInformation(dataToSubmit);
                RegistrationPage.submitRegistration();
                RegistrationPage.assertErrorMessage(dataToSubmit.message);
            });
        });

        it('Should show an error when trying to register without a password', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'Missing password');
            dataSets.forEach((validData) => {
                const dataToSubmit = { ...validData};
                RegistrationPage.enterEmail(dataToSubmit.email);
                cy.wait(2000);
                RegistrationPage.fillPersonalInformation(dataToSubmit);
                RegistrationPage.submitRegistration();
                RegistrationPage.assertErrorMessage(dataToSubmit.message);
            });
        });

        //bug below
        it('[BUG] Should show an error when trying to register with day of birth out of range (31/02)', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'DOB day out of range');
            dataSets.forEach((validData) => {
                const dataToSubmit = { ...validData};
                RegistrationPage.enterEmail(dataToSubmit.email);
                cy.wait(2000);
                RegistrationPage.fillPersonalInformation(dataToSubmit);
                RegistrationPage.submitRegistration();
                RegistrationPage.assertErrorMessage(dataToSubmit.message);
            });
        });

        it('Should show an error when trying to register with a date of birth later that today', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'DOB later that today');
            dataSets.forEach((validData) => {
                const dataToSubmit = { ...validData};
                RegistrationPage.enterEmail(dataToSubmit.email);
                cy.wait(2000);
                RegistrationPage.fillPersonalInformation(dataToSubmit);
                RegistrationPage.submitRegistration();
                RegistrationPage.assertErrorMessage(dataToSubmit.message);
            });
        });

        it('Should show an error when trying to register with an empty email field', () => {
            RegistrationPage.enterEmail(' ');
            RegistrationPage.clickOnCreateAnAccount();
            RegistrationPage.assertErrorMessage("Invalid email address.");
        });

        it('Should show an error when trying to register with whitespace as email', () => {
            RegistrationPage.enterEmail('    ');
            RegistrationPage.clickOnCreateAnAccount();
            RegistrationPage.assertErrorMessage("Invalid email address.");
        });

        it('Should show an error when pressing Enter without entering email', () => {
            cy.get('#email_create').focus().type('{enter}');
            RegistrationPage.assertErrorMessage("Invalid email address.");
        });
    });
})