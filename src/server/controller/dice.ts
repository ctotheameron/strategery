import * as Router from 'koa-router';
import { roll } from '../service/dice';

const router = new Router({ prefix: '/dice' });


router.post('/roll', async (ctx) => {
    const body = ctx.request.body as { number: number, sides: number };
    const { number, sides } = body;
    const rolls: number[] = await roll({ sides, number });
    const sum = rolls.reduce((acc, val) => acc + val, 0);
    ctx.body = { rolls, sum, request: body };
});


export default router;
