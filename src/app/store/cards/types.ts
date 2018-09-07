import { ActionType } from 'typesafe-actions';
import { Middleware, Dispatch } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';

import * as actions from './actions';
import { ApplicationState } from '..';


// Request object for POST /cards/roll
export interface CardsDrawRequest {
    decks: number;
    number: number;
}


// Response object for POST /cards
export interface CardsDraw {
    request: CardsDrawRequest;
    cards: string[];
}


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
    void, ApplicationState, undefined, CardsAction
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
