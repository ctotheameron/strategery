import { shuffle } from '../../service/cards';
import cardsRouter from '../cards';


jest.mock('../../service/cards', () => ({ shuffle: jest.fn() }));


beforeEach(jest.clearAllMocks);


describe('POST /cards/draw', () => {
    const routerLayer = cardsRouter.route('draw');
    const middlewares = routerLayer.stack.slice(0, -1);
    const controller = routerLayer.stack.slice(-1)[0] as (
        ctx:
        {
            body: {
                request: { number: number, decks: number }, cards: number[]
            } | undefined,
            throw: typeof jest.fn | undefined
        }
    ) => void;


    test('has correct path', () => {
        expect(routerLayer.path).toBe('/cards/draw');
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
        const body = { number: 1, decks: 2 };
        const ctx = { request: { body }, body: undefined, throw: undefined };
        const cards = ['a', 'b', 'c'];

        (shuffle as jest.Mock).mockReturnValueOnce(Promise.resolve(cards));

        await controller(ctx);
        expect(ctx.body).toMatchObject({ cards: ['a'], request: body });
    });


    test('throws 400 if number < 1', async () => {
        const body = { number: 0, decks: 2 };
        const mockThrow = jest.fn();
        const ctx = { request: { body }, body: undefined, throw: mockThrow };
        await controller(ctx);
        expect(ctx.throw).toBeCalledWith(400, expect.any(String));
    });


    test('throws 400 if decks < 1', async () => {
        const body = { number: 2, decks: 0 };
        const mockThrow = jest.fn();
        const ctx = { request: { body }, body: undefined, throw: mockThrow };
        await controller(ctx);
        expect(ctx.throw).toBeCalledWith(400, expect.any(String));
    });
});
