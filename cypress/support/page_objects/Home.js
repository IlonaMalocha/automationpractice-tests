class Home { //tutaj wersja z getterami, można też zrobić wersję z metodami (ta druga Zazwyczaj stosowana, gdy metoda wykonuje więcej niż tylko cy.get() — czyli jakieś działanie lub sekwencję kroków (jak kliknięcia, warunki, helpery).)
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
    getCategory(name) { //metoda do klikania na kategorie, konkretną kategorię wpisujemy w teście - DRY (Don't Repeat Yourself)
        return cy.get('.sfHover').contains(name)
    }
    mouseoverWomenTab(){ //zostawiłam tylko takie metody a zrezygnowałam z ClickOn..., za dużo tego było
        this.womenTab.trigger('mouseover').trigger('mousemove');
    }
    mouseoverDressesTab(){
        this.dressesTab.trigger('mouseover').trigger('mousemove');
    } //Cypress z założenia nie symuluje faktycznego ruchu myszką (jak robią to np. Selenium/WebDriver). Kiedy używasz metody .click() lub .invoke('show'), to menu może się nie pokazać, bo nie został wywołany odpowiedni event.
    //To wymusza dokładnie te eventy, których potrzebuje frontend, żeby pokazać rozwijane menu — najczęściej:
    //mouseover inicjuje logikę "pokaż submenu"
    //mousemove potwierdza, że "użytkownik faktycznie tam jest kursorem"
}

export default new Home(); //Eksportowanie jako singleton (export default new Home()), więc użycie w testach będzie proste i czyste.