const suits = ['♦︎', '♠︎', '♣︎', '♥︎'];

const ranks = [
    'A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'
];

const deck = suits.reduce((acc: string[], suit) => (
    acc.concat(ranks.map(rank => `${rank}${suit}`))
), []);


export function getCards(decks: number): Promise<string[]> {
    if (!Number.isSafeInteger(decks) || decks < 0) {
        return Promise.reject(new Error(`Cannot give you ${decks} decks`));
    }

    const cards = [...Array(decks)].reduce(acc => acc.concat(deck), []);
    return new Promise(resolve => setTimeout(() => resolve(cards), 100));
}


export function shuffleCards(cards: string[]): Promise<string[]> {
    // Fischer Yates Shuffle

    let i = 0;
    let j = 0;
    let temp;

    for (i = cards.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }

    return new Promise(resolve => setTimeout(() => resolve(cards), 100));
}
