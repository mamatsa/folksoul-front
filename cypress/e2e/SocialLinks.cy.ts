/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

describe('Social links page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.login();
    cy.fixture('getSocialLinks.json').then((body) => {
      cy.intercept('GET', `${Cypress.env('baseApiUrl')}social-links`, {
        statusCode: 200,
        body,
      });
    });
    cy.get('[data-cy="nav-social"]').click();
  });

  it('User can add social link', () => {
    cy.get('[data-cy="add-social-link"]').click();
    cy.get('[data-cy="submit-social-link"]').click();
    cy.get('#name').type('facebook');
    cy.get('#link').type('https://facebook.com');
    cy.get('[data-cy="go-back"]').click();
    cy.get('[data-cy="add-social-link"]').click();
    cy.fixture('getSocialLinks.json').then((body) => {
      cy.intercept('POST', `${Cypress.env('baseApiUrl')}social-link`, {
        statusCode: 200,
        body,
      });
    });
    cy.get('[data-cy="submit-social-link"]').click();
    cy.get('[data-cy="add-social-link"]').click();
  });

  it('User can edit social link', () => {
    cy.fixture('getSocialLink.json').then((body) => {
      cy.intercept('GET', `${Cypress.env('baseApiUrl')}social-link/1`, {
        statusCode: 200,
        body,
      });
    });
    cy.get('[data-cy="edit-social-link"]').click();
    cy.get('#link').type('/folksoul');
    cy.fixture('getSocialLinks.json').then((body) => {
      cy.intercept('PUT', `${Cypress.env('baseApiUrl')}social-link/1`, {
        statusCode: 200,
        body,
      });
    });
    cy.get('[data-cy="submit-social-link"]').click();
  });

  it('User can update social link icon', () => {
    cy.get('[data-cy="update-social-link-icon"]').click();
    cy.get('[data-cy="modal-exit-button"]').click();
    cy.get('[data-cy="update-social-link-icon"]').click();
    cy.get('[data-cy="file-upload-input"]').attachFile('login.json');
    cy.get('[data-cy="file-upload-input"]').attachFile('avatar.png');
    cy.fixture('getSocialLink.json').then((body) => {
      cy.intercept('PUT', `${Cypress.env('baseApiUrl')}social-link/icon/1`, {
        statusCode: 200,
        body,
      });
    });
    cy.get('[data-cy="save-uploaded-file"]').click();
  });

  it('User can delete social link', () => {
    cy.get('[data-cy="delete-social-link"]').click();
    cy.fixture('getSocialLink.json')
      .then((body) => {
        cy.intercept('DELETE', `${Cypress.env('baseApiUrl')}social-link/1`, {
          statusCode: 200,
          body,
        });
      })
      .as('req');
    cy.wait('@req');
  });
});
