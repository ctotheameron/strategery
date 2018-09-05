import { ApplicationState } from '../';
import { ThunkAction } from 'redux-thunk';

import { draw } from './service';
import { drawError, drawIsLoading, drawSuccess } from './actions';
import { CardsDrawRequest, CardsAction } from './types';


export function makeRemoteDraw(
    request: CardsDrawRequest
): ThunkAction<void, ApplicationState, undefined, CardsAction> {
    return async (dispatch) => {
        dispatch(drawIsLoading(true));

        try {
            const drawResponse = await draw(request);
            dispatch(drawSuccess(drawResponse));
        } catch (err) {
            dispatch(drawError(err.message));
        }

        dispatch(drawIsLoading(false));
    };
}
