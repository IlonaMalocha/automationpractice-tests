class RegistrationPage {

    enterEmail(email) {
        cy.get('#email_create').type(email); // Pole e-mail
        cy.get('#SubmitCreate').click(); // Kliknięcie przycisku "Create an account"
    }

    clickOnCreateAnAccount(){
        cy.get('#SubmitCreate').click();
    }

    fillPersonalInformation(title, firstName, lastName, password, dob, newsletter) {
        // Wybór tytułu (jeśli podany)
        if (title) {
            if (title === 'Mr') {
                cy.get('#id_gender1').check();
            } else if (title === 'Mrs') {
                cy.get('#id_gender2').check();
            }
        }
    
        // Imię (jeśli podane)
        if (firstName) {
            cy.get('#customer_firstname').type(firstName);
        }
    
        // Nazwisko (jeśli podane)
        if (lastName) {
            cy.get('#customer_lastname').type(lastName);
        }
    
        // Hasło (jeśli podane)
        if (password) {
            cy.get('#passwd').type(password);
        }
    
        // Data urodzenia (jeśli podana)
        if (dob) {
            if (dob.day) cy.get('#days').select(dob.day);
            if (dob.month) cy.get('#months').select(dob.month);
            if (dob.year) cy.get('#years').select(dob.year);
        }
    
        // Zgoda na newsletter (jeśli dotyczy)
        if (newsletter) {
            cy.get('#newsletter').check();
        }
    }

    submitRegistration() {
        cy.get('#submitAccount').click(); // Zatwierdzenie rejestracji
    }

    assertSuccessMessage(expectedMessage) {
        cy.get('.alert.alert-success').should('contain', expectedMessage);
    }

    assertErrorMessage(expectedMessage) {
        cy.get('.alert.alert-danger').should('contain', expectedMessage);
    }

    signOut(){
        cy.get('.header_user_info a.logout').click();
    }
}

export default new RegistrationPage();
