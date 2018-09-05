import { Context } from 'koa';
import * as Router from 'koa-router';
import { shuffle } from '../service/cards';


const router = new Router({ prefix: '/cards' });


router.post('/draw', async (ctx: Context) => {
    const body = ctx.request.body as { number: number, decks: number };
    const { number, decks } = body;
    const cards = await shuffle(decks);

    await new Promise((resolve) => {
        setTimeout(() => resolve(), 500);
    });

    ctx.body = {
        request: body,
        cards: cards.splice(0, number)
    };
});


export default router;
