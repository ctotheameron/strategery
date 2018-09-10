import { shuffle } from '../cards';
import { getCards, shuffleCards } from '../../api/fakeBackendCards';


jest.mock('../../api/fakeBackendCards', () => {
    return {
        getCards: jest.fn(decks => `getCards(${decks})`),
        shuffleCards: jest.fn(cards => `shuffleCards(${cards})`)
    };
});


describe('shuffle', () => {
    test('should return a shuffled array of n decks', async () => {
        const decks = 5;
        expect(await shuffle(decks)).toBe(shuffleCards(await getCards(decks)));
    });
});
