import { reporter } from 'io-ts-reporters';
import * as Router from 'koa-router';

import { CardsDraw, CardsDrawRequestIO } from '../../shared/types/cards';

import { shuffle } from '../service/cards';


const router = new Router({ prefix: '/cards' });


router.post('draw', '/draw', async (ctx) => {
    const body = CardsDrawRequestIO.decode(ctx.request.body);

    const request = body.getOrElseL(() => (
        ctx.throw(400, reporter(body).join('\n'))
    ));

    if (!request) return;

    const { decks, number } = request;
    const cards = await shuffle(decks);
    const response: CardsDraw = { request, cards: cards.splice(0, number) };
    ctx.body = response;
});


export default router;
