import { rollDie } from '../fackeBackendDice';


Math.random = jest.fn(() => 0.5);


describe('rollDie', () => {
    test('should return a random number between 1 and n', async () => {
        expect(await rollDie(5)).toBe(3);
        expect(await rollDie(1)).toBe(1);
        expect(await rollDie(100)).toBe(51);
    });


    test('should throw if invalid number of sides', async () => {
        await expect(rollDie(0)).rejects.toThrow();
        await expect(rollDie(-1)).rejects.toThrow();
        await expect(rollDie(NaN)).rejects.toThrow();
    });
});
