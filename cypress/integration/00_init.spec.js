describe("Cypress", () => {
  it("is working", () => {
    expect(true).to.equal(true);
  });

  it(`visits the app at ${Cypress.env("baseUrl")}`, () => {
    cy.visit(Cypress.env("baseUrl"));
  });
});
