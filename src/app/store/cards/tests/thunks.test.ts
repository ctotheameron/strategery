import { makeRemoteDraw } from '../thunks';
import { drawSuccess, drawError } from '../actions';
import { draw } from '../service';


jest.mock('../service', () => ({ draw: jest.fn() }));


const dispatch = jest.fn();


beforeEach(jest.clearAllMocks);


describe('makeRemoteDraw', () => {
    test('should proxy draw and dispatch drawSuccess', async () => {
        const request = { number: 1, decks: 2 };
        const response = { request, cards: ['a'] };
        (draw as jest.Mock).mockReturnValueOnce(Promise.resolve(response));
        await makeRemoteDraw(request)(dispatch, () => undefined, undefined);
        expect(dispatch).toBeCalledWith(drawSuccess(response));
    });


    test('should dispatch drawError if draw fails', async () => {
        const request = { number: 1, decks: 2 };
        const message = 'message';
        const error = { message };
        (draw as jest.Mock).mockReturnValueOnce(Promise.reject(error));
        await makeRemoteDraw(request)(dispatch, () => undefined, undefined);
        expect(dispatch).toBeCalledWith(drawError(message));
    });
});
