///<reference types="cypress"/>

import Home from "../support/page_objects/Home"
import Filter from "../support/page_objects/Filter"

describe('Filtering', () => {
    beforeEach('Go to Women Subpage', () => {
        cy.openHomePage()
        Home.clickOnWomenTab()
    })

describe('Filtering by category', () => {
    const categoriesToTest = [
            { name: 'Tops', filterId: 4},
            { name: 'Dresses', filterId: 8}
        ];
    
        categoriesToTest.forEach(category => {
            it.only(`should display only products from the ${category.name} category`, () => {
                // Wybierz kategorię
                Filter.selectCategory(category.filterId);
                cy.wait(2000);

                // Sprawdź, czy produkty są widoczne
                Filter.getFilteredProducts().should('be.visible');

                // Weryfikacja, czy wszystkie wyświetlane produkty należą do wybranej kategorii
                Filter.verifyProductsInCategory(category.name);

                // Upewnij się, że filtr kategorii jest nadal zaznaczony
                Filter.verifyCategoryFilterIsStillSelected(category.name);
            });
        });
    });

    describe('Filtering by sizes', () => {
        // Ignorowanie błędów JavaScript pochodzących z aplikacji
        beforeEach(() => {
            cy.on('uncaught:exception', (err, runnable) => {
                // Ignoruj wyjątek `lockLocationChecking is not defined`
                if (err.message.includes('lockLocationChecking is not defined')) {
                    return false; // Zwrócenie false powoduje, że Cypress nie przerywa testu
                }
            });
        });
    
        const sizesToTest = [
            { name: 'S' },
            { name: 'M' },
            { name: 'L' }
        ];
    
        sizesToTest.forEach(size => {
            it(`should display only products that have the ${size.name} size option`, () => {
                const filterUrl = `http://www.automationpractice.pl/index.php?id_category=3&controller=category#/size-${size.name.toLowerCase()}`;
                cy.visit(filterUrl); // Przechodzenie na stronę z odpowiednim filtrem rozmiaru
    
                Filter.FilteredProducts.should('be.visible');
    
                Filter.verifyProductsHaveSize(size.name);
    
                Filter.verifySizeFilterIsStillSelected(size.name);
            });
        });
    });

    describe('Filtering by colors', () => {
        const colorsToTest = [
            { name: 'Beige', hex: '#f5f5dc' },
            { name: 'Blue', hex: '#5D9CEC' },
            { name: 'Orange', hex: '#F39C11' },
            { name: 'Black', hex: '#434A54' },
            { name: 'Yellow', hex: '#F1C40F' },
            { name: 'White', hex: '#ffffff' },
            { name: 'Green', hex: '#A0D468' },
            { name: 'Pink', hex: '#FCCACD' }
          ];
        
          colorsToTest.forEach(color => {
            it(`should display only products that have the ${color.name} color option`, () => {
              // Select the color
              Filter.selectColor(color.name);
              // Ensure the number of products is less than the original product count
              Filter.FilteredProducts.should('have.length.lessThan', 7);
              // Verify that all displayed products have the expected color
              Filter.verifyProductsHaveColor(color.hex);
            });
        });
    });
})

       
    // it('Checking categories', () => {
    //     Filter.checkTops(); 
    //     Filter.topsCheckbox.should("be.checked");
    //     Filter.enabledFilters.should('contain', 'Tops')
    //     Filter.checkDresses();
    //     Filter.dressesCheckbox.should('be.checked')
    //     Filter.enabledFilters.should('contain', 'Tops').and('contain', 'Dresses');
    //     Filter.uncheckTops();
    //     Filter.topsCheckbox.should('not.be.checked');
    //     Filter.enabledFilters.should('not.contain', 'Tops').and('contain', 'Dresses');
    //     Filter.uncheckDresses();
    //     Filter.dressesCheckbox.should('not.be.checked');//co z enabled filters na koniec
    // })

    // it('Checking sizes', () => {
    //     Filter.checkSizeS(); 
    //     Filter.sizeCheckboxS.should("be.checked");
    //     Filter.enabledFilters.should('contain', 'Size: S')
    //     Filter.checkSizeM();
    //     Filter.sizeCheckboxM.should("be.checked");
    //     Filter.enabledFilters.should('contain', 'Size: S').and('contain', 'Size: M');
    //     Filter.checkSizeL();
    //     Filter.sizeCheckboxL.should("be.checked");
    //     Filter.enabledFilters.should('contain', 'Size: S').and('contain', 'Size: M').and('contain', 'Size: L')
    //     Filter.uncheckSizeS();
    //     Filter.sizeCheckboxS.should('not.be.checked');
    //     Filter.enabledFilters.should('not.contain', 'Size: S').and('contain', 'Size: M').and('contain', 'Size: L');
    //     Filter.uncheckSizeM();
    //     Filter.sizeCheckboxM.should('not.be.checked');
    //     Filter.enabledFilters.should('not.contain', 'Size: S').and('not.contain', 'Size: M').and('contain', 'Size: L');
    //     Filter.uncheckSizeL();
    //     Filter.sizeCheckboxL.should('not.be.checked');//co z enabled filters na koniec
    // })

    
    











    // sprawdzenie podświetlenia nazwy podstrony.
    // sprawdzenie czy w 4 miejscach jest nazwa women 
    // sprawdzenie możliwości zaznaczania i odzwierciedlenie wyników