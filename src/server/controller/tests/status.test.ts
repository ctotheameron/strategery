import statusRouter from '../status';


beforeEach(jest.clearAllMocks);


describe('GET /status', () => {
    const routerLayer = statusRouter.route('status');
    const middlewares = routerLayer.stack.slice(0, -1);
    const controller = routerLayer.stack.slice(-1)[0] as (
        ctx:
        {
            body: {
                status: string,
                deployedVersion: string,
                notes: string[]
            } | undefined,
            throw: typeof jest.fn | undefined
        }
    ) => void;


    test('has correct path', () => {
        expect(routerLayer.path).toBe('/status');
    });


    test('supports GET', () => {
        expect(routerLayer.methods).toMatchObject(
            expect.arrayContaining(['GET'])
        );
    });


    test('uses no middleware', () => {
        expect(middlewares).toHaveLength(0);
    });


    test('returns status response', async () => {
        process.env.DEPLOYED_VERSION = '1.0.0';
        const ctx = { body: undefined, throw: undefined };

        await controller(ctx);

        expect(ctx.body).toMatchObject({
            status: 'OK',
            deployedVersion: '1.0.0',
            notes: []
        });
    });
});
