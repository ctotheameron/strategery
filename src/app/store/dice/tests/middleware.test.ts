import { rollRequest } from '../actions';
import { diceMiddleware } from '../middleware';
import { makeRemoteRoll } from '../thunks';


jest.mock('../thunks', () => ({
    makeRemoteRoll: jest.fn(request => `makeRemoteRoll${request}`)
}));


const dispatch = jest.fn();
const getState = jest.fn(() => ({}));
const next = jest.fn();


beforeEach(jest.clearAllMocks);


describe('CardsActionType.DRAW_REQUEST', () => {
    test('should dispatch makeRemoteDraw thunk', () => {
        const request = { number: 1, sides: 1 };
        const action = rollRequest(request);
        diceMiddleware({ dispatch, getState })(next)(action);
        expect(dispatch).toBeCalledWith(makeRemoteRoll(request));
        expect(next).toBeCalledWith(action);
    });
});


describe('default', () => {
    test('should call next', () => {
        const action = { type: 'FOO', payload: 'bar' };
        diceMiddleware({ dispatch, getState })(next)(action);
        expect(dispatch).not.toBeCalled();
        expect(next).toBeCalledWith(action);
    });
});
