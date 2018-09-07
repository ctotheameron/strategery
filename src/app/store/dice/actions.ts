import { action } from 'typesafe-actions';
import { DiceActionType, DiceRoll, DiceRollRequest } from './types';


// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a
// type-safe manner. For more info:
// https://github.com/piotrwitek/typesafe-actions
//
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.


export function rollRequest(request: DiceRollRequest) {
    return action(DiceActionType.ROLL_REQUEST, request);
}


export function rollSuccess(roll: DiceRoll) {
    return action(DiceActionType.ROLL_SUCCESS, roll);
}


export function rollError(message: string) {
    return action(DiceActionType.ROLL_ERROR, message);
}
