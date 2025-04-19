class FilterPanel {

    // Zwraca wszystkie produkty widoczne na liście po przefiltrowaniu
    get FilteredProducts() {
        return cy.get('.product_list .product-container');
    }

    // =============================
    // FILTROWANIE PO KOLORACH
    // =============================

    // Kliknięcie na filtr koloru o nazwie `colorName` (np. "Blue", "Black")
    selectColor(colorName) {
        // Szuka <label> zawierającego nazwę koloru, potem idzie do rodzica <li>, 
        // i klika na .color-option (to kolorowy kwadrat będący buttonem)
        cy.get('.layered_filter_ul .layered_color')
          .contains(colorName)
          .parents('li')
          .find('.color-option')
          .click();
    }
    
    // Sprawdza, czy KAŻDY produkt na liście zawiera ikonę koloru o podanym kodzie HEX (np. "#000000")
    verifyProductsHaveColor(expectedColorHex) {
        this.FilteredProducts.each($product => {
            cy.wrap($product)
              .find('.color_to_pick_list .color_pick')
              .then($colors => {
                  const colorsArray = $colors.toArray(); // Zamiana NodeList na tablicę JS
                  const hasExpectedColor = colorsArray.some($color => {
                      const style = $color.getAttribute('style');
                      return style.includes(expectedColorHex); // np. "background: #000000"
                  });
                  expect(hasExpectedColor).to.be.true; // Wymagane: produkt zawiera oczekiwany kolor
              });
        });
    }

    // =============================
    // FILTROWANIE PO KATEGORIACH
    // =============================

    // Zaznacza checkbox odpowiadający danej kategorii (np. "Tops", "Dresses")
    selectCategory(categoryName) {
        cy.get('#ul_layered_category_0 label')
          .contains(categoryName)
          .parents('li')
          .find('input[type="checkbox"]')
          .check({ force: true }); // Użycie force, bo checkboxy są stylowane i mogą być niewidoczne
    }

    // Sprawdza, czy każdy tytuł produktu zawiera chociaż jedno słowo z listy (np. ["T-shirt", "Blouse"])
    verifyProductsContainAnyKeyword(expectedKeywords) {
        this.FilteredProducts.each(($product) => {
            cy.wrap($product)
              .find('.product-name')
              .invoke('text')
              .then((text) => {
                  const found = expectedKeywords.some((keyword) =>
                      text.toLowerCase().includes(keyword.toLowerCase())
                  );
                  expect(found, `Produkt "${text.trim()}" pasuje do przynajmniej jednego słowa`).to.be.true;
              });
        });
    }

    // =============================
    // FILTROWANIE PO ROZMIARACH
    // =============================

    // Kliknięcie na rozmiar w panelu filtrów (np. "S", "M", "L")
    selectSize(sizeName) {
        cy.contains('label', sizeName).click();
    }

    // Dla każdego produktu: wejdź na stronę szczegółów i sprawdź, czy jest tam dostępny rozmiar `expectedSize`
    verifyProductsHaveSize(expectedSize) {
        this.FilteredProducts.each(($product, index) => {
            // Kliknij konkretny produkt (lepsze byłoby cy.wrap($product).find(...) — to bezpieczniejsze)
            cy.get('.product-container').eq(index).find('.product-name').click();
            cy.wait(2000); // Czekaj na załadowanie strony szczegółów

            // Sprawdź, czy dropdown z rozmiarem zawiera expectedSize jako opcję
            cy.get(`#group_1 option[title="${expectedSize}"]`).should('exist');

            cy.go('back'); // Wróć na listę produktów
            cy.wait(2000); // Czekaj na załadowanie
        });
    }

    // Sprawdzenie, czy checkbox filtru rozmiaru jest nadal zaznaczony
    verifySizeFilterIsStillSelected(sizeName) {
        cy.contains('label', sizeName)
          .prev('div.checker')
          .find('input[type="checkbox"]')
          .should('be.checked');
    }
}

export default new FilterPanel();