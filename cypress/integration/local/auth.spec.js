describe("Login", () => {
  it("should be able to login", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.get("[data-cy=nav-bar-menu]", { timeout: 15000 }).click();
    cy.get("[data-cy=login-register-link]").should("exist");
    cy.visit(`${Cypress.env("baseUrl")}/login-endpoint`);
    cy.get("[data-cy=username-input]").type("test");
    cy.get("[data-cy=password-input]").type("password");
    cy.get("[data-cy=sign-in-button]").click();
    cy.get("[data-cy=nav-bar-menu]", { timeout: 15000 }).click();
    cy.get("[data-cy=logout-link]").should("exist");
    cy.get("[data-cy=admin-console-link]").should("not.exist");
    cy.contains("Admin").should("not.exist");
  });
});

describe("Unauthorized Access", () => {
  it(`user should not be allowed access to protected routes`, () => {
    cy.login();

    cy.visit(`${Cypress.env("baseUrl")}/admin`);
    cy.contains("Unauthorized");

    cy.visit(`${Cypress.env("baseUrl")}/admin/levelbuilder/level`);
    cy.contains("Unauthorized");
  });

  it(`guest should not be allowed access to protected routes`, () => {
    cy.visit(`${Cypress.env("baseUrl")}/game/hello_world`);
    cy.contains("Unauthorized");

    cy.visit(`${Cypress.env("baseUrl")}/admin`);
    cy.contains("Unauthorized");

    cy.visit(`${Cypress.env("baseUrl")}/admin/levelbuilder/level`);
    cy.contains("Unauthorized");

    cy.visit(`${Cypress.env("baseUrl")}/dashboard`);
    cy.get("[data-cy=start-page]").should("exist");

    cy.visit(`${Cypress.env("baseUrl")}/practice`);
    cy.get("[data-cy=start-page]").should("exist");
  });
});

describe("Homepage redirect", () => {
  it(`Should redirect guests to public start page`, () => {
    cy.visit(`${Cypress.env("baseUrl")}/`);
    cy.get("[data-cy=start-page]").should("exist");
  });

  it(`Should redirect to dashboard on login and back to start on logout`, () => {
    cy.visit(`${Cypress.env("baseUrl")}`);
    cy.login();
    cy.get("[data-cy=dashboard]").should("exist");
    cy.get("[data-cy=nav-bar-menu]", { timeout: 15000 }).click();
    cy.get("[data-cy=logout-link]").click();
    cy.get("[data-cy=start-page]").should("exist");
  });
});
