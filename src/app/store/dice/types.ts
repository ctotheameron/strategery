import { Dispatch, Middleware } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import * as DiceTypes from '../../../shared/types/dice';

import { ApplicationState } from '..';
import * as actions from './actions';


export type DiceRoll = DiceTypes.DiceRoll;
export type DiceRollRequest = DiceTypes.DiceRollRequest;


// Use `const enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the
// convention of Redux's `@@INIT` action.
export enum DiceActionType {
    ROLL_SUCCESS = '@@dice/ROLL_SUCCESS',
    ROLL_ERROR = '@@dice/ROLL_ERROR',
    ROLL_REQUEST = '@@dice/ROLL_REQUEST'
}

export type DiceAction = ActionType<typeof actions>;


export type DiceThunkAction = ThunkAction<
    void, ApplicationState | undefined, undefined, DiceAction
>;


export type DiceDispatch = Dispatch<DiceAction>;


export type DiceThunkDispatch = ThunkDispatch<
    ApplicationState, undefined, DiceAction
>;


export type DiceMiddleware = Middleware<
    undefined, ApplicationState, DiceDispatch & DiceThunkDispatch
>;


// Declare state types with `readonly` modifier to get compile time
// immutability.
export interface DiceState {
    readonly isLoading: boolean;
    readonly current?: DiceRoll;
    readonly history: DiceRoll[];
    readonly error?: string;
}
