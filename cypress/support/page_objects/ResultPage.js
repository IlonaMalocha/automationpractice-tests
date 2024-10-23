class ResultPage {
    get searchAlert() {
        return cy.get(".alert")
    }
}

export default new ResultPage();