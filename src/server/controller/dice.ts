import { reporter } from 'io-ts-reporters';
import * as Router from 'koa-router';

import { DiceRoll, DiceRollRequestIO } from '../../shared/types/dice';

import { roll } from '../service/dice';


const router = new Router({ prefix: '/dice' });


router.post('roll', '/roll', async (ctx) => {
    const body = DiceRollRequestIO.decode(ctx.request.body);

    const request = body.getOrElseL(() => (
        ctx.throw(400, reporter(body).join('\n'))
    ));

    if (!request) return;

    const rolls: number[] = await roll(request);
    const sum = rolls.reduce((acc, val) => acc + val, 0);
    const response: DiceRoll = { rolls, sum, request };
    ctx.body = response;
});


export default router;
