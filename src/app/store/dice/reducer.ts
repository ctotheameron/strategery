import { Reducer } from 'redux';
import { DiceActionType, DiceState } from './types';


// Type-safe initialState!
const initialState: DiceState = {
    isLoading: false,
    current: undefined,
    history: [],
    error: undefined
};


// Thanks to Redux 4's much simpler typings, we can take away a lot of typings
// on the reducer side, everything will remain type-safe.
const reducer: Reducer<DiceState> = (state = initialState, action) => {
    switch (action.type) {

    case DiceActionType.IS_LOADING: {
        return {
            ...state,
            isLoading: action.payload,
            current: action.payload ? undefined : state.current,
            history: action.payload && state.current
                ? [state.current, ...state.history]
                : state.history
        };
    }

    case DiceActionType.ROLL_SUCCESS: {
        return {
            ...state,
            current: action.payload,
            error: undefined
        };
    }

    case DiceActionType.ROLL_ERROR: {
        return {
            ...state,
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
