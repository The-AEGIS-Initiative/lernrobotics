describe("Gameplay", () => {
  it("Can submit user code and run the game", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.login();

    cy.get("[data-cy=level-start-button]").eq(0).click();

    cy.wait(1000);
    cy.contains("Loading", { timeout: 10000 });

    cy.get(".ant-modal-close", { timeout: 60000 }).click({ timeout: 60000 });

    cy.contains("Submit").click();
    cy.get(".ant-modal-close", { timeout: 60000 }).click({ timeout: 60000 });
  });
});
