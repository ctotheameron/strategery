import { rollError, rollRequest, rollSuccess } from '../actions';
import { DiceAction, DiceState } from '../types';

import { diceReducer } from '../reducer';


describe('CardsActionType.DRAW_REQUEST', () => {
    test('should set isLoading to true', () => {
        const state: DiceState = { isLoading: false, history: [] };
        const action = rollRequest({ number: 1, sides: 2 });
        expect(diceReducer(state, action)).toMatchObject({ isLoading: true });
    });


    test('should set current to undefined', () => {
        const state: DiceState = {
            isLoading: false,
            history: [],
            current: { request: { number: 1, sides: 2 }, sum: 2, rolls: [2] }
        };

        const action = rollRequest({ number: 1, sides: 3 });
        expect(diceReducer(state, action)).toMatchObject({
            current: undefined
        });
    });


    test('should add current to history if present', () => {
        const state: DiceState = {
            isLoading: false,
            history: [
                { request: { number: 2, sides: 3 }, sum: 6, rolls: [3, 3] }
            ],
            current: { request: { number: 1, sides: 2 }, sum: 2, rolls: [2] }
        };

        const action = rollRequest({ number: 1, sides: 3 });
        expect(diceReducer(state, action)).toMatchObject({
            history: [state.current, ...state.history]
        });
    });


    test('should not modify history if no prior current', () => {
        const state: DiceState = {
            isLoading: false,
            history: [{ request: { number: 1, sides: 2 }, sum: 2, rolls: [2] }]
        };

        const action = rollRequest({ number: 1, sides: 3 });
        expect(diceReducer(state, action)).toMatchObject({ history });
    });
});


describe('CardsActionType.DRAW_SUCCESS', () => {
    test('should update current', () => {
        const state: DiceState = { isLoading: false, history: [] };

        const success = {
            request: { number: 1, sides: 2 }, sum: 2, rolls: [2]
        };

        const action = rollSuccess(success);

        expect(diceReducer(state, action)).toMatchObject({
            current: success
        });
    });


    test('should set error to undefined', () => {
        const state: DiceState = { isLoading: false, history: [], error: 'a' };

        const success = {
            request: { number: 1, sides: 2 }, sum: 2, rolls: [2]
        };

        const action = rollSuccess(success);
        expect(diceReducer(state, action)).toMatchObject({ error: undefined });
    });


    test('should set isLoading to false', () => {
        const state: DiceState = { isLoading: true, history: [] };

        const success = {
            request: { number: 1, sides: 2 }, sum: 2, rolls: [2]
        };

        const action = rollSuccess(success);
        expect(diceReducer(state, action)).toMatchObject({ isLoading: false });
    });
});


describe('CardsActionType.DRAW_ERROR', () => {
    test('should update error', () => {
        const state: DiceState = { isLoading: false, history: [] };
        const message = 'message';
        const action = rollError(message);
        expect(diceReducer(state, action)).toMatchObject({ error: message });
    });


    test('should set current to undefined', () => {
        const state: DiceState = {
            isLoading: false,
            history: [],
            current: { request: { number: 1, sides: 2 }, sum: 2, rolls: [2] }
        };

        const message = 'message';
        const action = rollError(message);

        expect(diceReducer(state, action)).toMatchObject({
            current: undefined
        });
    });


    test('should set isLoading to false', () => {
        const state: DiceState = { isLoading: true, history: [] };
        const message = 'message';
        const action = rollError(message);
        expect(diceReducer(state, action)).toMatchObject({ isLoading: false });
    });

});


describe('default', () => {
    test('should return initialState', () => {
        const action = { type: 'foo', payload: 'bar' };

        expect(diceReducer(undefined, action as DiceAction)).toMatchObject({
            isLoading: false,
            current: undefined,
            history: [],
            error: undefined
        });
    });
});
