import { draw } from './service';
import { drawError, drawSuccess } from './actions';
import { CardsDrawRequest, CardsThunkAction } from './types';


export function makeRemoteDraw(request: CardsDrawRequest): CardsThunkAction {
    return async (dispatch) => {
        try {
            const drawResponse = await draw(request);
            dispatch(drawSuccess(drawResponse));
        } catch (err) {
            dispatch(drawError(err.message));
        }
    };
}
