import { DiceRollRequest, DiceRollRequestIO } from '../dice';
import { decodeAsync } from '../util';


describe('decodeAsync', () => {
    test('should return value if decode succeeds', async () => {
        const rawRequest = { sides: 1, number: 1 };

        const diceRollRequest: DiceRollRequest = await decodeAsync(
            DiceRollRequestIO,
            rawRequest
        );

        expect(diceRollRequest).toMatchObject(rawRequest);
    });


    test('should reject if decode fails', async () => {
        const rawRequest = { sides: 1, number: -1 };

        expect(
            decodeAsync(DiceRollRequestIO, rawRequest)
        ).rejects.toBeTruthy();
    });
});
