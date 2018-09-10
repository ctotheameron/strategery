import { CardsState, CardsAction } from '../types';
import { cardsReducer } from '../reducer';
import { drawRequest, drawSuccess, drawError } from '../actions';


describe('CardsActionType.DRAW_REQUEST', () => {
    test('should set isLoading to true', () => {
        const state: CardsState = { isLoading: false, history: [] };
        const action = drawRequest({ number: 1, decks: 2 });
        expect(cardsReducer(state, action)).toMatchObject({ isLoading: true });
    });


    test('should set current to undefined', () => {
        const state: CardsState = {
            isLoading: false,
            history: [],
            current: { request: { number: 1, decks: 2 }, cards: ['a'] }
        };

        const action = drawRequest({ number: 1, decks: 3 });
        expect(cardsReducer(state, action)).toMatchObject({
            current: undefined
        });
    });


    test('should add current to history if present', () => {
        const state: CardsState = {
            isLoading: false,
            history: [{ request: { number: 2, decks: 3 }, cards: ['a', 'b'] }],
            current: { request: { number: 1, decks: 2 }, cards: ['c'] }
        };

        const action = drawRequest({ number: 1, decks: 3 });
        expect(cardsReducer(state, action)).toMatchObject({
            history: [state.current, ...state.history]
        });
    });


    test('should not modify history if no prior current', () => {
        const state: CardsState = {
            isLoading: false,
            history: [{ request: { number: 2, decks: 3 }, cards: ['a', 'b'] }]
        };

        const action = drawRequest({ number: 1, decks: 3 });
        expect(cardsReducer(state, action)).toMatchObject({ history });
    });
});


describe('CardsActionType.DRAW_SUCCESS', () => {
    test('should update current', () => {
        const state: CardsState = { isLoading: false, history: [] };
        const success = { request: { number: 1, decks: 2 }, cards: ['c'] };
        const action = drawSuccess(success);

        expect(cardsReducer(state, action)).toMatchObject({
            current: success
        });
    });


    test('should set error to undefined', () => {
        const state: CardsState = { isLoading: false, history: [], error: 'a' };
        const success = { request: { number: 1, decks: 2 }, cards: ['c'] };
        const action = drawSuccess(success);
        expect(cardsReducer(state, action)).toMatchObject({ error: undefined });
    });


    test('should set isLoading to false', () => {
        const state: CardsState = { isLoading: true, history: [] };
        const success = { request: { number: 1, decks: 2 }, cards: ['c'] };
        const action = drawSuccess(success);
        expect(cardsReducer(state, action)).toMatchObject({ isLoading: false });
    });
});


describe('CardsActionType.DRAW_ERROR', () => {
    test('should update error', () => {
        const state: CardsState = { isLoading: false, history: [] };
        const message = 'message';
        const action = drawError(message);
        expect(cardsReducer(state, action)).toMatchObject({ error: message });
    });


    test('should set current to undefined', () => {
        const state: CardsState = {
            isLoading: false,
            history: [],
            current: { request: { number: 1, decks: 2 }, cards: ['c'] }
        };

        const message = 'message';
        const action = drawError(message);

        expect(cardsReducer(state, action)).toMatchObject({
            current: undefined
        });
    });


    test('should set isLoading to false', () => {
        const state: CardsState = { isLoading: true, history: [] };
        const message = 'message';
        const action = drawError(message);
        expect(cardsReducer(state, action)).toMatchObject({ isLoading: false });
    });

});


describe('default', () => {
    test('should return initialState', () => {
        const action = { type: 'foo', payload: 'bar' };

        expect(cardsReducer(undefined, action as CardsAction)).toMatchObject({
            isLoading: false,
            current: undefined,
            history: [],
            error: undefined
        });
    });
});
