import * as Koa from 'koa';
import * as serveStatic from 'koa-static';
import * as path from 'path';
import * as send from 'koa-send';

const app = new Koa();

function redirectBehindProxyToSSL(environments = ['production']): Koa.Middleware {
    return async (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {
        const env = process.env.NODE_ENV;
        const protoHeader = ctx.headers['x-forwarded-proto'];
        if (environments.includes(env) && protoHeader !== 'https') {
            ctx.redirect('https://' + ctx.hostname + ctx.originalUrl);
        }
        return await next();
    };
}

// enable ssl redirect for heroku environment
app.use(redirectBehindProxyToSSL());

// serve static files
app.use(serveStatic('../dist'));


// Have requests not met by static files return the index, so we get PathLocationStrategy behavior.
// The index needs to be kept relatively small, and this means there is no static 404.
app.use( async (ctx: Koa.Context) => {
    return await send(ctx, 'index.html', {root: '../dist'});
});

const port = process.env.PORT || 8080;
console.log('Starting to listen on port ' + port);
console.log('Serving ' + path.join(__dirname, '../dist'));
// Start the app by listening on the default Heroku port
app.listen(port);
