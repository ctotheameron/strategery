import * as Router from 'koa-router';
import { roll } from '../service/dice';

const router = new Router({ prefix: '/dice' });


router.post('roll', '/roll', async (ctx) => {
    const body = ctx.request.body as { number: number, sides: number };
    const { number, sides } = body;

    if (number < 1 || sides < 1) {
        ctx.throw(400, 'sides and number must be > 0');
        return;
    }

    const rolls: number[] = await roll({ sides, number });
    const sum = rolls.reduce((acc, val) => acc + val, 0);
    ctx.body = { rolls, sum, request: body };
});


export default router;
