///<reference types="cypress"/>

// // 🔸 Tablica z kategoriami, które chcemy przetestować.
// Każdy obiekt zawiera:
// - `name` → tylko opisowa nazwa kategorii (dla czytelności testu)
// - `url` → adres podstrony tej kategorii (relatywny względem domeny bazowej, np. http://localhost:8080)
const categories = [
    { name: 'Women', url: '/index.php?id_category=3&controller=category' },
    { name: 'Dresses', url: '/index.php?id_category=8&controller=category' },
    { name: 'T-Shirts', url: '/index.php?id_category=5&controller=category' }
  ];
  
  // 🔸 Tablica z opcjami sortowania.
  // Każdy obiekt zawiera:
  // - `label` → to, co użytkownik widzi w <select> (czyli tekst opcji)
  // - `value` → to, co faktycznie zmienia się w atrybucie `value` po wyborze (czyli wartość, którą testujemy w `.should('have.value')`)
  const sortOptions = [
    { label: 'Price: Lowest first', value: 'price:asc' },
    { label: 'Price: Highest first', value: 'price:desc' },
    { label: 'Product Name: A to Z', value: 'name:asc' },
    { label: 'Product Name: Z to A', value: 'name:desc' },
    { label: 'In stock', value: 'quantity:desc' },
    { label: 'Reference: Lowest first', value: 'reference:asc' },
    { label: 'Reference: Highest first', value: 'reference:desc' }
  ];
  
  // 🔸 Główna grupa testów – testujemy sortowanie na wszystkich podstronach kategorii
  describe('Sorting tests on all category pages', () => {
  
    // 🔄 Dla każdej kategorii (Women, Dresses, T-Shirts) tworzymy osobną grupę `describe`
    categories.forEach(({ name, url }) => {
      describe(`${name} page`, () => {
  
        // 🔁 Przed każdym testem w danej grupie odwiedzamy odpowiednią podstronę kategorii
        beforeEach(() => {
          cy.visit(url); // np. /index.php?id_category=3&controller=category
        });
  
        // 🔄 Dla każdej opcji sortowania wykonujemy osobny test
        sortOptions.forEach(({ label, value }) => {
          it(`Should sort by "${label}"`, () => {
  
            // 1. Wybieramy odpowiednią opcję z selecta po widocznej nazwie
            // Cypress znajdzie opcję, której label odpowiada `label`
            cy.get('#selectProductSort').select(label);
  
            // 2. Sprawdzamy, czy po wyborze select ma odpowiednią wartość (`value`)
            // To potwierdza, że sortowanie zostało uruchomione z odpowiednim parametrem
            cy.get('#selectProductSort').should('have.value', value);
          });
        });
      });
    });
  });