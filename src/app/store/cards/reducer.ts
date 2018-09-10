import { Reducer } from 'redux';
import { CardsActionType, CardsState, CardsAction } from './types';


// Type-safe initialState!
const initial: CardsState = {
    isLoading: false,
    current: undefined,
    history: [],
    error: undefined
};


// Thanks to Redux 4's much simpler typings, we can take away a lot of typings
// on the reducer side, everything will remain type-safe.
const reducer: Reducer<CardsState, CardsAction> = (state = initial, action) => {
    switch (action.type) {

    case CardsActionType.DRAW_REQUEST: {
        return {
            ...state,
            isLoading: true,
            current: undefined,
            history: state.current
                ? [state.current, ...state.history]
                : state.history
        };
    }

    case CardsActionType.DRAW_SUCCESS: {
        return {
            ...state,
            current: action.payload,
            error: undefined,
            isLoading: false
        };
    }

    case CardsActionType.DRAW_ERROR: {
        return {
            ...state,
            error: action.payload,
            current: undefined,
            isLoading: false
        };
    }

    default: {
        return state;
    }}
};


// Instead of using default export, we use named exports. That way we can group
// these exports inside the `index.js` folder.
export { reducer as cardsReducer };
