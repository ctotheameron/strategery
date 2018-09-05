import * as Router from 'koa-router';
import { shuffle } from '../service/cards';


const router = new Router({ prefix: '/cards' });


router.post('/draw', async (ctx) => {
    const body = ctx.request.body as { number: number, decks: number };
    const { number, decks } = body;

    if (number < 1 || decks < 1) ctx.throw(400, 'decks and number must be > 0');

    const cards = await shuffle(decks);
    ctx.body = { request: body, cards: cards.splice(0, number) };
});


export default router;
