import { rollRequest, rollSuccess, rollError } from '../actions';
import { DiceActionType } from '../types';


describe('rollRequest', () => {
    test('should return a ROLL_REQUEST action', () => {
        const request = { number: 1, sides: 2 };
        const action = rollRequest(request);
        expect(action).toMatchObject({
            type: DiceActionType.ROLL_REQUEST,
            payload: request
        });
    });
});


describe('rollSuccess', () => {
    test('should return a ROLL_SUCCESS action', () => {
        const roll = { sum: 2, rolls: [2], request: { number: 1, sides: 2 } };
        const action = rollSuccess(roll);
        expect(action).toMatchObject({
            type: DiceActionType.ROLL_SUCCESS,
            payload: roll
        });
    });
});


describe('rollError', () => {
    test('should return a ROLL_ERROR action', () => {
        const message = 'message';
        const action = rollError(message);
        expect(action).toMatchObject({
            type: DiceActionType.ROLL_ERROR,
            payload: message
        });
    });
});
