describe('Cards Integration Test', () => {
    it('successfully loads', () => {
        cy.visit('/');
        cy.get('a[href="/cards"]').click();
        cy.location().should(loc => expect(loc.pathname).to.eq('/cards'));
        cy.get('h2').should(h2 => expect(h2).to.contain('Cards'));
    });


    it('draws the right number of cards', () => {
        cy.visit('/');
        cy.get('a[href="/cards"]').click();
        cy.get('#number-input').clear().type('5{del}');
        cy.drawCards();
        cy.getDrawResult().should((result) => {
            const text = result.get(0).innerText;
            expect(text).to.match(/(((\d{1,2})|[JQKA])(♦︎|♠︎|♣︎|♥︎)(, )?){5}/);
            expect(text).to.contain('draw 5 from 1 deck(s)');
        });
    });


    it('pushes history on subsequent draw', () => {
        cy.visit('/');
        cy.get('a[href="/cards"]').click();
        cy.get('#number-input').clear().type('5{del}');
        cy.drawCards();
        cy.getDrawHistory().should('be.empty');
        cy.drawCards();
        cy.getDrawHistory().children().first().should((history) => {
            const text = history.get(0).innerText;
            expect(text).to.match(/(((\d{1,2})|[JQKA])(♦︎|♠︎|♣︎|♥︎)(, )?){5}/);
            expect(text).to.contain('draw 5 from 1 deck(s)');
        });
    });


    it('errors if number is 0', () => {
        cy.visit('/');
        cy.get('a[href="/cards"]').click();
        cy.get('#number-input').clear().type('{backspace}');
        cy.drawCards();
        cy.getDrawResult().should((result) => {
            expect(result).to.contain('Error:');
        });
    });


    it('errors if decks is 0', () => {
        cy.visit('/');
        cy.get('a[href="/cards"]').click();
        cy.get('#decks-input').clear().type('{backspace}');
        cy.drawCards();
        cy.getDrawResult().should((result) => {
            expect(result).to.contain('Error:');
        });
    });
});
