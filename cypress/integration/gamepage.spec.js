describe("Submit user code", () => {
  it("visits the hello_world level", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.get("a").eq(0).click();
  });

  it("loads the unity game", () => {
    cy.get(".console").within(() => {
      cy.get("span", { timeout: 30000 }).contains("Game loaded", {
        timeout: 30000,
      });
    });
  });

  it("submits user code successfully within 20 seconds", () => {
    cy.wait(1000);

    cy.contains("Submit").click();

    cy.wait(15000);
    cy.get(".console").within(() => {
      cy.get("span", { timeout: 30000 }).contains("Robot Initialized", {
        timeout: 30000,
      });
    });
  });
});
