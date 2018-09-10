import { makeRemoteRoll } from '../thunks';
import { rollSuccess, rollError } from '../actions';
import { roll } from '../service';


jest.mock('../service', () => ({ roll: jest.fn() }));


const dispatch = jest.fn();


beforeEach(jest.clearAllMocks);


describe('makeRemoteRoll', () => {
    test('should proxy roll and dispatch rollSuccess', async () => {
        const request = { number: 1, sides: 2 };
        const response = { request, sum: 2, rolls: [2] };
        (roll as jest.Mock).mockReturnValueOnce(Promise.resolve(response));
        await makeRemoteRoll(request)(dispatch, () => undefined, undefined);
        expect(dispatch).toBeCalledWith(rollSuccess(response));
    });


    test('should dispatch rollError if roll fails', async () => {
        const request = { number: 1, sides: 2 };
        const message = 'message';
        const error = { message };
        (roll as jest.Mock).mockReturnValueOnce(Promise.reject(error));
        await makeRemoteRoll(request)(dispatch, () => undefined, undefined);
        expect(dispatch).toBeCalledWith(rollError(message));
    });
});
