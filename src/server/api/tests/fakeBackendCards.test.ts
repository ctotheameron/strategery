import { getCards, shuffleCards } from '../fakeBackendCards';


Math.random = jest.fn(() => 0.5);


describe('getCards', () => {
    test('should return x full decks', async () => {
        const number = 5;
        expect(await getCards(number)).toHaveLength(52 * number);
    });


    test('should return 0 cards if 0 decks', async () => {
        expect(await getCards(0)).toHaveLength(0);
    });


    test('should throw an error if invalid number of decks', async () => {
        await expect(getCards(-1)).rejects.toThrow();
        await expect(getCards(NaN)).rejects.toThrow();
    });
});


describe('shuffleCards', () => {
    test('should shuffle the passed-in cards', async () => {
        const cards = ['a', 'b', 'c'];
        expect(await shuffleCards(cards)).toMatchObject(['a', 'c', 'b']);
    });
});
