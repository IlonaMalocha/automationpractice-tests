class ProductContainer {
    getProducts() {
        return cy.get('.product-container'); // Pobierz wszystkie produkty na stronie
    }

    findAvailableAddToCartButtons() {
        // Użyj then(), aby przefiltrować produkty z aktywnym przyciskiem "Add to cart"
        return this.getProducts().then((products) => {
            const availableProducts = Cypress.$(products).toArray().filter((product) => {
                const addToCartButton = Cypress.$(product).find('.ajax_add_to_cart_button');
                return addToCartButton.length && !addToCartButton.hasClass('disabled');
            });
            return availableProducts;
        });
    }

    findProductsWithoutOutOfStock() {
        // Wyszukaj produkty, które nie mają komunikatu "Out of stock"
        return this.getProducts().then((products) => {
            const productsWithoutOutOfStock = Cypress.$(products).toArray().filter((product) => {
                return !Cypress.$(product).text().includes('Out of stock');
            });
            return productsWithoutOutOfStock;
        });
    }

    clickAddToCart(product) {
        // Kliknij "Add to cart" dla podanego produktu
        cy.wrap(product).find('.ajax_add_to_cart_button').click();
    }

    clickProductName(product) {
        // Kliknij na nazwę podanego produktu
        cy.wrap(product).find('.product-name').click();
    }

    selectRandomProduct(products) {
        // Wybierz losowy produkt z podanej listy produktów
        const randomIndex = Math.floor(Math.random() * products.length);
        return products[randomIndex];
    }
}

export default new ProductContainer();
