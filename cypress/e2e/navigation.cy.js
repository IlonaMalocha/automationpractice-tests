///<reference types="cypress"/>

import {login, passwd} from "../fixtures/loginData.json"
import Home from "../support/page_objects/Home.js"

describe('Verify navigation across Top Menu', () => {
  beforeEach('Open Website', () => {
    cy.openHomePage()
  })

  it("CLick on Women Tab", () => {
    Home.clickOnWomenTab();
    cy.url().should('include', 'id_category=3&controller=category')
  })
    
  it('Click on Dresses Tab', () => {
    Home.clickOnDressesTab();
    cy.url().should('include', 'id_category=8&controller=category')
    })

  it('Click on T-shirts Tab', () => {
    Home.clickOnTshirtsTab();
    cy.url().should('include', 'id_category=5&controller=category')
  })

  it('Click on Blog Tab', () => {
    Home.clickOnBlogTab();
    //cy.url().should('include', 'prestashop.com/blog') - przekierowanie na inną stronę - jak to powinno się testować
  })
})

describe('Verify navigation across Women Tab', () => {
  beforeEach('Open Website', () => {
    cy.openHomePage()
  })

  it('Click on Tops Category', () => {
    Home.mouseoverWomenTab();
    Home.clickOnTopsCategory();
    cy.url().should('include', 'id_category=4&controller=category')
  })

  it('CLick on Dresses Category', () => {
    Home.mouseoverWomenTab();
    Home.clickOnDressesCategory();
    cy.url().should('include', 'id_category=8&controller=category')
  })

  it('Click on T-shirts Category', () => {
    Home.mouseoverWomenTab();
    Home.clickOnTshirtsCategory();
    cy.url().should('include', 'id_category=5&controller=category')
  })

  it('CLick on Blouses Category', () => {
    Home.mouseoverWomenTab();
    Home.clickOnBlousesCategory();
    cy.url().should('include', 'id_category=7&controller=category')
  })

  it('Click on Casual Dresses Category', () => {
    Home.mouseoverWomenTab();
    Home.clickOnCasualCategory();
    cy.url().should('include', 'id_category=9&controller=category')
  })

  it('Click on Evening Dresses Category', () => {
    Home.mouseoverWomenTab();
    Home.clickOnEveningCategory();
    cy.url().should('include', 'id_category=10&controller=category')
  })

  it('Click on Summer Dresses Category', () => {
    Home.mouseoverWomenTab();
    Home.clickOnSummerCategory();
    cy.url().should('include', 'id_category=11&controller=category')
  })
})

describe('Verify navigation across Dresses Tab', () => {
  beforeEach('Open Website', () => {
    cy.openHomePage()
  })

  it('Click on Casual Dresses Category', () => {
    Home.mouseoverDressesTab();
    Home.clickOnCasualCategory();
    cy.url().should('include', 'id_category=9&controller=category')
  })

  it('Click on Evening Dresses Category', () => {
    Home.mouseoverDressesTab();
    Home.clickOnEveningCategory();
    cy.url().should('include', 'id_category=10&controller=category')
  })

  it('Click on Summer Dresses Category', () => {
    Home.mouseoverDressesTab();
    Home.clickOnSummerCategory();
    cy.url().should('include', 'id_category=11&controller=category')
  })
})