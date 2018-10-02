describe('Dice Integration Test', () => {
    it('successfully loads', () => {
        cy.visit('/');
        cy.get('a[href="/dice"]').click();

        cy.location().should(loc => expect(loc.pathname).to.eq('/dice'));

        cy.getRollResult().should('be.empty');
        cy.getRollHistory().should('be.empty');

        cy.rollDice();

        cy.getRollResult().should('not.be.empty');
        cy.getRollHistory().should('be.empty');

        cy.rollDice();

        cy.getRollResult().should('not.be.empty');
        cy.getRollHistory().children().should('have.length', 1);
    });
});
