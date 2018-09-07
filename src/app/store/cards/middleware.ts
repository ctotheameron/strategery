import { CardsActionType, CardsMiddleware } from '../../store/cards/types';
import { makeRemoteDraw } from './thunks';


const middleware: CardsMiddleware = ({ dispatch }) => next => (action) => {
    switch (action.type) {
    case CardsActionType.DRAW_REQUEST: {
        dispatch(makeRemoteDraw(action.payload));
        next(action);
    }
    default: {
        next(action);
    }}
};


export { middleware as cardsMiddleware };
