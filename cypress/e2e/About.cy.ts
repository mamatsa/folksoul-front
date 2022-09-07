/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

describe('About page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.login();
    cy.fixture('getAboutBandInfo.json').then((body) => {
      cy.intercept('GET', `${Cypress.env('baseApiUrl')}band-information`, {
        statusCode: 200,
        body,
      });
    });
    cy.get('[data-cy="nav-about"]').click();
  });

  it('Textarea validations work', () => {
    cy.get('[data-cy="edit-band-info"]').click();
    cy.get('#about').clear();
    cy.get('[data-cy="submit-band-info"]').click();
    cy.get('#about').type('ინფორმაცია');
    cy.fixture('getAboutBandInfo.json').then((body) => {
      cy.intercept('PUT', `${Cypress.env('baseApiUrl')}band-information`, {
        statusCode: 500,
        body,
      });
    });
    cy.get('[data-cy="submit-band-info"]').click();
  });

  it('Band information can be changed', () => {
    cy.get('[data-cy="edit-band-info"]').click();
    cy.get('#about').type('ინფორმაცია');
    cy.fixture('getAboutBandInfo.json').then((body) => {
      cy.intercept('PUT', `${Cypress.env('baseApiUrl')}band-information`, {
        statusCode: 200,
        body,
      });
    });
    cy.get('[data-cy="submit-band-info"]').click();
  });

  it('Band logo can be updated', () => {
    cy.get('[data-cy="update-band-image"]').click();
    cy.get('[data-cy="modal-exit-button"]').click();
    cy.get('[data-cy="update-band-image"]').click();
    cy.get('[data-cy="file-upload-input"]').attachFile('avatar.png');
    cy.fixture('getAboutBandInfo.json').then((body) => {
      cy.intercept('PUT', `${Cypress.env('baseApiUrl')}band-imagegit `, {
        statusCode: 200,
        body,
      });
    });
    cy.get('[data-cy="save-uploaded-file"]').click();
  });
});
