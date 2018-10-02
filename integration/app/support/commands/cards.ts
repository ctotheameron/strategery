// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add(
//     'drag',
//     { prevSubject: 'element'},
//     (subject, options) => { ... }
// )
//
//
// -- This is a dual command --
// Cypress.Commands.add(
//     'dismiss',
//     { prevSubject: 'optional'},
//     (subject, options) => { ... }
// )
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// see more example of adding custom commands to Cypress TS interface
// in https://github.com/cypress-io/add-cypress-custom-command-in-typescript
// add new command to the existing Cypress interface
// tslint:disable-next-line no-namespace
declare namespace Cypress {
    // tslint:disable-next-line interface-name
    interface Chainable {
        getDrawResult: typeof getDrawResult;
        getDrawHistory: typeof getDrawHistory;
        drawCards: typeof drawCards;
    }
}

// add some custom commands cy.getDrawResult() etc
function getDrawResult() {
    return cy.get('#draw-result');
}


function getDrawHistory() {
    return cy.get('#draw-history');
}


function drawCards() {
    return cy.get('button').click();
}

Cypress.Commands.add('getDrawResult', getDrawResult);
Cypress.Commands.add('getDrawHistory', getDrawHistory);
Cypress.Commands.add('drawCards', drawCards);
