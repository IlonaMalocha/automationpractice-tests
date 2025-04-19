// Filtrowanie na stronie ze wszystkimi produktami
// "Dresses" i "T-Shirts" to podkategorie "Women"

// Dodanie typu referencji dla podpowiedzi Cypress
///<reference types="cypress"/>

// Importy POMów
import Home from "../support/page_objects/Home";
import FilterPanel from "../support/page_objects/FilterPanel";

describe('Filtering', () => {
    // Przed każdym testem z tej grupy przejdź na podstronę "Women"
    beforeEach('Go to Women Subpage', () => {
        cy.openHomePage();
        Home.womenTab.click(); // kliknięcie w zakładkę "Women" z menu górnego
    });

    describe('By category', () => {
        // Lista kategorii do przetestowania, wraz z oczekiwanymi słowami w tytule produktów
        const categoriesToTest = [
            { name: 'Tops', expectedKeywords: ['T-shirt', 'Blouse'] },
            { name: 'Dresses', expectedKeywords: ['Dress'] }
        ];

        // Test dla każdej kategorii
        categoriesToTest.forEach(({ name, expectedKeywords }) => {
            it(`Should display only products related to ${name}`, () => {
                // Wybór kategorii poprzez zaznaczenie checkboxa w panelu filtrów
                FilterPanel.selectCategory(name);

                // Poczekaj aż produkty się załadują (alternatywnie: wait na spinner/loader)
                cy.wait(2000);

                // Sprawdź, czy przefiltrowane produkty są widoczne
                FilterPanel.FilteredProducts.should('be.visible');

                // Sprawdź, czy każdy z produktów zawiera w tytule jedno z oczekiwanych słów
                FilterPanel.verifyProductsContainAnyKeyword(expectedKeywords);
            });
        });
    });

    describe('By sizes', () => {
        // Przechwycenie i ignorowanie błędów JavaScript, które nie powinny psuć testów
        beforeEach(() => {
            cy.on('uncaught:exception', (err, runnable) => {
                if (err.message.includes('lockLocationChecking is not defined')) {
                    return false; // ignoruj ten wyjątek
                }
            });
        });

        // Lista rozmiarów do przetestowania
        const sizesToTest = [
            { name: 'S' },
            { name: 'M' },
            { name: 'L' }
        ];

        sizesToTest.forEach(size => {
            it(`Should display only products that have the ${size.name} size option`, () => {
                // Wejdź bezpośrednio na stronę z aktywnym filtrem rozmiaru (via URL)
                const filterUrl = `http://www.automationpractice.pl/index.php?id_category=3&controller=category#/size-${size.name.toLowerCase()}`;
                cy.visit(filterUrl);

                // Sprawdź, czy przefiltrowane produkty są widoczne
                FilterPanel.FilteredProducts.should('be.visible');

                // Sprawdź, czy każdy produkt ma opcję rozmiaru S/M/L
                FilterPanel.verifyProductsHaveSize(size.name);

                // Upewnij się, że filtr rozmiaru nadal jest zaznaczony
                FilterPanel.verifySizeFilterIsStillSelected(size.name);
            });
        });
    });

    describe('By colors', () => {
        // Lista kolorów z nazwami i odpowiadającymi im wartościami HEX
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

        // Test dla każdego koloru
        colorsToTest.forEach(color => {
            it(`Should display only products that have the ${color.name} color option`, () => {
                // Zaznaczenie checkboxa koloru na panelu filtrów
                FilterPanel.selectColor(color.name);

                // Sprawdzenie, czy liczba produktów jest mniejsza niż liczba pierwotna (7)
                FilterPanel.FilteredProducts.should('have.length.lessThan', 7);

                // Weryfikacja, czy wszystkie widoczne produkty zawierają dany kolor (np. w stylu lub ikonie koloru)
                FilterPanel.verifyProductsHaveColor(color.hex);
            });
        });
    });
});