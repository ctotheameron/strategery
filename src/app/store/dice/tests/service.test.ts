import api from '../api';
import { roll } from '../service';


jest.mock('../api');
api.post = jest.fn();


beforeEach(jest.clearAllMocks);


describe('roll', () => {
    test('should proxy api call and return CardsDraw response', async () => {
        const request = { number: 2, sides: 5 };
        const data = { request, sum: 10, rolls: [5, 5] };
        (api.post as jest.Mock).mockReturnValueOnce(Promise.resolve({ data }));
        expect(await roll(request)).toBe(data);
        expect(api.post).toBeCalledWith('/roll', request);
    });


    test('should throw error with response message if api errors', async () => {
        const request = { number: 2, sides: 5 };
        const data = 'error';
        const response = { data };

        (api.post as jest.Mock).mockReturnValueOnce(
            Promise.reject({ response })
        );

        await expect(roll(request)).rejects.toThrow(data);
        expect(api.post).toBeCalledWith('/roll', request);
    });


    test('should throw with default message if unknown error', async () => {
        const request = { number: 2, sides: 5 };

        (api.post as jest.Mock).mockReturnValueOnce(
            Promise.reject({ response: {} })
        );

        await expect(roll(request)).rejects.toThrow('Uh oh!');
        expect(api.post).toBeCalledWith('/roll', request);
    });


    test('should throw with default message if non api error', async () => {
        const request = { number: 2, sides: 5 };

        (api.post as jest.Mock).mockReturnValueOnce(
            Promise.reject(new Error())
        );

        await expect(roll(request)).rejects.toThrow('Uh oh!');
        expect(api.post).toBeCalledWith('/roll', request);
    });
});
