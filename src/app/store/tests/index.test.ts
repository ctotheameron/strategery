import { createStore, applyMiddleware, StoreEnhancer } from 'redux';

import reducers from '../reducers';
import { configureStore } from '../';


type mockApplyMiddlewareType = (...args: string[]) => StoreEnhancer<any, {}>;


jest.mock('redux', () => ({
    createStore: jest.fn((...args) => `createStore${JSON.stringify(args)}`),
    applyMiddleware: jest.fn((...args) =>
        `applyMiddleware${JSON.stringify(args)}`),
    combineReducers: jest.fn((...args) =>
        `combineReducers${JSON.stringify(args)}`)
}));

jest.mock('redux-thunk', () => ({ default: 'redux-thunk' }));
jest.mock('redux-logger', () => ({ default: 'redux-logger' }));

jest.mock('../middleware', () => ({ default: ['middleware'] }));
jest.mock('../reducers', () => ({ default: { root: 'reducer' } }));


beforeEach(jest.clearAllMocks);


test('configure store should setup the redux store with initial state', () => {
    const initialState = {
        dice: {
            isLoading: true,
            current: { sum: 2, rolls: [2], request: { number: 1, sides: 2 } },
            history: [{ sum: 4, rolls: [4], request: { number: 1, sides: 4 } }],
            error: 'error'
        },
        cards: {
            isLoading: true,
            current: { cards: ['a'], request: { number: 1, decks: 2 } },
            history: [{ cards: ['b'], request: { number: 1, decks: 4 } }],
            error: 'error'
        }
    };

    expect(configureStore(initialState)).toBe(
        createStore(
            reducers,
            initialState,
            (applyMiddleware as mockApplyMiddlewareType)(
                ...['redux-thunk', 'middleware', 'redux-logger']
            )
    ));
});


test('configure store shouldn\'t use reduxLogger if Stage.Production', () => {
    jest.resetModules();

    jest.mock('../../config', () => {
        return {
            default: {
                stage: 'production'
            },
            Stage: {
                Production: 'production'
            }
        };
    });

    const store = require('../');
    const res = store.configureStore({});

    expect(res).toBe(
        createStore(
            reducers,
            {},
            (applyMiddleware as mockApplyMiddlewareType)(
                ...['redux-thunk', 'middleware']
            )
        )
    );
});
