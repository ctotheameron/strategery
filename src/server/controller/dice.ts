import * as Router from 'koa-router';

import {
    DiceRoll, DiceRollRequest, DiceRollRequestIO
} from '../../shared/types/dice';

import { decodeAsync } from '../../shared/types/util';

import { roll } from '../service/dice';


const router = new Router({ prefix: '/dice' });


router.post('roll', '/roll', async (ctx) => {
    let request: DiceRollRequest;

    try {
        request = await decodeAsync(DiceRollRequestIO, ctx.request.body);
    } catch (err) {
        ctx.throw(400, err);
        return;
    }

    const rolls: number[] = await roll(request);
    const sum = rolls.reduce((acc, val) => acc + val, 0);
    const response: DiceRoll = { rolls, sum, request };
    ctx.body = response;
});


export default router;
