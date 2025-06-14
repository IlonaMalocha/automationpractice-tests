class RegistrationPage {

    fillEmail(email) {
        cy.get('#email_create').should('be.visible').type(email);
    }

    submitEmail() {
        cy.get('#SubmitCreate').click();
    }

    enterEmail(email) {
        this.fillEmail(email);
        this.submitEmail();
    }

    clickOnCreateAnAccount(){
        cy.get('#SubmitCreate').click();
    }

    fillPersonalInformation({ title, firstName, lastName, password, dob, newsletter }) {
        if (title === 'Mr') cy.get('#id_gender1').check();
        else if (title === 'Mrs') cy.get('#id_gender2').check();
    
        if (firstName) cy.get('#customer_firstname').type(firstName);
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
        cy.get('#submitAccount').click();
    }

    assertSuccessMessage(expectedMessage){
        cy.get('.alert.alert-success').should('contain', expectedMessage);
    }

    assertErrorMessage(expectedMessage){
        cy.get('.alert.alert-danger').should('contain', expectedMessage);
    }
}

export default new RegistrationPage();
