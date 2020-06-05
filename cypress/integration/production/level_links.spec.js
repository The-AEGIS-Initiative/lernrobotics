describe("Level links", () => {
  it("should be able to load all levels", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.login();

    var i = 0;
    cy.get("[data-cy=level-start-button]").each((button) => {
      cy.get("[data-cy=level-start-button]").eq(i).click();

      cy.contains("Loading", { timeout: 10000 });

      cy.visit(Cypress.env("baseUrl"));
      i++;
    });
  });
});
