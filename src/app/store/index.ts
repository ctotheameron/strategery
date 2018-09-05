import {
    Store, createStore, applyMiddleware, combineReducers, Middleware
} from 'redux';

import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import config from '../config';
import { Stage } from '../config/types';
import { diceReducer } from './dice/reducer';
import { DiceState } from './dice/types';
import { cardsReducer } from './cards/reducer';
import { CardsState } from './cards/types';


// The top-level state object
export interface ApplicationState {
    dice?: DiceState;
    cards?: CardsState;
}


// Whenever an action is dispatched, Redux will update each top-level
// application state property using the reducer with the matching name. It's
// important that the names match exactly, and that the reducer acts on the
// corresponding ApplicationState property type.
const rootReducer = combineReducers<ApplicationState>({
    dice: diceReducer,
    cards: cardsReducer
});


// Any middleware we create will be added here
const middleware: Middleware[] = [];

if (config.stage !== Stage.Production) {
    middleware.push(reduxLogger);
}


export function configureStore(
    initialState: ApplicationState
): Store<ApplicationState> {
    // We'll create our store with the combined reducers/sagas, and the initial
    // Redux state that we'll be passing from our entry point.
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...[reduxThunk, ...middleware])
    );

    return store;
}
