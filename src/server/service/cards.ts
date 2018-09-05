import { getCards, shuffleCards } from '../api/fakeBackendCards';


export async function shuffle(decks: number): Promise<string[]> {
    const cards = await getCards(decks);
    return shuffleCards(cards);
}
