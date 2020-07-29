describe(`Practice button`, () => {
	it(`Should redirects to practice levels list`, () => {
		cy.visit(`${Cypress.env("baseUrl")}/`);
		cy.login();
		cy.contains("Practice").click()
		cy.get("[data-cy=practice-levels]").should("exist")
	}
})