///<reference types="cypress"/>

import Home from "../support/page_objects/Home.js";
import SignInPage from "../support/page_objects/SignInPage.js";
import loginData from '../fixtures/loginData.json';

describe('User Login', () => {

    beforeEach('Go to SignIn page', () => {
        cy.openHomePage();
        Home.clickOnSingIn(); // Przejście na stronę logowania
    });

    beforeEach(function() {
        cy.fixture('loginData').then((data) => {
            this.loginData = data;
        });
    });

    describe('Positive test cases', () => {

      it('Should log in with valid credentials from registration', () => {
        // Wczytanie e-maila i hasła z pliku `tempLoginData.json`
        cy.fixture('tempLoginData').then((loginData) => {
            SignInPage.enterEmail(loginData.email);
            SignInPage.enterPassword(loginData.password);
            SignInPage.submitLogin();
            SignInPage.assertSuccessMessage("Welcome to your account. Here you can manage all of your personal information and orders.");
            SignInPage.clickOnSignOut();
        });
    });
    });

    describe('Negative test cases', () => {

        it('Should show an error with an invalid email format', function() {
            const invalidData = this.loginData.find(test => test.scenario === 'Invalid email format');
            SignInPage.enterEmail(invalidData.email);
            SignInPage.enterPassword(invalidData.password);
            SignInPage.submitLogin();
            SignInPage.assertErrorMessage(invalidData.message); // Sprawdzenie komunikatu błędu
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
