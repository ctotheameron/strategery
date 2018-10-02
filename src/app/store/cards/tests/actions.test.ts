import { drawError, drawRequest, drawSuccess } from '../actions';
import { CardsActionType } from '../types';


describe('drawRequest', () => {
    test('should return a DRAW_REQUEST action', () => {
        const request = { number: 1, decks: 2 };
        const action = drawRequest(request);
        expect(action).toMatchObject({
            type: CardsActionType.DRAW_REQUEST,
            payload: request
        });
    });
});


describe('drawSuccess', () => {
    test('should return a DRAW_SUCCESS action', () => {
        const draw = { cards: ['a', 'b'], request: { number: 1, decks: 2 } };
        const action = drawSuccess(draw);
        expect(action).toMatchObject({
            type: CardsActionType.DRAW_SUCCESS,
            payload: draw
        });
    });
});


describe('drawError', () => {
    test('should return a DRAW_ERROR action', () => {
        const message = 'message';
        const action = drawError(message);
        expect(action).toMatchObject({
            type: CardsActionType.DRAW_ERROR,
            payload: message
        });
    });
});
