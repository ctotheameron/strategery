import { cardsMiddleware } from '../cards/middleware';
import { diceMiddleware } from '../dice/middleware';
import middleware from '../middleware';


jest.mock('../dice/middleware', () => ({ diceMiddleware: 'diceMiddleware' }));

jest.mock('../cards/middleware', () => ({
    cardsMiddleware: 'cardsMiddleware'
}));


test('should export an array of all middleware', () => {
    expect(middleware).toMatchObject([diceMiddleware, cardsMiddleware]);
});
