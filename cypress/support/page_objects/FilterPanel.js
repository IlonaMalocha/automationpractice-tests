class FilterPanel {

    get FilteredProducts() {
        return cy.get('.product_list .product-container');
    }

    selectColor(colorName) {
        cy.get('.layered_filter_ul .layered_color')
          .contains(colorName)
          .parents('li')
          .find('.color-option')
          .click();
    }
    
    verifyProductsHaveColor(expectedColorHex) {
        this.FilteredProducts.each($product => {
            cy.wrap($product)
              .find('.color_to_pick_list .color_pick')
              .then($colors => {
                  const colorsArray = $colors.toArray();
                  const hasExpectedColor = colorsArray.some($color => {
                      const style = $color.getAttribute('style');
                      return style.includes(expectedColorHex);
                  });
                  expect(hasExpectedColor).to.be.true;
              });
        });
    }

    selectCategory(categoryName) {
        cy.get('#ul_layered_category_0 label')
          .contains(categoryName)
          .parents('li')
          .find('input[type="checkbox"]')
          .check({ force: true });
    }

    
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

    selectSize(sizeName) {
        cy.contains('label', sizeName).click();
    }

    
    verifyProductsHaveSize(expectedSize) {
        this.FilteredProducts.each(($product, index) => {
            cy.get('.product-container').eq(index).find('.product-name').click();
            cy.wait(2000);
            cy.get(`#group_1 option[title="${expectedSize}"]`).should('exist');
            cy.go('back');
            cy.wait(2000);
        });
    }

    verifySizeFilterIsStillSelected(sizeName) {
        cy.contains('label', sizeName)
          .prev('div.checker')
          .find('input[type="checkbox"]')
          .should('be.checked');
    }
}

export default new FilterPanel();