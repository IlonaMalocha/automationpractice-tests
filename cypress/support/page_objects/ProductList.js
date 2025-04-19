class ProductList {

    // Getter: pobiera wszystkie produkty na stronie (każdy ma klasę .product-container)
    get Products() {
        return cy.get('.product-container');
    }

    // Zwraca tablicę DOM-owych produktów z aktywnym (niezablokowanym) przyciskiem "Add to cart"
    findAvailableAddToCartButtons() {
        return this.Products.then(($products) => { // Po pobraniu wszystkich produktów
            const productsArray = Cypress.$($products).toArray(); // Konwertujemy wynik na tablicę elementów DOM
            return productsArray.filter((product) => { // Filtrowanie: zostaw tylko te, które...
                const button = Cypress.$(product).find('.ajax_add_to_cart_button'); // mają przycisk "Add to cart"
                return button.length && !button.hasClass('disabled'); // ...i ten przycisk nie ma klasy "disabled"
            });
        });
    }

    // Zwraca produkty, które NIE mają tekstu "Out of stock" (czyli są potencjalnie dostępne)
    findProductsWithoutOutOfStock() {
        return this.Products.then(($products) => { // Pobierz wszystkie produkty
            const productsArray = Cypress.$($products).toArray(); // Zamień na tablicę DOM
            return productsArray.filter((product) => // Filtrowanie:
                !Cypress.$(product).text().includes('Out of stock') // zostaw te, które NIE mają "Out of stock"
            );
        });
    }

    // Zwraca pierwszy produkt z tekstem "In stock" (lub null, jeśli żaden nie spełnia warunku)
    findInStockProduct() {
        return this.Products.then(($products) => { // Pobierz wszystkie produkty
            const productsArray = Cypress.$($products).toArray(); // Zamień na tablicę
            const inStock = productsArray.find((product) => // Szukaj pierwszego produktu...
                Cypress.$(product).text().includes('In stock') // ...który zawiera tekst "In stock"
            );
            return inStock || null; // Zwróć znaleziony produkt lub null, jeśli nie znaleziono
        });
    }

    // Kliknij przycisk "Add to cart" we wskazanym produkcie
    clickAddToCart(product) {
        cy.wrap(product).find('.ajax_add_to_cart_button').click(); // Znajduje przycisk wewnątrz produktu i klika
    }

    // Kliknij w nazwę produktu, aby przejść do jego szczegółów
    clickProductName(product) {
        cy.wrap(product).find('.product-name').click(); // Znajduje element z klasą .product-name i klika
    }

    // Zwraca losowy produkt z przekazanej tablicy produktów
    selectRandomProduct(products) {
        const randomIndex = Math.floor(Math.random() * products.length); // Wybiera losowy indeks
        return products[randomIndex]; // Zwraca produkt z tego indeksu
    }
}

export default new ProductList(); // Eksportuje gotową instancję klasy do użycia w testach