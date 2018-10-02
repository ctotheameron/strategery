import { Reducer } from 'redux';
import { DiceAction, DiceActionType, DiceState } from './types';


// Type-safe initialState!
const initial: DiceState = {
    isLoading: false,
    current: undefined,
    history: [],
    error: undefined
};


// Thanks to Redux 4's much simpler typings, we can take away a lot of typings
// on the reducer side, everything will remain type-safe.
const reducer: Reducer<DiceState, DiceAction> = (state = initial, action) => {
    switch (action.type) {

    case DiceActionType.ROLL_REQUEST: {
        return {
            ...state,
            isLoading: true,
            current: undefined,
            history: state.current
                ? [state.current, ...state.history]
                : state.history
        };
    }

    case DiceActionType.ROLL_SUCCESS: {
        return {
            ...state,
            isLoading: false,
            current: action.payload,
            error: undefined
        };
    }

    case DiceActionType.ROLL_ERROR: {
        return {
            ...state,
            isLoading: false,
            error: action.payload,
            current: undefined
        };
    }

    default: {
        return state;
    }}
};


// Instead of using default export, we use named exports. That way we can group
// these exports inside the `index.js` folder.
export { reducer as diceReducer };
