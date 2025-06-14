class ContactUsPage {
    
    get SubjectHeading() {
        return cy.get('#id_contact');
    }

    get EmailInput() {
        return cy.get('#email');
    }

    get OrderIdInput() {
        return cy.get('#id_order');
    }

    get MessageText() {
        return cy.get('#message');
    }

    get FileAttachment() {
        return cy.get('input[type="file"]');
    }

    get SubmitButton() {
        return cy.get('#submitMessage');
    }

    get SuccessAlert() {
        return cy.get('.alert-success');
    }

    get ErrorAlert() {
        return cy.get('.alert-danger').find('p');
    }

    get ErrorAlertReason() {
        return cy.get('.alert-danger').find('li');
    }

    get CustomerServiceDescription() {
        return cy.get('#desc_contact2');
    }

    get WebmasterDescription() {
        return cy.get('#desc_contact1');
    }

    selectSubjectHeading(subject) {
        this.SubjectHeading.select(subject);
    }

    typeEmail(email) {
        this.EmailInput.type(email);
    }

    typeOrderId(orderId) {
        this.OrderIdInput.type(orderId);
    }

    typeMessage(message) {
        this.MessageText.type(message);
    }

    attachFile(fileName) {
        this.FileAttachment.attachFile(fileName);
    }

    submitForm() {
        this.SubmitButton.click();
    }

    fillForm({ subject, email, orderId, message }) {
        if (subject) this.selectSubjectHeading(subject);
        if (email) this.typeEmail(email);
        if (orderId) this.typeOrderId(orderId);
        if (message) this.typeMessage(message);
    }

    assertSuccessMessage(expectedMessage) {
        this.SuccessAlert.should('contain', expectedMessage);
    }

    assertErrorMessage(expectedMessage) {
        this.ErrorAlert.should('contain', expectedMessage);
    }

    assertErrorMessageReason(expectedReason) {
        this.ErrorAlertReason.should('contain', expectedReason)
    }

    assertCustomerServiceDescription(){
        this.CustomerServiceDescription.should('be.visible').and('contain', 'For any question about a product, an order');
    }
    
    assertWebmasterDescription(){
        this.WebmasterDescription.should('be.visible').and('contain', 'If a technical problem occurs on this website');
    }
}

export default new ContactUsPage;
