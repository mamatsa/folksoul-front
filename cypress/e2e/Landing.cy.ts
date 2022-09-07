/// <reference types="cypress" />

describe('Dashboard welcome page', () => {
  it('Visit', () => {
    cy.fixture('getMembers.json').then((body) => {
      cy.intercept('GET', `${Cypress.env('baseApiUrl')}band-members`, {
        statusCode: 200,
        body,
      });
    });
    cy.fixture('getSocialLinks.json').then((body) => {
      cy.intercept('GET', `${Cypress.env('baseApiUrl')}social-links`, {
        statusCode: 200,
        body,
      });
    });
    cy.visit('/');
  });

  it('Planet can be stopped', () => {
    cy.get('[data-cy="planet-1"]').click();
    cy.get('[data-cy="sun-note"]').click();
  });
});
