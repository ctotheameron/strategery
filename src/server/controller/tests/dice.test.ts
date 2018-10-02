import { roll } from '../../service/dice';
import diceRouter from '../dice';


jest.mock('../../service/dice', () => ({ roll: jest.fn() }));


beforeEach(jest.clearAllMocks);


describe('POST /dice/roll', () => {
    const routerLayer = diceRouter.route('roll');
    const middlewares = routerLayer.stack.slice(0, -1);
    const controller = routerLayer.stack.slice(-1)[0] as (
        ctx:
        {
            body: {
                request: { number: number, decks: number }, dice: number[]
            } | undefined,
            throw: typeof jest.fn | undefined
        }
    ) => void;


    test('has correct path', () => {
        expect(routerLayer.path).toBe('/dice/roll');
    });


    test('supports POST', () => {
        expect(routerLayer.methods).toMatchObject(
            expect.arrayContaining(['POST'])
        );
    });


    test('uses no middleware', () => {
        expect(middlewares).toHaveLength(0);
    });


    test('returns response if valid request is made', async () => {
        const body = { number: 1, sides: 2 };
        const ctx = { request: { body }, body: undefined, throw: undefined };
        const rolls = [1];

        (roll as jest.Mock).mockReturnValueOnce(Promise.resolve(rolls));

        await controller(ctx);
        expect(ctx.body).toMatchObject({ rolls, sum: 1, request: body });
    });


    test('throws 400 if number < 1', async () => {
        const body = { number: 0, sides: 2 };
        const mockThrow = jest.fn();
        const ctx = { request: { body }, body: undefined, throw: mockThrow };

        await controller(ctx);
        expect(ctx.throw).toBeCalledWith(400, expect.any(Error));
        expect(ctx.body).toBe(undefined);
    });


    test('throws 400 if sides < 1', async () => {
        const body = { number: 2, sides: 0 };
        const mockThrow = jest.fn();
        const ctx = { request: { body }, body: undefined, throw: mockThrow };

        await controller(ctx);
        expect(ctx.throw).toBeCalledWith(400, expect.any(Error));
        expect(ctx.body).toBe(undefined);
    });
});
