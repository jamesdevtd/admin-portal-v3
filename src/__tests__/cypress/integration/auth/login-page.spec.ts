import {
  passwordLoginSelector,
  usernameLoginSelector,
} from '../../support/commands';

describe('login', () => {
  const username = Cypress.env('E2E_USERNAME') ?? 'test@test.test';
  const password = Cypress.env('E2E_PASSWORD') ?? 'password';

  beforeEach(() => {
    cy.visit('/login');
    cy.clickOnLoginItem();
  });

  beforeEach(() => {
    cy.intercept('POST', 'localhost:8080/api/login').as('login');
  });

  it('shows login page', () => {
    cy.get('[cy-marker="page-title"]').contains('TagX Affiliate Log In').should('be.visible');
  });

  it('requires username', () => {
    cy.get(passwordLoginSelector).type('a-password');
    cy.get('[type="submit"]').click();
    // login page should stay open when login fails
    cy.get('[cy-marker="page-title"]').contains('TagX Affiliate Log In').should('be.visible');
    cy.get('[cy-marker="form-input-error"]').contains('Email is required.').should('be.visible');
  });

  it('requires password', () => {
    cy.get(usernameLoginSelector).type('test@tagx.test');
    cy.get('[type="submit"]').click();
    // login page should stay open when login fails
    cy.get('[cy-marker="page-title"]').contains('TagX Affiliate Log In').should('be.visible');
    cy.get('[cy-marker="form-input-error"]').contains('Password is required.').should('be.visible');
  });

  it('errors when password is incorrect', () => {
    cy.get(usernameLoginSelector).type(username);
    cy.get(passwordLoginSelector).type('bad-password');
    cy.get('[type="submit"]').click();
    //cy.wait('@login').then(({ response }) => expect(response.statusCode).to.equal(401));
    cy.get('[cy-marker="login-errors"]').should('be.visible');
  });

  it('go to dashboard page when successfully logs in', () => {
    cy.get(usernameLoginSelector).type(username);
    cy.get(passwordLoginSelector).type(password);
    cy.get('[type="submit"]').click();
    //cy.wait('@login').then(({ response }) => expect(response.statusCode).to.equal(200));
    cy.location('pathname').should('eq', '/events');
  });
});
