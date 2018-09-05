import { Context } from 'koa';
import * as Router from 'koa-router';


const router = new Router({ prefix: '/dice' });


router.post('/roll', async (ctx: Context) => {
    const body = ctx.request.body as { number: number, sides: number };
    const { number, sides } = body;

    const rolls = [];
    let sum = 0;

    for (let i = 0; i < number; i += 1) {
        const roll = Math.floor(Math.random() * sides) + 1;
        rolls.push(roll);
        sum += roll;
    }

    await new Promise((resolve) => {
        setTimeout(() => resolve(), 500);
    });

    ctx.body = { rolls, sum, request: body };
});


export default router;
