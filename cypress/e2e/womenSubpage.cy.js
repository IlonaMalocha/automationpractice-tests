// SORTOWANIE Z TEGO PLIKU ZOSTAŁO PRZENIESIONE DO OSOBNEGO PLIKU Z TESTEM -SORTING-. PODSTRONĘ MOŻNA PRZETESTOWAĆ DODATKOWO PO OPUBLIKOWANIU REPOZYTORIUM. Można zrobić coś jak poniżej:
// cypress/
//   └── e2e/
//       ├── navigation/
//       │   └── mainNavigation.cy.js     # testy nawigacji z homepage
//       │
//       ├── categoryPages/
//       │   ├── womenPage.cy.js          # testy strony "Women" + sortowanie
//       │   ├── tShirtsPage.cy.js        # testy strony "T-Shirts" + sortowanie
//       │   └── dressesPage.cy.js        # testy strony "Dresses" + sortowanie
//       │
//       └── common/
//           └── sortOptions.cy.js        # test sortowania jako wspólny komponent (jeśli masz reużywalny test sortowania)


// ///<reference types="cypress"/>

import Home from "../support/page_objects/Home"
import Women from "../support/page_objects/Women"

describe('Sorting', () => {
    beforeEach('Go to Women Subpage', () => {
      cy.openHomePage()
      Home.womenTab.click()
    })

    it('Sorting by Price Asc', () => {
        Women.selectSortByPriceAsc()
        Women.sortBy.should("have.value","price:asc");
    })

    it('Sorting by Price Desc', () => {
        Women.selectSortByPriceDesc()
        Women.sortBy.should("have.value","price:desc");
    })

    it('Sorting by Product Name Asc', () => {
        Women.selectSortByProductNameAsc()
        Women.sortBy.should("have.value", "name:asc")
    })

    it('Sorting by Product Name Desc', () => {
        Women.selectSortByProductNameDesc()
        Women.sortBy.should("have.value", "name:desc")
    })

    it('Sorting by In stock', () => {
        Women.selectSortByInStock()
        Women.sortBy.should("have.value", "quantity:desc")
    })

    it('Sorting by Reference Asc', () => {
        Women.selectSortByReferenceAsc()
        Women.sortBy.should("have.value", "reference:asc")
    })

    it('Sorting by Reference Desc', () => {
        Women.selectSortByReferenceDesc()
        Women.sortBy.should("have.value", "reference:desc")
    })
})

describe('Dropdown menu', () => {
    beforeEach('Go to Women Subpage', () => {
      cy.openHomePage()
      Home.clickOnWomenTab()
    })

    it('Expanding/colapsing first category (Tops)', () => {
        Women.clickOnDropdownMenuTops()
        Women.dropdownMenuTops.should('have.class', 'OPEN')
        Women.clickOnDropdownMenuTops()
        Women.dropdownMenuTops.should('have.class', 'CLOSE')
    })

    it('Expanding/colapsing first category (Tops)', () => {
        Women.clickOnDropdownMenuTops()
        Women.dropdownMenuTops.should('have.class', 'OPEN')
        Women.clickOnDropdownMenuTops()
        Women.dropdownMenuTops.should('have.class', 'CLOSE')
    })

    it('Navigating to first subcategory (T-Shirts)', () => {
        Women.clickOnDropdownMenuTops()
        Women.clickOnDropdownSubMenuTShirts()
        cy.url().should('include', 'id_category=5&controller=category')
    })

    it('Navigating to second subcategory (Blouses)', () => {
        Women.clickOnDropdownMenuTops()
        Women.clickOnDropdownSubMenuBlouses()
        cy.url().should('include', 'id_category=7&controller=category')
    })

    it('Expanding/colapsing second category (Dresses)', () => {
        Women.clickOnDropdownMenuDresses()
        Women.dropdownMenuDresses.should('have.class', 'OPEN')
        Women.clickOnDropdownMenuDresses()
        Women.dropdownMenuDresses.should('have.class', 'CLOSE')
    })

    it('Navigating to first subcategory (Casual Dresses)', () => {
        Women.clickOnDropdownMenuDresses()
        Women.clickOnDropdownSubMenuCasual()
        cy.url().should('include', 'id_category=9&controller=category')
    })

    it('Navigating to second subcategory (Evening Dresses)', () => {
        Women.clickOnDropdownMenuDresses()
        Women.clickOnDropdownSubMenuEvening()
        cy.url().should('include', 'id_category=10&controller=category')
    })

    it('Navigating to third subcategory (Summer Dresses)', () => {
        Women.clickOnDropdownMenuDresses()
        Women.clickOnDropdownSubMenuSummer()
        cy.url().should('include', 'id_category=11&controller=category')
    })
})










    // sprawdzenie podświetlenia nazwy podstrony.
    // sprawdzenie czy w 4 miejscach jest nazwa women 
    // sprawdzenie możliwości zaznaczania i odzwierciedlenie wyników
    //zaznaczanie wielu boxów jako elementów wchodzących w skład jednego lokalizatora