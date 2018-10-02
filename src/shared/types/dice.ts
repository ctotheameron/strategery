import * as t from 'io-ts';


// Request object for POST /dice/roll
export const DiceRollRequestIO = t.type({
    sides: t.refinement(t.Integer, s => s > 0),
    number: t.refinement(t.Integer, s => s > 0)
});


// Response object for POST /dice/roll
export const DiceRollIO = t.type({
    request: DiceRollRequestIO,
    sum: t.number,
    rolls: t.array(t.number)
});


export interface DiceRollRequest extends t.TypeOf<typeof DiceRollRequestIO> {}
export interface DiceRoll extends t.TypeOf<typeof DiceRollIO> {}
