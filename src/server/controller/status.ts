import * as Router from 'koa-router';


const router = new Router();


router.get('/', (ctx) => {
    if (process.env.FAIL_HEALTH_CHECK === 'true') {
        return ctx.throw(500, 'health check intentionally failed', {
            status: 'ERROR',
            deployedVersion: process.env.DEPLOYED_VERSION,
            notes: [
                'Health check has been intentionally failed; Unset ' +
                'FAIL_HEALTH_CHECK from environment variable'
            ]
        });
    }

    ctx.body = {
        status: 'OK',
        deployedVersion: process.env.DEPLOYED_VERSION,
        notes: []
    };
});


export default router;
