///<reference types="cypress"/>

import ContactUsPage from "../support/page_objects/ContactUsPage.js"
import Home from "../support/page_objects/Home.js"

describe('Contact Us Subpage', () => {

    beforeEach('Go to Contact Us subpage', () => {
        cy.openHomePage()
        Home.clickOnContactUs()
    })
    beforeEach(function() {
        cy.fixture('testData').then((data) => {
            this.testData = data.contactFormData;
        })
    })

    describe('Sending a message', () => {

        describe('Positive test cases', () => {
            it('should send a message with a valid email and all fields completed', function() {
                const validDataSets = this.testData.filter(test => test.scenario === 'Valid email, all fields completed');
                validDataSets.forEach((validData) => {
                ContactUsPage.selectSubjectHeading(validData.subject);
                ContactUsPage.typeEmail(validData.email);
                ContactUsPage.typeOrderId(validData.orderId);
                ContactUsPage.typeMessage(validData.message);
                ContactUsPage.submitForm();
                ContactUsPage.assertSuccessMessage(validData.expectedSuccessMessage);
                Home.clickOnContactUs()    
                })
            })

            it('should send a message despite the missing order reference', function() {
                const validDataSets = this.testData.filter(test => test.scenario === 'No order reference');
                validDataSets.forEach((validData) => {
                ContactUsPage.selectSubjectHeading(validData.subject);
                ContactUsPage.typeEmail(validData.email);
                ContactUsPage.typeMessage(validData.message);
                ContactUsPage.submitForm();
                ContactUsPage.assertSuccessMessage(validData.expectedSuccessMessage);
                Home.clickOnContactUs()    
                })
            })

            it('should send a message with a file attachment', function() {
                const validDataSets = this.testData.filter(test => test.scenario === 'File attached');
                validDataSets.forEach((validData) => {
                ContactUsPage.selectSubjectHeading(validData.subject);
                ContactUsPage.typeEmail(validData.email);
                ContactUsPage.typeMessage(validData.message);
                const fileName = 'sampleFile.txt';
                ContactUsPage.attachFile(fileName);
                ContactUsPage.submitForm();
                ContactUsPage.assertSuccessMessage(validData.expectedSuccessMessage);
                Home.clickOnContactUs()    
                })
            })
        })

        describe('Negative test cases', () => {
            it('should show an error when trying to send a message without an e-mail', function() {
                const validDataSets = this.testData.filter(test => test.scenario === 'No email');
                validDataSets.forEach((validData) => {
                ContactUsPage.selectSubjectHeading(validData.subject);
                ContactUsPage.typeOrderId(validData.orderId);
                ContactUsPage.typeMessage(validData.message);
                ContactUsPage.submitForm();
                ContactUsPage.assertErrorMessage(validData.expectedErrorMessage);
                ContactUsPage.assertErrorMessageReason(validData.expectedErrorMessageReason);
                Home.clickOnContactUs() 
                })
            })

            it('should show an error when trying to send a message with incorrect email', function() {
                const validDataSets = this.testData.filter(test => test.scenario === 'Invalid email');
                validDataSets.forEach((validData) => {
                ContactUsPage.selectSubjectHeading(validData.subject);
                ContactUsPage.typeEmail(validData.email);
                ContactUsPage.typeOrderId(validData.orderId);
                ContactUsPage.typeMessage(validData.message);
                ContactUsPage.submitForm();
                ContactUsPage.assertErrorMessage(validData.expectedErrorMessage);
                ContactUsPage.assertErrorMessageReason(validData.expectedErrorMessageReason);
                Home.clickOnContactUs() 
                })
            })

            it('should show an error when trying to send a message without a subject and eventually send it when corrected', function() {
                const validDataSets = this.testData.filter(test => test.scenario === 'No subject');
                validDataSets.forEach((validData) => {
                ContactUsPage.typeEmail(validData.email);
                ContactUsPage.typeOrderId(validData.orderId);
                ContactUsPage.typeMessage(validData.message);
                ContactUsPage.submitForm();
                ContactUsPage.assertErrorMessage(validData.expectedErrorMessage);
                ContactUsPage.assertErrorMessageReason(validData.expectedErrorMessageReason);
                ContactUsPage.selectSubjectHeading(validData.subject);
                ContactUsPage.submitForm();
                ContactUsPage.assertSuccessMessage(validData.expectedSuccessMessage);
                Home.clickOnContactUs() 
                })
            })

            it('should show an error when trying to send a message without a content and eventually send it when corrected', function() {
                const validDataSets = this.testData.filter(test => test.scenario === 'No content');
                validDataSets.forEach((validData) => {
                ContactUsPage.selectSubjectHeading(validData.subject);
                ContactUsPage.typeEmail(validData.email);
                ContactUsPage.typeOrderId(validData.orderId);
                ContactUsPage.submitForm();
                ContactUsPage.assertErrorMessage(validData.expectedErrorMessage);
                ContactUsPage.assertErrorMessageReason(validData.expectedErrorMessageReason);
                ContactUsPage.typeMessage(validData.message);
                ContactUsPage.submitForm();
                ContactUsPage.assertSuccessMessage(validData.expectedSuccessMessage);
                Home.clickOnContactUs() 
                })
            })
        })
    })

    describe('Subject heading - description', () => {
        it('should show a correct description when selecting Customer Service subject', () => {
            ContactUsPage.selectSubjectHeading('Customer service');
            ContactUsPage.assertCustomerServiceDescription();
        })

        it('should show a correct description when selecting Webmaster subject', () => {
            ContactUsPage.selectSubjectHeading('Webmaster');
            ContactUsPage.assertWebmasterDescription();
        })
    })
})
