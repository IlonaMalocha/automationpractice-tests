// SignInPage.js
class SignInPage {
    // Selektory pól i przycisków
    get emailInput() {
        return cy.get('#email'); // Selektor pola e-mail
    }

    get passwordInput() {
        return cy.get('#passwd'); // Selektor pola hasła
    }

    get signInButton() {
        return cy.get('#SubmitLogin'); // Selektor przycisku logowania
    }

    get errorMessage() {
        return cy.get('.alert-danger'); // Selektor dla komunikatów o błędach logowania
    }

    get successMessage() {
        return cy.get('.info-account'); // Selektor dla wiadomości powitalnej po udanym logowaniu
    }

    // Metoda wprowadzająca e-mail do pola
    enterEmail(email) {
        this.emailInput.clear().type(email);
    }

    // Metoda wprowadzająca hasło do pola
    enterPassword(password) {
        this.passwordInput.clear().type(password);
    }

    // Metoda do przesyłania formularza logowania
    submitLogin() {
        this.signInButton.click();
    }

    // Assercja sukcesu logowania
    assertSuccessMessage(message) {
        this.successMessage.should('be.visible').and('contain.text', message); //should('be.visible'), by uniknąć testu przechodzącego, gdy element nie jest w ogóle wyrenderowany
    }

    // Assercja komunikatu błędu logowania
    assertErrorMessage(expectedMessage) {
        this.errorMessage.should('be.visible').and('contain.text', expectedMessage);
    }
}

export default new SignInPage();
