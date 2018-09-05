import { ApplicationState } from '../';
import { ThunkAction } from 'redux-thunk';

import { roll } from './service';
import { rollError, rollIsLoading, rollSuccess } from './actions';
import { DiceRollRequest, DiceAction } from './types';


export function makeRemoteRoll(
    request: DiceRollRequest
): ThunkAction<void, ApplicationState, undefined, DiceAction> {
    return async (dispatch) => {
        dispatch(rollIsLoading(true));

        try {
            const rollResponse = await roll(request);
            dispatch(rollSuccess(rollResponse));
        } catch (err) {
            dispatch(rollError(err.message));
        }

        dispatch(rollIsLoading(false));
    };
}
