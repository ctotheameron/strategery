import { getCards, shuffleCards } from '../api/fakeBackendCards';


export async function shuffle(decks: number) {
    const cards = await getCards(decks);
    return shuffleCards(cards);
}
