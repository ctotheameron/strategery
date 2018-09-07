import { drawRequest } from '../actions';
import { cardsMiddleware } from '../middleware';
import { makeRemoteDraw } from '../thunks';


jest.mock('../thunks', () => ({
    makeRemoteDraw: jest.fn(request => `makeRemoteDraw${request}`)
}));


const dispatch = jest.fn();
const getState = jest.fn(() => ({}));
const next = jest.fn();


beforeEach(jest.clearAllMocks);


describe('CardsActionType.DRAW_REQUEST', () => {
    test('should dispatch makeRemoteDraw thunk', () => {
        const request = { number: 1, decks: 1 };
        const action = drawRequest(request);
        cardsMiddleware({ dispatch, getState })(next)(action);
        expect(dispatch).toBeCalledWith(makeRemoteDraw(request));
        expect(next).toBeCalledWith(action);
    });
});


describe('default', () => {
    test('should call next', () => {
        const action = { type: 'FOO', payload: 'bar' };
        cardsMiddleware({ dispatch, getState })(next)(action);
        expect(dispatch).not.toBeCalled();
        expect(next).toBeCalledWith(action);
    });
});
