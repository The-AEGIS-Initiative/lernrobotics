describe("Gameplay", () => {
  it("Can submit user code and run the game", () => {
    cy.login();

    cy.contains("Hello World")
      .parent()
      .parent()
      .parent()
      .within(() => {
        cy.contains("Start").click();
      });

    cy.get(".console").within(() => {
      cy.contains("Game loaded", {
        timeout: 30000,
      });
    });

    cy.wait(1000);

    cy.contains("Submit").click();

    cy.get(".console").within(() => {
      cy.contains("Robot Initialized", { timeout: 30000 });
    });
  });
});
