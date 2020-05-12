describe("Cypress", () => {
  it("is working", () => {
    expect(true).to.equal(true);
  });

  it("visits the app at localhost:3000", () => {
    cy.visit("http://localhost:3000");
  });
});
