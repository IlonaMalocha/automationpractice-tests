# Cypress E2E Tests – Portfolio Project

This project contains a set of end-to-end tests written in Cypress, using the Page Object Model (POM) pattern. The tests were created for the automationpractice.pl website as part of a personal tester portfolio project.
It includes selected test cases that demonstrate key functionalities and typical user flows.

## Test coverage

- Adding products to cart (including unavailable combinations)
- Contact form validation
- User registration
- Login and logout
- Product filtering and sorting
- Navigation between pages

## Project structure

```
cypress/
│
├── e2e/                      # End-to-End test files
│
├── fixtures/                 # Test data in JSON format
│
├── support/
│   ├── page_objects/         # Page Object Model – classes representing pages or components
│   └── commands.js           # custom Cypress commands
cypress.config.js             # Cypress configuration file
package.json                  # Project dependencies and scripts
package-lock.json             # Auto-generated file locking dependency versions
.gitignore                    # Specifies files/folders ignored by Git
README.md                     # Project documentation and description
```

## Technologies used

- [Cypress](https://www.cypress.io/)
- JavaScript (ES6+)
- Page Object Model (POM)

## How to run the tests

To run the tests locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/IlonaMalocha/automationpractice-tests.git
   cd automationpractice-tests
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run tests in interactive mode (Cypress Test Runner):**
   ```bash
   npx cypress open
   ```

4. **Or run tests in headless mode (from the terminal):**
   ```bash
   npx cypress run
   ```