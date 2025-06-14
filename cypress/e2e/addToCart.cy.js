///<reference types="cypress"/>

import Home from "../support/page_objects/Home"
import ProductList from "../support/page_objects/ProductList"
import ProductDetails from "../support/page_objects/ProductDetails"

describe('Add to cart', () => {
    beforeEach('Go to Women Subpage', () => {
      cy.openHomePage()
      Home.womenTab.click()
    })

    describe('Add available/unavailable product', () => {

        describe('Positive test cases', () => {
    
            it('Should add an in-stock product or find an available combination and add to cart', () => {
                ProductList.findInStockProduct().then((product) => {
                    if (product) {
                        ProductList.clickProductName(product);
                        ProductDetails.checkAvailability().then((status) => {
                            if (status === 'In stock') {
                                ProductDetails.addToCart();
                                ProductDetails.verifySuccessMessage();
                            }
                        });
                    } else {
                        ProductList.findProductsWithoutOutOfStock().then((available) => {
                            if (!available.length) {
                                throw new Error('No products available for testing');
                            }
                            const randomProduct = ProductList.selectRandomProduct(available);
                            ProductList.clickProductName(randomProduct);
                            ProductDetails.findFirstAvailableCombination().then(() => {
                                ProductDetails.addToCart();
                                ProductDetails.verifySuccessMessage();
                            });
                        });
                    }
                });
            });
        });

        describe('Negative test cases', () => {
            it('Should verify Add to Cart buttons are disabled if no products are in stock', () => {
             
                ProductList.Products.then(($products) => {
                    const productsArray = Cypress.$($products).toArray();
                    const noInStockProducts = productsArray.every((product) => {
                        return !Cypress.$(product).text().includes('In stock');
                    });
                    if (noInStockProducts) {
                        productsArray.forEach((product) => {
                            const addToCartButton = Cypress.$(product).find('.ajax_add_to_cart_button');
                            expect(addToCartButton).to.have.length(1);
                            expect(addToCartButton).to.have.class('disabled');
                        });
                    } else {
                        cy.log('There are products in stock, so negative test is skipped.');
                    }
                });
            });

            it('Should check that Add to Cart button is not visible for out of stock size-color combinations', () => {
                ProductList.Products.then((products) => {
                    const randomProduct = ProductList.selectRandomProduct(products);
                    ProductList.clickProductName(randomProduct);
                    ProductDetails.checkAllSizeColorCombinations();
                });
            });
        })
    });
})