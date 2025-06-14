class SignInPage {
    
    get emailInput() {
        return cy.get('#email');
    }

    get passwordInput() {
        return cy.get('#passwd');
    }

    get signInButton() {
        return cy.get('#SubmitLogin');
    }

    get errorMessage() {
        return cy.get('.alert-danger');
    }

    get successMessage() {
        return cy.get('.info-account');
    }

    enterEmail(email) {
        this.emailInput.clear().type(email);
    }

    enterPassword(password) {
        this.passwordInput.clear().type(password);
    }

    submitLogin() {
        this.signInButton.click();
    }

    assertSuccessMessage(message) {
        this.successMessage.should('be.visible').and('contain.text', message);
    }

    assertErrorMessage(expectedMessage) {
        this.errorMessage.should('be.visible').and('contain.text', expectedMessage);
    }
}

export default new SignInPage();
