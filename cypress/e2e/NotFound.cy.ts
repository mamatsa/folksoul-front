/// <reference types="cypress" />

describe('Not found page', () => {
  it('Not found page is displayed on unregistered routes', () => {
    cy.visit('/landing');
    cy.get('#goBack').click();
  });

  it('Unauthorized access on dashboard is avoided', () => {
    cy.visit('/band-members');
    cy.get('#goBack').click();
  });
});
