///<reference types="cypress"/>

import ContactUsPage from "../support/page_objects/ContactUsPage.js"
import Home from "../support/page_objects/Home.js"

describe('Contact Us Subpage', () => {

    beforeEach(function() {
        cy.fixture('contactData').then((data) => {
            this.contactData = data;
        })
        cy.openHomePage()
        Home.contactUs.click()
    })

    describe('Sending a message', () => {

        describe('Positive test cases', () => {
            it('Should send a message with a valid email and all fields completed', function() {
                const validDataSets = this.contactData.filter(test => test.scenario === 'Valid email, all fields completed');
                validDataSets.forEach((validData) => {
                ContactUsPage.fillForm(validData);
                ContactUsPage.submitForm();
                ContactUsPage.assertSuccessMessage(validData.expectedSuccessMessage);
                cy.wait(500);
                Home.contactUs.click()
                })
            })

            it('Should send a message despite the missing order reference', function() {
                const validDataSets = this.contactData.filter(test => test.scenario === 'No order reference');
                validDataSets.forEach((validData) => {
                ContactUsPage.fillForm(validData);
                ContactUsPage.submitForm();
                ContactUsPage.assertSuccessMessage(validData.expectedSuccessMessage);
                cy.wait(500);
                Home.contactUs.click()     
                })
            })

            it('Should send a message with a file attachment', function() {
                const validDataSets = this.contactData.filter(test => test.scenario === 'File attached');
                validDataSets.forEach((validData) => {
                ContactUsPage.fillForm(validData);
                const fileName = 'sampleFile.txt';
                ContactUsPage.attachFile(fileName);
                ContactUsPage.submitForm();
                ContactUsPage.assertSuccessMessage(validData.expectedSuccessMessage);
                cy.wait(500);
                Home.contactUs.click()
                })
            })
        })

        describe('Negative test cases', () => {
            it('Should show an error when trying to send a message without an e-mail', function() {
                const validDataSets = this.contactData.filter(test => test.scenario === 'No email');
                validDataSets.forEach((validData) => {
                ContactUsPage.fillForm(validData);
                ContactUsPage.submitForm();
                ContactUsPage.assertErrorMessage(validData.expectedErrorMessage);
                ContactUsPage.assertErrorMessageReason(validData.expectedErrorMessageReason);
                cy.wait(500);
                Home.contactUs.click()  
                })
            })

            it('Should show an error when trying to send a message with incorrect email', function() {
                const validDataSets = this.contactData.filter(test => test.scenario === 'Invalid email');
                validDataSets.forEach((validData) => {
                ContactUsPage.fillForm(validData);
                ContactUsPage.submitForm();
                ContactUsPage.assertErrorMessage(validData.expectedErrorMessage);
                ContactUsPage.assertErrorMessageReason(validData.expectedErrorMessageReason);
                cy.wait(500);
                Home.contactUs.click()  
                })
            })

            it('Should show an error when trying to send a message without a subject and eventually send it when corrected', function() {
                const validDataSets = this.contactData.filter(test => test.scenario === 'No subject');
                validDataSets.forEach((validData) => {
                ContactUsPage.fillForm(validData);
                ContactUsPage.submitForm();
                ContactUsPage.assertErrorMessage(validData.expectedErrorMessage);
                ContactUsPage.assertErrorMessageReason(validData.expectedErrorMessageReason);
                ContactUsPage.selectSubjectHeading(validData.correctedSubject);
                ContactUsPage.submitForm();
                ContactUsPage.assertSuccessMessage(validData.expectedSuccessMessage);
                cy.wait(500);
                Home.contactUs.click() 
                })
            })

            it('Should show an error when trying to send a message without a content and eventually send it when corrected', function() {
                const validDataSets = this.contactData.filter(test => test.scenario === 'No content');
                validDataSets.forEach((validData) => {
                ContactUsPage.fillForm(validData);
                ContactUsPage.submitForm();
                ContactUsPage.assertErrorMessage(validData.expectedErrorMessage);
                ContactUsPage.assertErrorMessageReason(validData.expectedErrorMessageReason);
                ContactUsPage.typeMessage(validData.correctedMessage);
                ContactUsPage.submitForm();
                ContactUsPage.assertSuccessMessage(validData.expectedSuccessMessage);
                cy.wait(500);
                Home.contactUs.click() 
                })
            })
        })
    })

    describe('Subject heading - description', () => {
        it('Should show a correct description when selecting Customer Service subject', () => {
            ContactUsPage.selectSubjectHeading('Customer service');
            ContactUsPage.assertCustomerServiceDescription();
        })

        it('Should show a correct description when selecting Webmaster subject', () => {
            ContactUsPage.selectSubjectHeading('Webmaster');
            ContactUsPage.assertWebmasterDescription();
        })
    })
})
