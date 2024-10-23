///<reference types="cypress"/>

import Search from "../support/page_objects/Search.js";
import { searchPhrase, notFoundProduct } from "../fixtures/searchData.json";
import ResultPage from "../support/page_objects/ResultPage.js";

describe('Searchbar verification', () => {
    it('Typing - checking the value', () => {
        cy.openHomePage()
        Search.typeSearchPhrase(searchPhrase);
        Search.searchBox.should("have.value", searchPhrase);
        cy.wait(3000)
    })

    it('Clearing the value', () => {
        Search.clearSearchPhrase();
        cy.wait(3000)
    })

    it('Typing ENTER - checking the result', () => {
        Search.typeSearchPhrase(`${searchPhrase}{enter}`)
        ResultPage.searchAlert.should("be.visible").and("include.text", notFoundProduct);
    })

    it('Verify the class', () => {
        Search.searchBox.should("have.class", "search_query");
    })

    it('Verify CSS properties', () => {
        Search.searchBox.should("have.css", "margin-right", "1px");
    })
})