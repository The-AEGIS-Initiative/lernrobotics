// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

Cypress.Commands.add("login", () => {
  cy.visit(`${Cypress.env("baseUrl")}/login-endpoint`);
  cy.get("[data-cy=username-input]").type(Cypress.env("username"));
  cy.wait(200);
  cy.get("[data-cy=password-input]").type(Cypress.env("password"));
  cy.wait(200);
  cy.get("[data-cy=sign-in-button]").click();
});

const resizeObserverLoopErrRe = /^ResizeObserver loop limit exceeded/;

Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes('ResizeObserver')) {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  }
  return true
});
// Alternatively you can use CommonJS syntax:
// require('./commands')
