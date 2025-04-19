///<reference types="cypress"/>

import Home from "../support/page_objects/Home.js";
import SignInPage from "../support/page_objects/SignInPage.js";

describe('User Login', () => {

    beforeEach(function() {
        cy.fixture('loginData').then((data) => {
            this.loginData = data;
        });
        cy.fixture('tempLoginData').then((data) => {
            this.tempLoginData = data;
        });
        cy.openHomePage();
        Home.signIn.click();
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
      it('Should log in with valid credentials from registration', function(){
        const { email, password } = this.tempLoginData;
            SignInPage.enterEmail(email);
            SignInPage.enterPassword(password);
            SignInPage.submitLogin();
            SignInPage.assertSuccessMessage("Welcome to your account. Here you can manage all of your personal information and orders.");
        });
    });

    describe('Negative test cases', () => {
        it('Should show an error with an invalid email format', function() {
            const invalidData = this.loginData.find(test => test.scenario === 'Invalid email format');
            SignInPage.enterEmail(invalidData.email);
            SignInPage.enterPassword(invalidData.password);
            SignInPage.submitLogin();
            SignInPage.assertErrorMessage(invalidData.message);
        });

        it('Should show an error when email is missing', function() {
            const invalidData = this.loginData.find(test => test.scenario === 'Missing email');
            SignInPage.enterPassword(invalidData.password);
            SignInPage.submitLogin();
            SignInPage.assertErrorMessage(invalidData.message);
        });

        it('Should show an error when password is missing', function() {
            const invalidData = this.loginData.find(test => test.scenario === 'Missing password');
            SignInPage.enterEmail(invalidData.email);
            SignInPage.submitLogin();
            SignInPage.assertErrorMessage(invalidData.message);
        });

        it('Should show an error with incorrect email or password', function() {
            const invalidData = this.loginData.find(test => test.scenario === 'Incorrect email or password');
            SignInPage.enterEmail(invalidData.email);
            SignInPage.enterPassword(invalidData.password);
            SignInPage.submitLogin();
            SignInPage.assertErrorMessage(invalidData.message);
        });
    });
});
