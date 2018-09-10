import * as Router from 'koa-router';


const router = new Router();


router.get('status', '/', (ctx) => {
    ctx.body = {
        status: 'OK',
        deployedVersion: process.env.DEPLOYED_VERSION,
        notes: []
    };
});


export default router;
