import { ActionType } from 'typesafe-actions';
import * as actions from './actions';


// Request object for POST /dice/roll
export interface DiceRollRequest {
    sides: number;
    number: number;
}


// Response object for POST /dice/roll
export interface DiceRoll {
    request: DiceRollRequest;
    sum: number;
    rolls: number[];
}


// Use `const enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the
// convention of Redux's `@@INIT` action.
export enum DiceActionType {
    ROLL_SUCCESS = '@@dice/ROLL_SUCCESS',
    ROLL_ERROR = '@@dice/ROLL_ERROR',
    IS_LOADING = '@@dice/IS_LOADING'
}

export type DiceAction = ActionType<typeof actions>;


// Declare state types with `readonly` modifier to get compile time
// immutability.
export interface DiceState {
    readonly isLoading: boolean;
    readonly current?: DiceRoll;
    readonly history: DiceRoll[];
    readonly error?: string;
}
