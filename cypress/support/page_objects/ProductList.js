class ProductList {
   
    get Products() {
        return cy.get('.product-container');
    }

    findAvailableAddToCartButtons() {
        return this.Products.then(($products) => {
            const productsArray = Cypress.$($products).toArray();
            return productsArray.filter((product) => {
                const button = Cypress.$(product).find('.ajax_add_to_cart_button');
                return button.length && !button.hasClass('disabled');
            });
        });
    }
    
    findProductsWithoutOutOfStock() {
        return this.Products.then(($products) => {
            const productsArray = Cypress.$($products).toArray();
            return productsArray.filter((product) =>
                !Cypress.$(product).text().includes('Out of stock')
            );
        });
    }
    
    findInStockProduct() {
        return this.Products.then(($products) => {
            const productsArray = Cypress.$($products).toArray();
            const inStock = productsArray.find((product) =>
                Cypress.$(product).text().includes('In stock')
            );
            return inStock || null;
        });
    }
    
    clickAddToCart(product) {
        cy.wrap(product).find('.ajax_add_to_cart_button').click();
    }

    clickProductName(product) {
        cy.wrap(product).find('.product-name').click();
    }

    selectRandomProduct(products) {
        const randomIndex = Math.floor(Math.random() * products.length);
        return products[randomIndex];
    }
}

export default new ProductList();