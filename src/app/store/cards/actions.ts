import { action } from 'typesafe-actions';
import { CardsActionType, CardsDraw } from './types';


// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a
// type-safe manner. For more info:
// https://github.com/piotrwitek/typesafe-actions
//
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.


export function drawIsLoading(isLoading: boolean) {
    return action(CardsActionType.IS_LOADING, isLoading);
}


export function drawSuccess(draw: CardsDraw) {
    return action(CardsActionType.DRAW_SUCCESS, draw);
}


export function drawError(message: string) {
    return action(CardsActionType.DRAW_ERROR, message);
}
