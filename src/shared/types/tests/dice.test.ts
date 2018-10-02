import { DiceRollRequestIO } from '../dice';


describe('DiceRollRequestIO', () => {
    test('should allow positive integer sides and number', () => {
        expect(DiceRollRequestIO.is({ sides: 1, number: 1 })).toBe(true);
    });


    test('should disallow 0 sides or number', () => {
        expect(DiceRollRequestIO.is({ sides: 0, number: 1 })).toBe(false);
        expect(DiceRollRequestIO.is({ sides: 1, number: 0 })).toBe(false);
    });


    test('should disallow negative sides or number', () => {
        expect(DiceRollRequestIO.is({ sides: -1, number: 1 })).toBe(false);
        expect(DiceRollRequestIO.is({ sides: 1, number: -1 })).toBe(false);
    });


    test('should disallow non-integer sides or number', () => {
        expect(DiceRollRequestIO.is({ sides: 1.1, number: 1 })).toBe(false);
        expect(DiceRollRequestIO.is({ sides: '1', number: 1 })).toBe(false);
        expect(DiceRollRequestIO.is({ sides: [], number: 1 })).toBe(false);
        expect(DiceRollRequestIO.is({ sides: {}, number: 1 })).toBe(false);
        expect(DiceRollRequestIO.is({ sides: NaN, number: 1 })).toBe(false);

        expect(DiceRollRequestIO.is({
            sides: undefined, number: 1
        })).toBe(false);

        expect(DiceRollRequestIO.is({ sides: 1, number: 1.1 })).toBe(false);
        expect(DiceRollRequestIO.is({ sides: 1, number: '1' })).toBe(false);
        expect(DiceRollRequestIO.is({ sides: 1, number: [] })).toBe(false);
        expect(DiceRollRequestIO.is({ sides: 1, number: {} })).toBe(false);
        expect(DiceRollRequestIO.is({ sides: 1, number: NaN })).toBe(false);

        expect(DiceRollRequestIO.is({
            sides: 1, number: undefined
        })).toBe(false);
    });
});
