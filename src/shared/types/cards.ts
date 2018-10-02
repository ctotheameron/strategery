import * as t from 'io-ts';


// Request object for POST /cards/roll
export const CardsDrawRequestIO = t.type({
    decks: t.refinement(t.Integer, s => s > 0),
    number: t.refinement(t.Integer, s => s > 0)
});


// Response object for POST /cards
export const CardsDrawIO = t.type({
    request: CardsDrawRequestIO,
    cards: t.array(t.string)
});


export interface CardsDrawRequest extends t.TypeOf<typeof CardsDrawRequestIO> {}
export interface CardsDraw extends t.TypeOf<typeof CardsDrawIO> {}
