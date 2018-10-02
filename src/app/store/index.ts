import { Store, applyMiddleware, createStore } from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import config, { Stage } from '../config';
import middleware from './middleware';
import reducers, { ApplicationState as State } from './reducers';


// The top-level state object
export type ApplicationState = State;


if (config.stage !== Stage.Production) {
    middleware.push(reduxLogger);
}


export function configureStore(
    initialState: ApplicationState | {}
): Store<ApplicationState> {
    // We'll create our store with the combined reducers/sagas, and the initial
    // Redux state that we'll be passing from our entry point.
    return createStore(
        reducers,
        initialState,
        applyMiddleware(...[reduxThunk, ...middleware])
    );
}
