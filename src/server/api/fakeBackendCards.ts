import log from '../util/log';

const suits = ['♦︎', '♠︎', '♣︎', '♥︎'];

const ranks = [
    'A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'
];

const deck = suits.reduce((acc, suit) => (
    acc.concat(ranks.map(rank => `${rank}${suit}`))
), []);


export function getCards(decks: number) {
    const cards = [...Array(decks)].reduce(acc => acc.concat(deck), []);
    return Promise.resolve(cards);
}


export function shuffleCards(cards: string[]) {
    // Fischer Yates Shuffle

    let i = 0;
    let j = 0;
    let temp = null;

    for (i = cards.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }

    return Promise.resolve(cards);
}
