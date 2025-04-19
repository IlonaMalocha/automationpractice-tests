//POM do womenSubPage czego póki co nie publikuję w portfolio

class Women {
    get sortBy() {
        return cy.get('#selectProductSort')
    }
    get dropdownMenuTops(){
        return cy.get('#categories_block_left').find('span').eq(0)
    }
    get dropdownSubmenuTShirts(){
        return cy.get('#categories_block_left').contains('T-shirts')
    }
    get dropdownSubmenuBlouses(){
        return cy.get('#categories_block_left').contains('Blouses')
    }
    get dropdownMenuDresses(){
        return cy.get('#categories_block_left').find('span').eq(1)
    }
    get dropdownSubmenuCasual(){
        return cy.get('#categories_block_left').contains('Casual')
    }
    get dropdownSubmenuEvening(){
        return cy.get('#categories_block_left').contains('Evening')
    }
    get dropdownSubmenuSummer(){
        return cy.get('#categories_block_left').contains('Summer')
    }
    selectSortByInStock() {
        this.sortBy.select("quantity:desc")
    }
    selectSortByProductNameAsc() {
        this.sortBy.select("name:asc")
    }
    selectSortByProductNameDesc(){
        this.sortBy.select('name:desc')
    }
    selectSortByPriceAsc(){
        this.sortBy.select("price:asc")
    }
    selectSortByPriceDesc(){
        this.sortBy.select('price:desc')
    }
    selectSortByReferenceAsc(){
        this.sortBy.select('reference:asc')
    }
    selectSortByReferenceDesc(){
        this.sortBy.select('reference:desc')
    }
    clickOnDropdownMenuTops(){
        this.dropdownMenuTops.click()
    }
    clickOnDropdownMenuDresses(){
        this.dropdownMenuDresses.click()
    }
    clickOnDropdownSubMenuTShirts(){
        this.dropdownSubmenuTShirts.click()
    }
    clickOnDropdownSubMenuBlouses(){
        this.dropdownSubmenuBlouses.click()
    }
    clickOnDropdownSubMenuCasual(){
        this.dropdownSubmenuCasual.click()
    }
    clickOnDropdownSubMenuEvening(){
        this.dropdownSubmenuEvening.click()
    }
    clickOnDropdownSubMenuSummer(){
        this.dropdownSubmenuSummer.click()
    }
}

export default new Women();