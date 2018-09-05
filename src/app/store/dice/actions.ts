import { action } from 'typesafe-actions';
import { DiceActionType, DiceRoll } from './types';


// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a
// type-safe manner. For more info:
// https://github.com/piotrwitek/typesafe-actions
//
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.


export function rollIsLoading(isLoading: boolean) {
    return action(DiceActionType.IS_LOADING, isLoading);
}


export function rollSuccess(roll: DiceRoll) {
    return action(DiceActionType.ROLL_SUCCESS, roll);
}


export function rollError(message: string) {
    return action(DiceActionType.ROLL_ERROR, message);
}
