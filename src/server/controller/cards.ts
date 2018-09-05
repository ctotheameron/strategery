import * as Router from 'koa-router';
import { shuffle } from '../service/cards';


const router = new Router({ prefix: '/cards' });


router.post('/draw', async (ctx) => {
    const body = ctx.request.body as { number: number, decks: number };
    const { number, decks } = body;
    const cards = await shuffle(decks);
    ctx.body = { request: body, cards: cards.splice(0, number) };
});


export default router;
