class ProductDetails {
    // Selektory elementów na stronie
    getSizeDropdown() {
        return cy.get('#group_1');
    }

    getColors() {
        return cy.get('#color_to_pick_list li a');
    }

    getAvailabilityStatus() {
        return cy.get('#availability_value');
    }

    getAddToCartButton() {
        return cy.get('#add_to_cart button');
    }

    getSuccessMessage() {
        return cy.get('.layer_cart_product h2');
    }

    // Metody do interakcji na stronie
    selectSize(size) {
        this.getSizeDropdown().select(size);
    }

    selectColor(colorElement) {
        cy.wrap(colorElement).click();
    }

    checkAvailability() {
        return this.getAvailabilityStatus().invoke('text').then((text) => text.trim());
    }

    addToCart() {
        this.getAddToCartButton().click({ force: true });
    }

    verifySuccessMessage() {
        this.getSuccessMessage().should('contain', 'Product successfully added to your shopping cart');
    }

    addFirstAvailableProductToCart() {
        let foundAvailableProduct = false; // Flaga kontrolna
    
        // Pobieramy wszystkie dostępne rozmiary i kolory
        cy.get('#group_1 option').then((sizes) => {
            cy.get('#color_to_pick_list li a').then((colors) => {
                
                const checkNextCombination = (sizeIndex, colorIndex) => {
                    if (foundAvailableProduct) return; // Zatrzymaj, jeśli produkt został znaleziony
                    if (sizeIndex >= sizes.length) return; // Koniec dostępnych rozmiarów
    
                    const sizeText = Cypress.$(sizes[sizeIndex]).text().trim(); // Pobieramy tekst rozmiaru
    
                    if (['S', 'M', 'L'].includes(sizeText)) {
                        // Wybieramy rozmiar
                        cy.get('#group_1').select(sizeText).then(() => {
                            if (colorIndex >= colors.length) {
                                // Jeśli skończyły się kolory, przejdź do następnego rozmiaru
                                checkNextCombination(sizeIndex + 1, 0);
                                return;
                            }
    
                            cy.wrap(colors[colorIndex]).click();
                            cy.wait(1000); // Czas oczekiwania po kliknięciu
    
                            // Sprawdzenie dostępności
                            this.checkAvailability().then((availabilityText) => {
                                if (availabilityText === 'In stock') {
                                    foundAvailableProduct = true; // Zatrzymanie dalszej iteracji
                                    this.addToCart(); // Dodanie produktu do koszyka
    
                                    // Weryfikacja komunikatu i zamknięcie overlayu
                                    cy.get('.layer_cart_overlay').should('be.visible');
                                    cy.get('.layer_cart_product h2').should('contain', 'Product successfully added to your shopping cart');
                                    cy.get('.cross').click();
                                } else {
                                    // Rekurencyjnie sprawdź kolejny kolor
                                    checkNextCombination(sizeIndex, colorIndex + 1);
                                }
                            });
                        });
                    } else {
                        // Rekurencyjnie sprawdź kolejny rozmiar
                        checkNextCombination(sizeIndex + 1, colorIndex);
                    }
                };
    
                // Start od pierwszego rozmiaru i koloru
                checkNextCombination(0, 0);
            });
        });
    }
    
}

export default new ProductDetails();

