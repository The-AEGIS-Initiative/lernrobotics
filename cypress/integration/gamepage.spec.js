describe("Gameplay", () => {
  it("visits the hello_world level", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.contains("Hello World")
      .parent()
      .parent()
      .parent()
      .within(() => {
        cy.contains("Start").click();
      });
  });

  it("loads the unity game", () => {
    cy.get(".console").within(() => {
      cy.get("span", { timeout: 30000 }).contains("Game loaded", {
        timeout: 30000,
      });
    });
  });

  it("submits user code successfully within 30 seconds", () => {
    cy.wait(1000);

    cy.contains("Submit").click();

    cy.get(".console").within(() => {
      cy.contains("Robot Initialized", { timeout: 30000 });
    });
  });
});
