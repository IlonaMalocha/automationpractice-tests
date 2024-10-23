///<reference types="cypress"/>
import Home from "../support/page_objects/Home"

//Creating an account
//-heading verification
//-no e-mail
//-incorrect e-mail
//-correct e-mail

//Loging
//-heading verification
//-

describe('Formularz kontaktowy - pełne wypełnienie', () => {
    it('Powinno wysłać formularz poprawnie po wypełnieniu wszystkich pól', () => {
        beforeEach('Go to Contact Us subpage', () => {
            cy.openHomePage()
            Home.clickOnContactUs()
      // Odwiedzenie strony z formularzem
      cy.visit('http://www.automationpractice.pl/index.php?controller=contact')
  
      // Wypełnienie wszystkich wymaganych pól
      cy.get('#id_contact').select('Customer service')  // wybór tematu
      cy.get('#email').type('jan.kowalski@example.com') // wpisanie emaila
      cy.get('#id_order').type('123456')                // wpisanie ID zamówienia
      cy.get('#message').type('Proszę o kontakt.')      // wpisanie wiadomości
  
      // Wysłanie formularza
      cy.get('#submitMessage').click()
  
      // Sprawdzenie, czy formularz został wysłany i pojawił się komunikat potwierdzenia
      cy.get('.alert-success').should('contain', 'Your message has been successfully sent to our team.')
    })
  })

  describe('Formularz kontaktowy - tylko obowiązkowe pola', () => {
    it('Powinno wysłać formularz poprawnie po wypełnieniu tylko wymaganych pól', () => {
      cy.visit('http://www.automationpractice.pl/index.php?controller=contact')
  
      cy.get('#id_contact').select('Customer service')  // wybór tematu
      cy.get('#email').type('jan.kowalski@example.com') // wpisanie emaila
      cy.get('#message').type('Proszę o kontakt.')      // wpisanie wiadomości
  
      cy.get('#submitMessage').click()
  
      cy.get('.alert-success').should('contain', 'Your message has been successfully sent to our team.')
    })
  })
})
  