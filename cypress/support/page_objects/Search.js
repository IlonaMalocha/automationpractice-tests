//narazie do portfolio nie wklejamy

import { searchPhrase } from "../../fixtures/searchData.json"

class Search {
    get searchBox() {
        return cy.get("#search_query_top")
    }
    typeSearchPhrase(searchPhrase) { 
        this.searchBox.type(searchPhrase);
    }
    clearSearchPhrase() {
        this.searchBox.clear();
    }
}

export default new Search();