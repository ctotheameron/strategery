import './global';

import config from './config';

let koaNewrelic;
if (config.instrumentForNewrelic) {
    /* tslint:disable no-var-requires */
    const newrelic = require('newrelic');
    const configureKoaNewrelic = require('koa-newrelic');
    /* tslint:enable no-var-requires */

    koaNewrelic = configureKoaNewrelic(newrelic, {
        renderMethodName: 'render',
        groupStaticResources: true,
        customTransactionName: (
            method: string, path: string[]
        ) => `${path.slice(1)} (${method})`
    });
}

import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as fallback from 'koa-connect-history-api-fallback';
import * as cors from '@koa/cors';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';

import { resolve } from 'path';

import dice from './controller/dice';
import cards from './controller/cards';
import status from './controller/status';
import log from './util/log';


log.info(`Config loaded for stage: ${config.stage}`);

const app = new Koa();


/**
 * Configure and mount /api
 */

const api = new Koa();
if (koaNewrelic) api.use(koaNewrelic);
api.use(cors());
api.use(bodyparser());
api.use(status.routes());
api.use(dice.routes());
api.use(cards.routes());
app.use(mount('/api', api));


/**
 * Configure and mount static asset server
 */


app.use(serve(resolve(__dirname, 'assets')));
app.use(
    fallback({ htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'] })
);


/**
 * Start server
 */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    log.info(`Server listening on port ${PORT}`);
});
