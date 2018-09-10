let mockCustomTransactionName: ((method: string, path: string[]) => string);

jest.mock('koa-newrelic', () => jest.fn((newRelic, options) => {
    mockCustomTransactionName = options.customTransactionName;
    return () => ({});
}));

jest.mock('newrelic', () => 'newRelic');

let mockKoas: MockKoa[] = [];

class MockKoa {
    public use = jest.fn();

    public listen = jest.fn((_, cb) => {
        cb();
    });

    constructor() {
        mockKoas.push(this);
    }
}

jest.mock('koa', () => MockKoa);


beforeEach(() => {
    jest.clearAllMocks();
    mockKoas = [];
});


test('should use koaNewrelic if configured', () => {
    jest.resetModules();

    jest.mock('../config', () => {
        return { default: { instrumentForNewrelic: true } };
    });

    /* tslint:disable no-var-requires */
    const configureKoaNewrelic = require('koa-newrelic');
    /* tslint:enable no-var-requires */

    require('../');

    expect(configureKoaNewrelic).toBeCalled();
    expect(mockCustomTransactionName('method', ['a', 'b'])).toBe('b (method)');
});


test('should not use koaNewrelic if not configured', () => {
    jest.resetModules();

    jest.mock('../config', () => {
        return { default: { instrumentForNewrelic: false } };
    });

    /* tslint:disable no-var-requires */
    const configureKoaNewrelic = require('koa-newrelic');
    /* tslint:enable no-var-requires */

    require('../');

    expect(configureKoaNewrelic).not.toBeCalled();
});


test('should listen on port 4000 by default', () => {
    jest.resetModules();
    require('../');
    expect(mockKoas[0].listen).toBeCalledWith('4000', expect.any(Function));
});


test('should listen on env.PORT', () => {
    jest.resetModules();
    process.env.PORT = '5000';
    require('../');
    expect(mockKoas[0].listen).toBeCalledWith('5000', expect.any(Function));
});
