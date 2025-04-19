///<reference types="cypress"/>

const categories = [
  { name: 'Women', url: '/index.php?id_category=3&controller=category' },
  { name: 'Dresses', url: '/index.php?id_category=8&controller=category' },
  { name: 'T-Shirts', url: '/index.php?id_category=5&controller=category' }
];
  
const sortOptions = [
  { label: 'Price: Lowest first', value: 'price:asc' },
  { label: 'Price: Highest first', value: 'price:desc' },
  { label: 'Product Name: A to Z', value: 'name:asc' },
  { label: 'Product Name: Z to A', value: 'name:desc' },
  { label: 'In stock', value: 'quantity:desc' },
  { label: 'Reference: Lowest first', value: 'reference:asc' },
  { label: 'Reference: Highest first', value: 'reference:desc' }
];
  
describe('Sorting tests on all category pages', () => {
  categories.forEach(({ name, url }) => {

    describe(`${name} page`, () => {
      beforeEach(() => {
        cy.visit(url);
      });

      sortOptions.forEach(({ label, value }) => {
        it(`Should sort by "${label}"`, () => {
          cy.get('#selectProductSort').select(label);
          cy.get('#selectProductSort').should('have.value', value);
        });
      });
    });
  });
});