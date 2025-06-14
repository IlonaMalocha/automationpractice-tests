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
    get contactUs(){
        return cy.get('a[title="Contact us"]')
    }
    get signIn(){
        return cy.get('a.login')
    }
    get aboutUs(){
        return cy.get('a[title="About us"]')
    }
    get termsAndConditions(){
        return cy.get('a[title="Terms and conditions of use"]')
    }
    get ourStores(){
        return cy.get('a[title="Our stores"]')
    }
    get myAccount(){
        return cy.get('a[title="Manage my customer account"]');
    }
    getCategory(name) {
        return cy.get('.sfHover').contains(name)
    }
    mouseoverWomenTab(){
        this.womenTab.trigger('mouseover').trigger('mousemove');
    }
    mouseoverDressesTab(){
        this.dressesTab.trigger('mouseover').trigger('mousemove');
    }
}

export default new Home();