import { combineReducers } from 'redux';

import { diceReducer } from '../dice/reducer';
import { cardsReducer } from '../cards/reducer';
import reducers from '../reducers';


jest.mock('redux', () => {
    return {
        combineReducers: (arg: object) => (
            `${Object.keys(arg)}${Object.values(arg)}`
        )
    };
});


jest.mock('../dice/reducer', () => ({ diceReducer: 'diceReducer' }));
jest.mock('../cards/reducer', () => ({ cardsReducer: 'cardsReducer' }));


test('should export a root reducer combined from all reducers', () => {
    expect(reducers).toBe(combineReducers({
        dice: diceReducer,
        cards: cardsReducer
    }));
});
