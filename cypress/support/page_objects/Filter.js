class Filter {
    // get topsCheckbox() {
    //     return cy.get('#layered_category_4')
    // }
    // get dressesCheckbox() {
    //     return cy.get('#layered_category_8')
    // }
    // get sizeCheckboxS() {
    //     return cy.get('#layered_id_attribute_group_1')
    // }
    // get sizeCheckboxM() {
    //     return cy.get('#layered_id_attribute_group_2')
    // }
    // get sizeCheckboxL() {
    //     return cy.get('#layered_id_attribute_group_3')
    // }
    // get colorBoxWhite(){
    //     return cy.get('#layered_id_attribute_group_8')
    // }
    // get colorBoxBeige(){
    //     return cy.get('#layered_id_attribute_group_7')
    // }
    // get colorBoxBlack(){
    //     return cy.get('#layered_id_attribute_group_11')
    // }
    // get colorBoxOrange(){
    //     return cy.get('#layered_id_attribute_group_13')
    // }
    // get colorBoxBlue(){
    //     return cy.get('#layered_id_attribute_group_14')
    // }
    // get colorBoxGreen(){
    //     return cy.get('#layered_id_attribute_group_15')
    // }
    // get colorBoxYellow(){
    //     return cy.get('#layered_id_attribute_group_16')
    // }
    // get colorBoxPink(){
    //     return cy.get('#layered_id_attribute_group_24')
    // }
    // get enabledFilters(){
    //     return cy.get('#enabled_filters')
    // }
    // checkTops() {
    //     this.topsCheckbox.check();
    // }
    // uncheckTops() {
    //     this.topsCheckbox.uncheck();
    // }
    // checkDresses() {
    //     this.dressesCheckbox.check();
    // }
    // uncheckDresses() {
    //     this.dressesCheckbox.uncheck();
    // }
    // checkSizeS() {
    //     this.sizeCheckboxS.check();
    // }
    // checkSizeM() {
    //     this.sizeCheckboxM.check();
    // }
    // checkSizeL() {
    //     this.sizeCheckboxL.check();
    // }
    // uncheckSizeS() {
    //     this.sizeCheckboxS.uncheck();
    // }
    // uncheckSizeM() {
    //     this.sizeCheckboxM.uncheck();
    // }
    // uncheckSizeL() {
    //     this.sizeCheckboxL.uncheck();
    // }
    
//filtrowanie po kolorach
    selectColor(colorName) {
        // Znajduje odpowiednie <label> dla koloru i klika odpowiadający <input>
        cy.get('.layered_filter_ul .layered_color')
          .contains(colorName)
          .parents('li')
          .find('.color-option')
          .click();
    }
    
    get FilteredProducts() {
        return cy.get('.product_list .product-container');
    }
    
    verifyProductsHaveColor(expectedColorHex) {
        this.FilteredProducts.each($product => {
            // Szukamy opcji kolorów dla każdego produktu
            cy.wrap($product).find('.color_to_pick_list .color_pick').then($colors => {
            // Konwertujemy obiekt jQuery na tablicę
            const colorsArray = $colors.toArray();
            // Sprawdzamy, czy każdy produkt ma opcję koloru
            const hasExpectedColor = colorsArray.some($color => {
            const style = $color.getAttribute('style');
            return style.includes(expectedColorHex); // Kolor w formacie hex
            });
            // Weryfikacja, czy produkt ma oczekiwany kolor
            expect(hasExpectedColor).to.be.true; // Każdy produkt musi mieć oczekiwany kolor
            });
        });
    }

//filtrowanie po kategoriach
    selectCategory(categoryName) {
        cy.contains('label', categoryName).click(); // Kliknięcie na etykietę odpowiadającą kategorii
    }

    // Pobieranie przefiltrowanych produktów
    get FilteredProducts() {
        return cy.get('.product_list .product-container'); // Zwraca produkty po filtrowaniu
    }

    // Sprawdzenie, czy w szczegółach produktu znajduje się kategoria
    verifyProductsInCategory(categoryName) {
        this.FilteredProducts.each(($product) => {
            cy.get($product).find('.product-name').click(); // Przejdź do szczegółów produktu

            // Sprawdzenie, czy produkt ma oczekiwaną kategorię (można to rozwinąć, zależnie od struktury HTML)
            cy.get('.breadcrumb').contains(categoryName).should('exist'); // Sprawdza, czy kategoria jest w "breadcrumb" (ścieżka strony)
            
            cy.go('back'); // Powrót do listy produktów
            cy.wait(1000); // Czas na załadowanie strony
        });
    }

    // Sprawdzenie, czy filtr kategorii jest nadal zaznaczony
    verifyCategoryFilterIsStillSelected(categoryName) {
        cy.contains('label', categoryName)
          .prev('div.checker')
          .find('input[type="checkbox"]')
          .should('be.checked'); // Sprawdzenie, czy checkbox filtru kategorii jest nadal zaznaczony
    }

//Filtrowanie po rozmiarach:
    selectSize(sizeName) {
        cy.contains('label', sizeName).click(); // Kliknięcie na etykietę odpowiadającą rozmiarowi
    }   

    // Pobieranie przefiltrowanych produktów
    get FilteredProducts() {
        return cy.get('.product_list .product-container'); // Zwraca produkty po filtrowaniu
    }

    // Sprawdzenie, czy w szczegółach produktu dostępny jest wybrany rozmiar
    verifyProductsHaveSize(expectedSize) {
        this.FilteredProducts.each(($product, index) => {
            cy.get('.product-container').eq(index).find('.product-name').click(); // Kliknij produkt na podstawie indeksu
            cy.wait(2000);
            // Sprawdzenie, czy wybrany rozmiar znajduje się w szczegółach produktu
            cy.get('#group_1 option[title="' + expectedSize + '"]').should('exist'); // Sprawdza, czy jest opcja z tytułem równym expectedSize
            cy.go('back'); // Powrót do listy produktów
            cy.wait(2000); // Opcjonalnie: dodaj czekanie na załadowanie strony
        });
    }

    // Sprawdzenie, czy filtr rozmiaru nadal jest zaznaczony
    verifySizeFilterIsStillSelected(sizeName) {
        cy.contains('label', sizeName)
        .prev('div.checker')
        .find('input[type="checkbox"]')
        .should('be.checked'); // Sprawdzenie, czy checkbox filtru rozmiaru jest nadal zaznaczony
    }
}

export default new Filter();