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

                        // Dodaj produkt do koszyka za pomocą metody z klasy ProductDetails
                        ProductDetails.addFirstAvailableProductToCart();
                    }
                });
            }
        });
    });
})

