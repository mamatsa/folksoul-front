/// <reference types="cypress" />

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('User can not login if validations are violated', () => {
    cy.get('#submitLogin').click();
    cy.get('[data-cy="nickname-error"]').should('be.visible');

    cy.get('#nickname').type('na');
    cy.get('#submitLogin').click();
    cy.get('[data-cy="nickname-error"]').should('be.visible');

    cy.get('#nickname').type('me');
    cy.get('#submitLogin').click();
    cy.get('[data-cy="password-error"]').should('be.visible');

    cy.get('#password').type('pa');
    cy.get('#submitLogin').click();
    cy.get('[data-cy="password-error"]').should('be.visible');

    cy.get('#nickname').type('#');
    cy.get('#submitLogin').click();
    cy.get('[data-cy="nickname-error"]').should('be.visible');
  });

  it('User can not login with wrong credentials', () => {
    cy.get('#nickname').type('nickname');
    cy.get('#password').type('password');
    cy.intercept('POST', `${Cypress.env('baseApiUrl')}login`, {
      statusCode: 400,
    });
    cy.get('#submitLogin').click();
    cy.get('[data-cy="nickname-error"]').should('be.visible');
    cy.get('[data-cy="password-error"]').should('be.visible');
  });

  it('User can see message on server error', () => {
    cy.get('#nickname').type('nickname');
    cy.get('#password').type('password');
    cy.intercept('POST', `${Cypress.env('baseApiUrl')}login`, {
      statusCode: 500,
    });
    cy.get('#submitLogin').click();
    cy.get('[data-cy="nickname-error"]').should('be.visible');
    cy.get('[data-cy="password-error"]').should('be.visible');
  });

  it('User can log in', () => {
    cy.get('#nickname').type('nickname');
    cy.get('#password').type('password');
    cy.fixture('login.json').then((body) => {
      cy.intercept('POST', `${Cypress.env('baseApiUrl')}login`, {
        statusCode: 200,
        body,
      });
    });
    cy.get('#submitLogin').click();
    cy.url().should('include', '/dashboard');
  });
});
