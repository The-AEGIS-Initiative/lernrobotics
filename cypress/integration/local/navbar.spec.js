describe(`Top Navigation Bar`, () => {
	it(`Dashboard should redirect to dashboard`, () => {
		cy.visit(`${Cypress.env("baseUrl")}/`);
		cy.login();
		cy.get("[data-cy=dashboard-link").click()
		cy.get("[data-cy=dashboard").should("exist")
	}
})