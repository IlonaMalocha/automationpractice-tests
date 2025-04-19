class ProductDetails {
    
    get sizeDropdown() {
        return cy.get('#group_1');
    }

    get colors() {
        return cy.get('#color_to_pick_list li a');
    }

    get availabilityStatus() {
        return cy.get('#availability_value');
    }

    get addToCartButton() {
        return cy.get('#add_to_cart button');
    }

    get successMessage() {
        return cy.get('.layer_cart_product h2');
    }

    selectSize(size) {
        this.sizeDropdown.select(size);
    }

    selectColor(colorElement) {
        cy.wrap(colorElement).click();
    }

    checkAvailability() {
        return this.availabilityStatus.invoke('text').then((text) => text.trim());
    }

    verifyAddToCartButtonVisibility(shouldBeVisible = true) {
        if (shouldBeVisible) {
            this.addToCartButton.should('be.visible');
        } else {
            this.addToCartButton.should('not.be.visible');
        }
    }

    addToCart() {
        this.addToCartButton.click({ force: true });
    }

    verifySuccessMessage() {
        this.successMessage.should('contain', 'Product successfully added to your shopping cart');
    }

    checkSizeColorCombination(sizeText, colorElement) {
        this.sizeDropdown.select(sizeText);
        cy.wrap(colorElement).click();

        return this.checkAvailability().then((availability) => {
            this.verifyAddToCartButtonVisibility(availability === 'In stock');
            return availability === 'In stock';
        });
    }

    checkAllSizeColorCombinations() {
        cy.get('#group_1 option').then(($sizes) => {
            const sizes = Array.from($sizes);
    
            cy.get('#color_to_pick_list li a').then(($colors) => {
                const colors = Array.from($colors);
    
                const iterateCombinations = (sizeIndex, colorIndex) => {
                    if (sizeIndex >= sizes.length) return;
    
                    const sizeText = Cypress.$(sizes[sizeIndex]).text().trim();
    
                    cy.get('#group_1').select(sizeText).then(() => {
                        if (colorIndex >= colors.length) {
                            iterateCombinations(sizeIndex + 1, 0);
                            return;
                        }
    
                        cy.wrap(colors[colorIndex]).click();
                        cy.wait(1000);
    
                        this.checkAvailability().then((availabilityText) => {
                            this.verifyAddToCartButtonVisibility(availabilityText === 'In stock');
                            iterateCombinations(sizeIndex, colorIndex + 1);
                        });
                    });
                };
    
                iterateCombinations(0, 0);
            });
        });
    }

    findFirstAvailableCombination() {
        return this.sizeDropdown.find('option').then((sizes) => {
            return this.colors.then((colors) => {
                const tryNext = (s = 0, c = 0) => {
                    if (s >= sizes.length) return;

                    const sizeText = sizes[s].innerText.trim();
                    this.sizeDropdown.select(sizeText).then(() => {
                        if (c >= colors.length) return tryNext(s + 1, 0);

                        cy.wrap(colors[c]).click();
                        this.checkAvailability().then((availability) => {
                            if (availability === 'In stock') {
                                return;
                            } else {
                                tryNext(s, c + 1);
                            }
                        });
                    });
                };
                tryNext();
            });
        });
    }
}

export default new ProductDetails();