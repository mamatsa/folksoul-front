/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

describe('Dashboard welcome page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.login();
  });

  it('User can navigate on dashboard pages', () => {
    cy.get('[data-cy="nav-members"]').click();
    cy.url().should('include', '/band-members');
    cy.get('[data-cy="nav-social"]').click();
    cy.url().should('include', '/social-links');
    cy.get('[data-cy="nav-about"]').click();
    cy.url().should('include', '/about-band');
    cy.get('[data-cy="nav-dashboard"]').click();
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="nav-logout"]').click();
    cy.url().should('include', '/');
  });
});
