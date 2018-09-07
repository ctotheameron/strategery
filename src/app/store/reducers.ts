import { combineReducers } from 'redux';

import { cardsReducer } from './cards/reducer';
import { diceReducer } from './dice/reducer';
import { DiceState } from './dice/types';
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
export default combineReducers<ApplicationState>({
    dice: diceReducer,
    cards: cardsReducer
});
