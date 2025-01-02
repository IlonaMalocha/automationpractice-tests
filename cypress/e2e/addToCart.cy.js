///<reference types="cypress"/>

import Home from "../support/page_objects/Home"
import Women from "../support/page_objects/Women"
import ProductContainer from "../support/page_objects/ProductContainer"
import ProductDetails from "../support/page_objects/ProductDetails"

describe('Add to cart', () => {
    beforeEach('Go to Women Subpage', () => {
      cy.openHomePage()
      Home.clickOnWomenTab()
    })

    describe('Add available/unavailable product', () => {

        describe('Positive test cases', () => {

            it('Should add a random available product to the cart', () => {
                // Znajdź produkty z aktywnym przyciskiem "Add to cart"
                ProductContainer.findAvailableAddToCartButtons().then((productsWithActiveButton) => {
                    if (productsWithActiveButton.length > 0) {
                        const randomProduct = ProductContainer.selectRandomProduct(productsWithActiveButton);
                        ProductContainer.clickAddToCart(randomProduct);
            
                        // Sprawdzenie pojawienia się komunikatu sukcesu
                        cy.get('.layer_cart_product').should('be.visible')
                            .and('contain', 'Product successfully added to your shopping cart');
            
                    } else {
                        // Znajdź produkty bez komunikatu "Out of stock"
                        ProductContainer.findProductsWithoutOutOfStock().then((productsWithoutOutOfStock) => {
                            if (productsWithoutOutOfStock.length > 0) {
                                const randomProductWithoutOutOfStock = ProductContainer.selectRandomProduct(productsWithoutOutOfStock);
                                ProductContainer.clickProductName(randomProductWithoutOutOfStock);
            
                                // Znajdź dostępny produkt za pomocą nowej metody
                                ProductDetails.findAvailableProduct().then(() => {
                                    // Dodaj produkt do koszyka
                                    ProductDetails.addToCart();
            
                                    // Sprawdzenie pojawienia się komunikatu sukcesu
                                    cy.get('.layer_cart_product h2')
                                        .should('be.visible')
                                        .and('contain', 'Product successfully added to your shopping cart');
                                    cy.get('.cross').click();
                                });
                            }
                        });
                    }
                });
            });
        })

        describe('Negative test cases', () => {

            it.only('Should verify "Add to Cart" visibility based on stock availability for all size-color combinations', () => {
               
            
            });
        })

    })

    describe.skip('Add product with various quantities'), () => {

        describe('Positive test cases', () => {

            it('Should allow adding maximum available quantity to the cart', () => {
                // Test dla maksymalnej ilości
            });
            
            it('Should allow adding minimum available quantity to the cart (1)', () => {
                // Znajdź produkty z aktywnym przyciskiem "Add to cart"
                ProductContainer.findAvailableAddToCartButtons().then((productsWithActiveButton) => {
                    if (productsWithActiveButton.length > 0) {
                        const randomProduct = ProductContainer.selectRandomProduct(productsWithActiveButton);
                        ProductContainer.clickAddToCart(randomProduct);
            
                        // Sprawdzenie pojawienia się komunikatu sukcesu
                        cy.get('.layer_cart_product').should('be.visible')
                            .and('contain', 'Product successfully added to your shopping cart');
            
                    } else {
                        // Znajdź produkty bez komunikatu "Out of stock"
                        ProductContainer.findProductsWithoutOutOfStock().then((productsWithoutOutOfStock) => {
                            if (productsWithoutOutOfStock.length > 0) {
                                const randomProductWithoutOutOfStock = ProductContainer.selectRandomProduct(productsWithoutOutOfStock);
                                ProductContainer.clickProductName(randomProductWithoutOutOfStock);
            
                                // Znajdź dostępny produkt za pomocą nowej metody
                                ProductDetails.findAvailableProduct().then(() => {
                                    // Dodaj produkt do koszyka
                                    ProductDetails.addToCart();
            
                                    // Sprawdzenie pojawienia się komunikatu sukcesu
                                    cy.get('.layer_cart_product h2')
                                        .should('be.visible')
                                        .and('contain', 'Product successfully added to your shopping cart');
                                    cy.get('.cross').click();
                                });
                            }
                        });
                    }
                });
            }); // Test dla ilości 1

            it('Should allow adding minimum +1 available quantity to the cart (2)', () => {
                // Test dla ilości 2
            });

        })

        describe('Negative test cases', () => {

            it('Should not allow adding zero quantity to the cart', () => {
                // Test dla ilości 0
            });

            it('Should not allow adding quantity greater than maximum (max + 1)', () => {
                // Test dla ilości maksymalnej +1
            });

            it('Should not allow adding negative quantity to the cart', () => {
                // Test dla wartości ujemnej
            });
        })

    }
})

