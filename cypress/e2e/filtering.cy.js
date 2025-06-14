///<reference types="cypress"/>

import Home from "../support/page_objects/Home";
import FilterPanel from "../support/page_objects/FilterPanel";

describe('Filtering', () => {
    beforeEach('Go to Women Subpage', () => {
        cy.openHomePage();
        Home.womenTab.click();
    });

    describe('By category', () => {
        const categoriesToTest = [
            { name: 'Tops', expectedKeywords: ['T-shirt', 'Blouse'] },
            { name: 'Dresses', expectedKeywords: ['Dress'] }
        ];
        categoriesToTest.forEach(({ name, expectedKeywords }) => {
            it(`Should display only products related to ${name}`, () => {
                FilterPanel.selectCategory(name);
                cy.wait(2000);
                FilterPanel.FilteredProducts.should('be.visible');
                FilterPanel.verifyProductsContainAnyKeyword(expectedKeywords);
            });
        });
    });

    describe('By sizes', () => {
        beforeEach(() => {
            cy.on('uncaught:exception', (err, runnable) => {
                if (err.message.includes('lockLocationChecking is not defined')) {
                    return false;
                }
            });
        });
        const sizesToTest = [
            { name: 'S' },
            { name: 'M' },
            { name: 'L' }
        ];
        sizesToTest.forEach(size => {
            it(`Should display only products that have the ${size.name} size option`, () => {
                const filterUrl = `http://www.automationpractice.pl/index.php?id_category=3&controller=category#/size-${size.name.toLowerCase()}`;
                cy.visit(filterUrl);
                FilterPanel.FilteredProducts.should('be.visible');
                FilterPanel.verifyProductsHaveSize(size.name);
                FilterPanel.verifySizeFilterIsStillSelected(size.name);
            });
        });
    });

    describe('By colors', () => {
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
        colorsToTest.forEach(color => {
            it(`Should display only products that have the ${color.name} color option`, () => {
                FilterPanel.selectColor(color.name);
                FilterPanel.FilteredProducts.should('have.length.lessThan', 7);
                FilterPanel.verifyProductsHaveColor(color.hex);
            });
        });
    });
});