describe("Gameplay", () => {
  it("Can submit user code and run the game", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.login();

    cy.get("[data-cy=dashboard]").should("exist");

    cy.visit(`${Cypress.env("baseUrl")}/game/hello_world`);

    cy.contains("Loading", { timeout: 10000 });

    cy.contains("Skip", { timeout: 60000 }).click();

    cy.contains("Submit").click();
    cy.get(".ant-modal-close", { timeout: 60000 }).click({ timeout: 60000 });
  });
});
