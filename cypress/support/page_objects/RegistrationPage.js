class RegistrationPage {

    fillEmail(email) {
        cy.get('#email_create').should('be.visible').type(email); //metoda wpisująca email
    }

    submitEmail() {
        cy.get('#SubmitCreate').click(); //metoda klikająca zatwierdzenie emaila
    }

    // Kombinacja obu powyższych
    enterEmail(email) {
        this.fillEmail(email);
        this.submitEmail();
    }

    clickOnCreateAnAccount(){ //kliknięcie przycisku Create an account
        cy.get('#SubmitCreate').click();
    }

    fillPersonalInformation({ title, firstName, lastName, password, dob, newsletter }) {
        if (title === 'Mr') cy.get('#id_gender1').check(); // Jeśli tytuł to "Mr", zaznacz radio button "Mr"
        else if (title === 'Mrs') cy.get('#id_gender2').check();  // Jeśli tytuł to "Mrs", zaznacz radio button "Mrs"
    
        if (firstName) cy.get('#customer_firstname').type(firstName); // Jeśli podano imię, wpisz je do pola "First name"
        if (lastName) cy.get('#customer_lastname').type(lastName);
        if (password) cy.get('#passwd').type(password);
    
        if (dob) {
            if (dob.day) cy.get('#days').select(dob.day);
            if (dob.month) cy.get('#months').select(dob.month);
            if (dob.year) cy.get('#years').select(dob.year);
        }
    
        if (newsletter) cy.get('#newsletter').check();
    }

    submitRegistration(){
        cy.get('#submitAccount').click(); // Zatwierdzenie rejestracji
    }

    assertSuccessMessage(expectedMessage) {
        cy.get('.alert.alert-success').should('contain', expectedMessage);
    }

    assertErrorMessage(expectedMessage) {
        cy.get('.alert.alert-danger').should('contain', expectedMessage);
    }
}

export default new RegistrationPage();
