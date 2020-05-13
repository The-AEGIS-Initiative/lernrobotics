describe("Login", () => {
  it(`visits the app at ${Cypress.env("baseUrl")}`, () => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it(`has a login button`, () => {
    cy.contains("Login / Register");
  });

  it("visit login endpoint", () => {
    cy.visit(`${Cypress.env("baseUrl")}login-endpoint`);
  });

  it("should be able to login", () => {
    cy.get(".username-input").type("test");
    cy.get(".password-input").type("password");
    cy.get(".sign-in-button").click();
    cy.contains("Logout");
    cy.contains("Admin").should("not.exist");
  });
});

describe("Unauthorized Access", () => {
  it(`should not be allowed access to protected routes`, () => {
    cy.visit(`${Cypress.env("baseUrl")}admin`);
    cy.contains("Unauthorized");

    cy.visit(`${Cypress.env("baseUrl")}admin/levelbuilder`);
    cy.contains("Unauthorized");
  });
});
