import * as Router from 'koa-router';

import {
    CardsDraw, CardsDrawRequest, CardsDrawRequestIO
} from '../../shared/types/cards';

import { decodeAsync } from '../../shared/types/util';

import { shuffle } from '../service/cards';


const router = new Router({ prefix: '/cards' });


router.post('draw', '/draw', async (ctx) => {
    let request: CardsDrawRequest;

    try {
        request = await decodeAsync(CardsDrawRequestIO, ctx.request.body);
    } catch (err) {
        ctx.throw(400, err);
        return;
    }

    const { decks, number } = request;
    const cards = await shuffle(decks);
    const response: CardsDraw = { request, cards: cards.splice(0, number) };
    ctx.body = response;
});


export default router;
