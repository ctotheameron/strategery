import { CardsDrawRequestIO } from '../cards';


describe('CardsDrawRequestIO', () => {
    test('should allow positive integer decks and number', () => {
        expect(CardsDrawRequestIO.is({ decks: 1, number: 1 })).toBe(true);
    });


    test('should disallow 0 decks or number', () => {
        expect(CardsDrawRequestIO.is({ decks: 0, number: 1 })).toBe(false);
        expect(CardsDrawRequestIO.is({ decks: 1, number: 0 })).toBe(false);
    });


    test('should disallow negative decks or number', () => {
        expect(CardsDrawRequestIO.is({ decks: -1, number: 1 })).toBe(false);
        expect(CardsDrawRequestIO.is({ decks: 1, number: -1 })).toBe(false);
    });


    test('should disallow non-integer decks or number', () => {
        expect(CardsDrawRequestIO.is({ decks: 1.1, number: 1 })).toBe(false);
        expect(CardsDrawRequestIO.is({ decks: '1', number: 1 })).toBe(false);
        expect(CardsDrawRequestIO.is({ decks: [], number: 1 })).toBe(false);
        expect(CardsDrawRequestIO.is({ decks: {}, number: 1 })).toBe(false);
        expect(CardsDrawRequestIO.is({ decks: NaN, number: 1 })).toBe(false);

        expect(CardsDrawRequestIO.is({
            decks: undefined, number: 1
        })).toBe(false);

        expect(CardsDrawRequestIO.is({ decks: 1, number: 1.1 })).toBe(false);
        expect(CardsDrawRequestIO.is({ decks: 1, number: '1' })).toBe(false);
        expect(CardsDrawRequestIO.is({ decks: 1, number: [] })).toBe(false);
        expect(CardsDrawRequestIO.is({ decks: 1, number: {} })).toBe(false);
        expect(CardsDrawRequestIO.is({ decks: 1, number: NaN })).toBe(false);

        expect(CardsDrawRequestIO.is({
            decks: 1, number: undefined
        })).toBe(false);
    });
});
