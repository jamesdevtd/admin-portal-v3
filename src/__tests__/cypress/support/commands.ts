/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

// ***********************************************
// This commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// ***********************************************
// Begin Specific Selector Attributes for Cypress
// ***********************************************

// Login
export const usernameLoginSelector = '[id="username"]';
export const passwordLoginSelector = '[id="password"]';

// Signup


// ***********************************************
// End Specific Selector Attributes for Cypress
// ***********************************************

export const classInvalid = 'is-invalid';

export const classValid = 'is-valid';

Cypress.Commands.add('clickOnLoginItem', () => {
  return cy.get('[href="/login"]').click();
});

Cypress.Commands.add('authenticatedRequest', (data: any) => {
  const bearerToken = JSON.parse(sessionStorage.getItem(Cypress.env('jwtStorageName')));
  return cy.request({
    ...data,
    auth: {
      bearer: bearerToken,
    },
  });
});

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.session(
    [username, password],
    () => {
      cy.request({
        method: 'GET',
        url: '/api/account',
        failOnStatusCode: false,
      });
      cy.authenticatedRequest({
        method: 'POST',
        body: { username, password },
        url: Cypress.env('authenticationUrl'),
      }).then(({ body: { id_token } }) => {
        sessionStorage.setItem(Cypress.env('jwtStorageName'), JSON.stringify(id_token));
      });
    },
    {
      validate() {
        cy.authenticatedRequest({ url: '/api/account' }).its('status').should('eq', 200);
      },
    }
  );
});

declare global {
  namespace Cypress {
    interface Chainable {
      clickOnLoginItem(): Cypress.Chainable;
      login(username: string, password: string): Cypress.Chainable;
      authenticatedRequest(data: any): Cypress.Chainable;
    }
  }
}

import 'cypress-audit/commands';
// Convert this to a module instead of script (allows import/export)
export {};
