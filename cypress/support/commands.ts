/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
  cy.get('#nickname').type('nickname');
  cy.get('#password').type('password');
  cy.fixture('login.json').then((body) => {
    cy.intercept('POST', `${Cypress.env('baseApiUrl')}login`, {
      statusCode: 200,
      body,
    });
  });
  cy.get('#submitLogin').click();
});
