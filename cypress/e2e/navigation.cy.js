///<reference types="cypress"/>

import Home from "../support/page_objects/Home.js"

describe('Navigation tests', () => {
  beforeEach('Open Website', () => {
    cy.openHomePage();
  });

  describe('Header navigation', () => {
    it('Should navigate to Contact Us page', () => {
      Home.contactUs.click();
      cy.url().should('include', 'controller=contact');
    });

    it('Should navigate to Sign In page', () => {
      Home.signIn.click();
      cy.url().should('include', 'controller=authentication');
    });
  });

  describe('Top menu navigation', () => {
    it('Should redirect to Women category after clicking the menu item', () => {
      Home.womenTab.click();
      cy.url().should('include', 'id_category=3')
    })
      
    it('Should redirect to Dresses category after clicking the menu item', () => {
      Home.dressesTab.click();
      cy.url().should('include', 'id_category=8')
      })

    it('Should redirect to T-shirts category after clicking the menu item', () => {
      Home.tShirtsTab.click();
      cy.url().should('include', 'id_category=5')
    })

    it('Should have correct Blog link in the menu', () => {
      Home.blogTab
        .should('have.attr', 'href')
        .and('include', 'prestashop.com/blog');
    });
  })

  describe('Women dropdown menu navigation', () => {
    it('Should redirect to Tops category after clicking the dropdown menu item', () => {
      Home.mouseoverWomenTab();
      Home.getCategory('Tops').click()
      cy.url().should('include', 'id_category=4')
    })

    it('Should redirect to Dresses category after clicking the dropdown menu item', () => {
      Home.mouseoverWomenTab();
      Home.getCategory('Dresses').click()
      cy.url().should('include', 'id_category=8')
    })

    it('Should redirect to T-shirts category after clicking the dropdown menu item', () => {
      Home.mouseoverWomenTab();
      Home.getCategory('T-shirts').click()
      cy.url().should('include', 'id_category=5')
    })

    it('Should redirect to Blouses category after clicking the dropdown menu item', () => {
      Home.mouseoverWomenTab();
      Home.getCategory('Blouses').click()
      cy.url().should('include', 'id_category=7')
    })

    it('Should redirect to Casual Dresses category after clicking the dropdown menu item', () => {
      Home.mouseoverWomenTab();
      Home.getCategory('Casual').click()
      cy.url().should('include', 'id_category=9')
    })

    it('Should redirect to Evening Dresses category after clicking the dropdown menu item', () => {
      Home.mouseoverWomenTab();
      Home.getCategory('Evening').click()
      cy.url().should('include', 'id_category=10')
    })

    it('Should redirect to Summer Dresses category after clicking the dropdown menu item', () => {
      Home.mouseoverWomenTab();
      Home.getCategory('Summer').click()
      cy.url().should('include', 'id_category=11')
    })
  })

  describe('Dresses dropdown menu navigation', () => {
    it('Should redirect to Casual Dresses category after clicking the dropdown menu item', () => {
      Home.mouseoverDressesTab();
      Home.getCategory('Casual').click()
      cy.url().should('include', 'id_category=9')
    })

    it('Should redirect to Evening Dresses category after clicking the dropdown menu item', () => {
      Home.mouseoverDressesTab();
      Home.getCategory('Evening').click()
      cy.url().should('include', 'id_category=10')
    })

    it('Should redirect to Summer Dresses category after clicking the dropdown menu item', () => {
      Home.mouseoverDressesTab();
      Home.getCategory('Summer').click()
      cy.url().should('include', 'id_category=11')
    })
  })

  describe('Footer navigation', () => {
    //bug below
    it('[BUG] Should navigate to About Us page', () => {
      Home.aboutUs.click();
      cy.url().should('include', 'about-us');
    });

    //bug below
    it('[BUG] Should navigate to Terms and Conditions page', () => {
      Home.termsAndConditions.click();
      cy.url().should('include', 'terms-and-conditions');
    });

    it('Should navigate to Our Stores page', () => {
      Home.ourStores.click();
      cy.url().should('include', 'stores');
    })
    it('Should navigate to Authentication page', () => {
      Home.myAccount.click();
      cy.url().should('include', 'authentication');
    })
  })
})