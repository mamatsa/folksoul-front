/// <reference types="cypress" />

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('User can type', () => {
    cy.get('#nickname').type('name');
  });
});
