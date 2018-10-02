import { rollError, rollSuccess } from './actions';
import { roll } from './service';
import { DiceRollRequest, DiceThunkAction } from './types';


export function makeRemoteRoll(request: DiceRollRequest): DiceThunkAction {
    return async (dispatch) => {
        try {
            const rollResponse = await roll(request);
            dispatch(rollSuccess(rollResponse));
        } catch (err) {
            dispatch(rollError(err.message));
        }
    };
}
