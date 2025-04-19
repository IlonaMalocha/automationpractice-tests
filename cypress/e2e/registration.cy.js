///<reference types="cypress"/>

import Home from "../support/page_objects/Home.js" //zaimportowanie POM
import RegistrationPage from "../support/page_objects/RegistrationPage.js";

function generateUniqueEmail() { // funkcja do ładowania unikalnego adresu mailowego
    const timestamp = new Date().getTime(); // Pobieramy aktualny timestamp w milisekundach od 1 stycznia 1970 (tzw. UNIX time) Dzięki temu każdorazowe wywołanie da nam inną, unikalną wartość
    return `user${timestamp}@test.com`; //Tworzymy adres e-mail (jeśli timestamp to 1713103765098, zwróci: user1713103765098@test.com)
} //jeśli używamy unikalnego adresu to nie musimy go podawać w jsonie

describe('User Registration', () => {

    beforeEach(function() { //ładowanie danych z jasona, można też u góry 'import registrationData from '../fixtures/registrationData.json';'
        cy.fixture('registrationData').then((data) => { //metoda fixture do załadowania pliku z danymi jako obiekt i wtedy zawartość pliku json...
            this.registrationData = data;//...czyli data, jest przypisana do zmiennej registrationData (czyli przypisanie zawartości pliku z jsonem do zmiennej o tej samej nazwie)
        });
        cy.openHomePage();
        Home.signIn.click()
    });

    afterEach(() => { //zamiast signOut po każdym przypadku - To sprawdza, czy przycisk Sign out w ogóle istnieje i tylko wtedy go klika — żeby test się nie wywalił, jeśli użytkownik wcale nie był zalogowany.
        cy.get('body').then(($body) => {
            if ($body.find('.logout').length > 0) { // lub inny selektor do przycisku wyloguj
                cy.get('.logout').click();
            }
        });
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    describe('Positive test cases', () => {

        it('Should register a user with a valid email and all fields completed', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'Valid email, all fields completed'); //Filtrujemy dane z fixture (this.registrationData), wybierając tylko te, które odpowiadają scenariuszowi
            dataSets.forEach((validData) => {  // Dla każdego zestawu danych pasującego do scenariusza:
                const uniqueEmail = generateUniqueEmail(); //generujemy unikalny adres email
                const dataToSubmit = { ...validData, email: uniqueEmail }; // Tworzymy nowy obiekt z danymi do wysłania, podmieniając e-mail na unikalny
                RegistrationPage.enterEmail(dataToSubmit.email);
                cy.wait(2000);
                RegistrationPage.fillPersonalInformation(dataToSubmit);
                RegistrationPage.submitRegistration();
                RegistrationPage.assertSuccessMessage(dataToSubmit.message);
                cy.writeFile('cypress/fixtures/tempLoginData.json', { // Zapisujemy dane logowania do tymczasowego pliku JSON (przydatne do logowania w kolejnych testach)
                    email: dataToSubmit.email,
                    password: dataToSubmit.password
                });
            });
        });

        it('Should register a user with a valid email and only mandatory fields completed', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'Valid email, mandatory fields completed');
            dataSets.forEach((validData) => {
                const uniqueEmail = generateUniqueEmail();
                const dataToSubmit = { ...validData, email: uniqueEmail };
                RegistrationPage.enterEmail(dataToSubmit.email);
                cy.wait(2000);
                RegistrationPage.fillPersonalInformation(dataToSubmit);
                RegistrationPage.submitRegistration();
                RegistrationPage.assertSuccessMessage(dataToSubmit.message);
            });
        });
    });

    describe('Negative test cases', () => {

        it('Should show an error when trying to register with invalid email', function() { //zwykła funkcja zamiast strzałkowej ponieważ używam this
            const dataSets = this.registrationData.filter(test => test.scenario === 'Invalid email format');
            dataSets.forEach((invalidData) => {
                const dataToSubmit = { ...invalidData};
                RegistrationPage.enterEmail(dataToSubmit.email);
                RegistrationPage.assertErrorMessage(dataToSubmit.message)
            });
        });    

        it('Should show an error when trying to register without an email', () => {
            RegistrationPage.clickOnCreateAnAccount();
            RegistrationPage.assertErrorMessage("Invalid email address.")
        });

        it('Should show an error when trying to register with empty first name', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'Empty first name');
            dataSets.forEach((validData) => {
                const dataToSubmit = { ...validData};
                RegistrationPage.enterEmail(dataToSubmit.email);
                cy.wait(2000);
                RegistrationPage.fillPersonalInformation(dataToSubmit);
                RegistrationPage.submitRegistration();
                RegistrationPage.assertErrorMessage(dataToSubmit.message);
            });
        });

        it('Should show an error when trying to register with empty last name', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'Empty last name');
            dataSets.forEach((validData) => {
                const dataToSubmit = { ...validData};
                RegistrationPage.enterEmail(dataToSubmit.email);
                cy.wait(2000);
                RegistrationPage.fillPersonalInformation(dataToSubmit);
                RegistrationPage.submitRegistration();
                RegistrationPage.assertErrorMessage(dataToSubmit.message);
            });
        });

        it('Should show an error when trying to register with too short password', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'Password too short');
            dataSets.forEach((validData) => {
                const dataToSubmit = { ...validData};
                RegistrationPage.enterEmail(dataToSubmit.email);
                cy.wait(2000);
                RegistrationPage.fillPersonalInformation(dataToSubmit);
                RegistrationPage.submitRegistration();
                RegistrationPage.assertErrorMessage(dataToSubmit.message);
            });
        });

        it('Should show an error when trying to register without a password', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'Missing password');
            dataSets.forEach((validData) => {
                const dataToSubmit = { ...validData};
                RegistrationPage.enterEmail(dataToSubmit.email);
                cy.wait(2000);
                RegistrationPage.fillPersonalInformation(dataToSubmit);
                RegistrationPage.submitRegistration();
                RegistrationPage.assertErrorMessage(dataToSubmit.message);
            });
        });

        //bug below
        it('[BUG] Should show an error when trying to register with day of birth out of range (31/02)', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'DOB day out of range');
            dataSets.forEach((validData) => {
                const dataToSubmit = { ...validData};
                RegistrationPage.enterEmail(dataToSubmit.email);
                cy.wait(2000);
                RegistrationPage.fillPersonalInformation(dataToSubmit);
                RegistrationPage.submitRegistration();
                RegistrationPage.assertErrorMessage(dataToSubmit.message);
            });
        });

        it('Should show an error when trying to register with a date of birth later that today', function() {
            const dataSets = this.registrationData.filter(test => test.scenario === 'DOB later that today');
            dataSets.forEach((validData) => {
                const dataToSubmit = { ...validData};
                RegistrationPage.enterEmail(dataToSubmit.email);
                cy.wait(2000);
                RegistrationPage.fillPersonalInformation(dataToSubmit);
                RegistrationPage.submitRegistration();
                RegistrationPage.assertErrorMessage(dataToSubmit.message);
            });
        });

        it('Should show an error when trying to register with an empty email field', () => {
            RegistrationPage.enterEmail(' '); // lub ''
            RegistrationPage.clickOnCreateAnAccount();
            RegistrationPage.assertErrorMessage("Invalid email address.");
        });

        it('Should show an error when trying to register with whitespace as email', () => {
            RegistrationPage.enterEmail('    ');
            RegistrationPage.clickOnCreateAnAccount();
            RegistrationPage.assertErrorMessage("Invalid email address.");
        });

        it('Should show an error when pressing Enter without entering email', () => {
            cy.get('#email_create').focus().type('{enter}'); // ID może się różnić, zależnie od strony
            RegistrationPage.assertErrorMessage("Invalid email address.");
        });
    });
})