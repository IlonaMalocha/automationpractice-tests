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
    
            it('Should add an in-stock product or find an available combination and add to cart', () => { // Główny test: próbuje dodać produkt, który jest dostępny (in stock) lub znajdzie taki wariant rozmiar/kolor, który jest dostępny
    
                ProductList.findInStockProduct().then((product) => { // Szuka produktu na liście, który zawiera tekst "In stock"
                    
                    if (product) { // Jeśli znaleziono produkt dostępny
                        ProductList.clickProductName(product); // Kliknij w jego nazwę, aby przejść do szczegółów
    
                        ProductDetails.checkAvailability().then((status) => { // Sprawdź status dostępności (tekst z pola #availability_value)
                            if (status === 'In stock') { // Jeśli status to "In stock"
                                ProductDetails.addToCart(); // Kliknij przycisk "Add to cart"
                                ProductDetails.verifySuccessMessage(); // Sprawdź, czy pojawił się komunikat o sukcesie
                            }
                        });
    
                    } else { // Jeśli nie ma żadnego produktu bezpośrednio oznaczonego jako "In stock"
                        
                        ProductList.findProductsWithoutOutOfStock().then((available) => { // Szukaj produktów, które NIE mają tekstu "Out of stock"
    
                            if (!available.length) { // Jeśli nie ma żadnych takich produktów
                                throw new Error('No products available for testing'); // Rzuć wyjątek — nie ma czego testować
                            }
    
                            const randomProduct = ProductList.selectRandomProduct(available); // Wybierz losowy produkt z tych dostępnych
                            ProductList.clickProductName(randomProduct); // Kliknij jego nazwę, aby wejść w szczegóły
    
                            ProductDetails.findFirstAvailableCombination().then(() => { // Znajdź pierwszą dostępną kombinację kolor/rozmiar, która jest "In stock"
                                ProductDetails.addToCart(); // Dodaj do koszyka
                                ProductDetails.verifySuccessMessage(); // Sprawdź komunikat sukcesu
                            });
                        });
                    }
                });
            });
        });

        describe('Negative test cases', () => {
            it('Should verify Add to Cart buttons are disabled if no products are in stock', () => {
                // Pobierz wszystkie produkty z listy i przerób na tabelę
                ProductList.Products.then(($products) => {
                    const productsArray = Cypress.$($products).toArray();
            
                    // Sprawdź, czy żaden produkt nie ma statusu "In stock"
                    const noInStockProducts = productsArray.every((product) => {
                        return !Cypress.$(product).text().includes('In stock');
                    });
            
                    if (noInStockProducts) {
                        // Jeśli faktycznie nie ma żadnych dostępnych produktów, sprawdź każdy przycisk
                        productsArray.forEach((product) => {
                            const addToCartButton = Cypress.$(product).find('.ajax_add_to_cart_button');
                            expect(addToCartButton).to.have.length(1);
                            expect(addToCartButton).to.have.class('disabled'); // <- najważniejszy warunek
                        });
                    } else {
                        // Jeśli są produkty dostępne, to kończymy test z informacją
                        cy.log('There are products in stock, so negative test is skipped.');
                    }
                });
            });

            it('Should check that Add to Cart button is not visible for out of stock size-color combinations', () => {
                // Wybieramy losowy produkt z listy
                ProductList.Products.then((products) => {
                    const randomProduct = ProductList.selectRandomProduct(products);
                    ProductList.clickProductName(randomProduct);
        
                    // Sprawdzamy wszystkie kombinacje rozmiarów i kolorów
                    ProductDetails.checkAllSizeColorCombinations();
                });
            });
        })
    });
})

//Poniższe testy do uzupełnienia na dalszym poziomie ale póki co sobie darujemy
//     describe('Add product with various quantities'), () => {

//         describe('Positive test cases', () => {

//             it.skip('Should allow adding maximum available quantity to the cart', () => {
//                 // Test dla maksymalnej ilości
//             });
            
//             it.skip('Should allow adding minimum available quantity to the cart (1)', () => {
//                 // Znajdź produkty z aktywnym przyciskiem "Add to cart"
//                 ProductContainer.findAvailableAddToCartButtons().then((productsWithActiveButton) => {
//                     if (productsWithActiveButton.length > 0) {
//                         const randomProduct = ProductContainer.selectRandomProduct(productsWithActiveButton);
//                         ProductContainer.clickAddToCart(randomProduct);
            
//                         // Sprawdzenie pojawienia się komunikatu sukcesu
//                         cy.get('.layer_cart_product').should('be.visible')
//                             .and('contain', 'Product successfully added to your shopping cart');
            
//                     } else {
//                         // Znajdź produkty bez komunikatu "Out of stock"
//                         ProductContainer.findProductsWithoutOutOfStock().then((productsWithoutOutOfStock) => {
//                             if (productsWithoutOutOfStock.length > 0) {
//                                 const randomProductWithoutOutOfStock = ProductContainer.selectRandomProduct(productsWithoutOutOfStock);
//                                 ProductContainer.clickProductName(randomProductWithoutOutOfStock);
            
//                                 // Znajdź dostępny produkt za pomocą nowej metody
//                                 ProductDetails.findAvailableProduct().then(() => {
//                                     // Dodaj produkt do koszyka
//                                     ProductDetails.addToCart();
            
//                                     // Sprawdzenie pojawienia się komunikatu sukcesu
//                                     cy.get('.layer_cart_product h2')
//                                         .should('be.visible')
//                                         .and('contain', 'Product successfully added to your shopping cart');
//                                     cy.get('.cross').click();
//                                 });
//                             }
//                         });
//                     }
//                 });
//             }); // Test dla ilości 1

//             it.skip('Should allow adding minimum +1 available quantity to the cart (2)', () => {
//                 // Test dla ilości 2
//             });

//         })

//         describe('Negative test cases', () => {

//             it.skip('Should not allow adding zero quantity to the cart', () => {
//                 // Test dla ilości 0
//             });

//             it.skip('Should not allow adding quantity greater than maximum (max + 1)', () => {
//                 // Test dla ilości maksymalnej +1
//             });

//             it.skip('Should not allow adding negative quantity to the cart', () => {
//                 // Test dla wartości ujemnej
//             });
//         })

//     }
// })