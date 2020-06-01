describe("Login", () => {
  it(`visits the app at ${Cypress.env("baseUrl")}`, () => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it(`has a login button`, () => {
    cy.get("[data-cy=login-register-link]").should("exist");
  });

  it("visit login endpoint", () => {
    cy.visit(`${Cypress.env("baseUrl")}/login-endpoint`);
  });

  it("should be able to login", () => {
    cy.get("[data-cy=username-input]").type("test");
    cy.get("[data-cy=password-input]").type("password");
    cy.get("[data-cy=sign-in-button]").click();
    cy.get("[data-cy=logout-link]").should("exist");
    cy.get("[data-cy=admin-console-link]").should("not.exist");
    cy.contains("Admin").should("not.exist");
  });
});

describe("Unauthorized Access", () => {
  it(`should not be allowed access to protected routes`, () => {
    cy.visit(`${Cypress.env("baseUrl")}/admin`);
    cy.contains("Unauthorized");

    cy.visit(`${Cypress.env("baseUrl")}/admin/levelbuilder/level`);
    cy.contains("Unauthorized");
  });
});
