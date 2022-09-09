/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

describe('Band Members page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.login();
    cy.fixture('getMembers.json').then((body) => {
      cy.intercept('GET', `${Cypress.env('baseApiUrl')}band-members`, {
        statusCode: 200,
        body,
      });
    });
    cy.get('[data-cy="nav-members"]').click();
  });

  it('Pagination works', () => {
    cy.get('[data-cy="pagination-button-1"]').click();
    cy.get('[data-cy="pagination-button-0"]').click();
  });

  it('Member add input validations work', () => {
    cy.get('[data-cy="add-member"]').click();
    cy.get('[data-cy="add-member-button"]').click();
    cy.get('#color').invoke('val', '#ff0000').trigger('change');
    cy.get('[data-cy="add-member-button"]').click();
  });

  it('New member can be added', () => {
    cy.get('[data-cy="add-member"]').click();
    cy.get('#name').type('ხვიჩა');
    cy.get('#instrument').type('გიტარა');
    cy.get('#orbitWidth').type('100');
    cy.get('#color').type('#FFFFFF');
    cy.get('#bio').type('ბიოგრაფია');
    cy.fixture('bandMember.json').then((body) => {
      cy.intercept('POST', `${Cypress.env('baseApiUrl')}band-member`, {
        statusCode: 200,
        body,
      });
    });
    cy.get('[data-cy="add-member-button"]').click();
  });

  it('Add member input values get saved', () => {
    cy.get('[data-cy="add-member"]').click();
    cy.get('#name').type('ხვიჩა');
    cy.get('#instrument').type('გიტარა');
    cy.get('#orbitWidth').type('100');
    cy.get('#color').type('#FFFFFF');
    cy.get('#bio').type('ბიოგრაფია');
    cy.get('[data-cy="go-back"]').click();
    cy.get('[data-cy="add-member"]').click();
    cy.fixture('bandMember.json').then((body) => {
      cy.intercept('POST', `${Cypress.env('baseApiUrl')}band-member`, {
        statusCode: 200,
        body,
      });
    });
    cy.get('[data-cy="add-member-button"]').click();
    cy.get('[data-cy="add-member"]').click();
  });

  it('Member can be edited', () => {
    cy.fixture('bandMember.json').then((body) => {
      cy.intercept('GET', `${Cypress.env('baseApiUrl')}band-member/1`, {
        statusCode: 200,
        body,
      });
    });
    cy.get('[data-cy="member-1-edit-button"]').click();
    cy.get('#name').type('იკო');
    cy.fixture('bandMember.json').then((body) => {
      cy.intercept('PUT', `${Cypress.env('baseApiUrl')}band-member/1`, {
        statusCode: 200,
        body,
      });
    });
    cy.get('[data-cy="add-member-button"]').click();
  });

  it('Member detailed info can be viewed', () => {
    cy.get('[data-cy="member-2-view-button"]').click();
    cy.get('[data-cy="modal-exit-button"]').click();
  });

  it('Member can be deleted', () => {
    cy.get('[data-cy="pagination-button-1"]').click();
    cy.fixture('bandMember.json').then((body) => {
      cy.intercept('DELETE', `${Cypress.env('baseApiUrl')}band-member/4`, {
        statusCode: 200,
        body,
      });
    });
    cy.fixture('reducedMembers.json')
      .then((body) => {
        cy.intercept('GET', `${Cypress.env('baseApiUrl')}band-members`, {
          statusCode: 200,
          body,
        });
      })
      .as('call');
    cy.get('[data-cy="member-4-delete-button"]').click();
    cy.wait('@call');
  });

  it('Member avatar can be updated', () => {
    cy.get('[data-cy="avatar-2-update-button"]').click();
    cy.get('[data-cy="modal-exit-button"]').click();
    cy.get('[data-cy="avatar-1-update-button"]').click();
    cy.get('[data-cy="file-upload-input"]').attachFile('avatar.png');
    cy.fixture('bandMember.json')
      .then((body) => {
        cy.intercept(
          'PUT',
          `${Cypress.env('baseApiUrl')}band-member/avatar/1`,
          {
            statusCode: 200,
            body,
          }
        );
      })
      .as('req');
    cy.get('[data-cy="save-uploaded-file"]').click();
    cy.wait('@req');
  });
});
