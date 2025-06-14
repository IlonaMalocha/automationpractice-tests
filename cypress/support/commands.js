// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Global methods:
//Opening Home Page:
Cypress.Commands.add('openHomePage', () => {
    cy.visit('/')
})

//Logging:
Cypress.Commands.add("login", (login, password) => {
    cy.visit("/");
    cy.get("a.login").click();
    cy.get("#login_form").should("be.visible");
    cy.get("#email").type(login);
    cy.get("#passwd").type(password);
    cy.get("#SubmitLogin").click();
})

//To verify uploading files
import 'cypress-file-upload';


