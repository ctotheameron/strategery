import { roll } from './service';
import { rollError, rollSuccess } from './actions';
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
