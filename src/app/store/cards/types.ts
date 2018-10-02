import { Dispatch, Middleware } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import * as CardsTypes from '../../../shared/types/cards';

import { ApplicationState } from '..';
import * as actions from './actions';


export type CardsDraw = CardsTypes.CardsDraw;
export type CardsDrawRequest = CardsTypes.CardsDrawRequest;


// Use `const enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the
// convention of Redux's `@@INIT` action.
export enum CardsActionType {
    DRAW_REQUEST = '@@cards/DRAW_REQUEST',
    DRAW_SUCCESS = '@@cards/DRAW_SUCCESS',
    DRAW_ERROR = '@@cards/DRAW_ERROR'
}

export type CardsAction = ActionType<typeof actions>;


export type CardsThunkAction = ThunkAction<
    void, ApplicationState | undefined, undefined, CardsAction
>;


export type CardsDispatch = Dispatch<CardsAction>;


export type CardsThunkDispatch = ThunkDispatch<
    ApplicationState, undefined, CardsAction
>;


export type CardsMiddleware = Middleware<
    undefined, ApplicationState, CardsDispatch & CardsThunkDispatch
>;


// Declare state types with `readonly` modifier to get compile time
// immutability.
export interface CardsState {
    readonly isLoading: boolean;
    readonly current?: CardsDraw;
    readonly history: CardsDraw[];
    readonly error?: string;
}
