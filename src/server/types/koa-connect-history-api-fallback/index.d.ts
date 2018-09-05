import * as Koa from 'koa';


declare function koaConnectHistoryApiFallback(
    options?: koaConnectHistoryApiFallback.Options
): Koa.Middleware;


declare namespace koaConnectHistoryApiFallback {
    interface Options {
        htmlAcceptHeaders?: string[];
    }
}


export = koaConnectHistoryApiFallback;
