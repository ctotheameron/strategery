import api from '../api';
import { draw } from '../service';


jest.mock('../api');
api.post = jest.fn();


beforeEach(jest.clearAllMocks);


describe('draw', () => {
    test('should proxy api call and return CardsDraw response', async () => {
        const request = { number: 2, decks: 5 };
        const data = { request, cards: ['a', 'b'] };
        (api.post as jest.Mock).mockReturnValueOnce(Promise.resolve({ data }));
        expect(await draw(request)).toBe(data);
        expect(api.post).toBeCalledWith('/draw', request);
    });


    test('should throw error with response message if api errors', async () => {
        const request = { number: 2, decks: 5 };
        const data = 'error';
        const response = { data };

        (api.post as jest.Mock).mockReturnValueOnce(
            Promise.reject({ response })
        );

        await expect(draw(request)).rejects.toThrow(data);
        expect(api.post).toBeCalledWith('/draw', request);
    });


    test('should throw with default message if unknown error', async () => {
        const request = { number: 2, decks: 5 };

        (api.post as jest.Mock).mockReturnValueOnce(
            Promise.reject({ response: {} })
        );

        await expect(draw(request)).rejects.toThrow('Uh oh!');
        expect(api.post).toBeCalledWith('/draw', request);
    });


    test('should throw with default message if non api error', async () => {
        const request = { number: 2, decks: 5 };

        (api.post as jest.Mock).mockReturnValueOnce(
            Promise.reject(new Error())
        );

        await expect(draw(request)).rejects.toThrow('Uh oh!');
        expect(api.post).toBeCalledWith('/draw', request);
    });
});
