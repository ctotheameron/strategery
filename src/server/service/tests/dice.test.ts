import { rollDie } from '../../api/fackeBackendDice';
import { roll } from '../dice';


jest.mock('../../api/fackeBackendDice', () => {
    return { rollDie: jest.fn(sides => sides) };
});


describe('roll', () => {
    test('should return an array of individual rolls', async () => {
        const sides = 5;
        const number = 3;
        const rolls = await roll({ sides, number });
        expect(rolls).toHaveLength(number);
        rolls.forEach(r => expect(r).toBe(rollDie(sides)));
    });
});
