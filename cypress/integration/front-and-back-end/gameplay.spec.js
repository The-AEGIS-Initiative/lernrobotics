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

    cy.wait(1000);

    cy.contains("Submit").click();
  });
});
