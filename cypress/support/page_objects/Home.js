class Home {
    get womenTab() {
        return cy.get('#block_top_menu .sf-menu > li > a[title="Women"]')
    }
    get dressesTab(){
        return cy.get('#block_top_menu .sf-menu > li > a[title="Dresses"]')
    }
    get tShirtsTab(){
        return cy.get('#block_top_menu .sf-menu > li > a[title="T-shirts"]')
    }
    get blogTab(){
        return cy.get('#block_top_menu .sf-menu > li > a[title="Blog"]')
    }
    get topsCategory(){
        return cy.get('[class="sfHover"]').contains('Tops')
    }
    get dressesCategory(){
        return cy.get('[class="sfHover"]').contains('Dresses')
    }
    get tShirtsCategory(){
        return cy.get('[class="sfHover"]').contains('T-shirts')
    }
    get blousesCategory(){
        return cy.get('[class="sfHover"]').contains('Blouses')
    }
    get casualCategory(){
        return cy.get('[class="sfHover"]').contains('Casual')
    }
    get eveningCategory(){
        return cy.get('[class="sfHover"]').contains('Evening')
    }
    get summerCategory(){
        return cy.get('[class="sfHover"]').contains('Summer')
    }
    get contactUs(){
        return cy.get('a[title="Contact us"]')
    }
    clickOnWomenTab(){
        this.womenTab.click();
    }
    clickOnDressesTab(){
        this.dressesTab.click()
    }
    clickOnTshirtsTab(){
        this.tShirtsTab.click()
    }
    clickOnBlogTab(){
        this.blogTab.click();
    }
    mouseoverWomenTab(){
        this.womenTab.trigger('mouseover').trigger('mousemove');
    }
    clickOnTopsCategory(){
        this.topsCategory.click()
    }
    clickOnDressesCategory(){
        this.dressesCategory.click()
    }
    clickOnTshirtsCategory(){
        this.tShirtsCategory.click()
    }
    clickOnBlousesCategory(){
        this.blousesCategory.click()
    }
    clickOnCasualCategory(){
        this.casualCategory.click()
    }
    clickOnEveningCategory(){
        this.eveningCategory.click()
    }
    clickOnSummerCategory(){
        this.summerCategory.click()
    }
    mouseoverDressesTab(){
        this.dressesTab.trigger('mouseover').trigger('mousemove');
    }
    clickOnContactUs(){
        this.contactUs.click();
    }
    clickOnSingIn(){
        return cy.get('[class="login"]').contains('Sign in').click()
    }
}

export default new Home();