import { makeRemoteRoll } from './thunks';
import { DiceActionType, DiceMiddleware } from './types';


const middleware: DiceMiddleware = ({ dispatch }) => next => (action) => {
    switch (action.type) {
    case DiceActionType.ROLL_REQUEST: {
        dispatch(makeRemoteRoll(action.payload));
        next(action);
    }
    default: {
        next(action);
    }}
};


export { middleware as diceMiddleware };
