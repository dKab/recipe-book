const webpackDevConfig = require('../../config/webpack.config.dev.js');
const webpackMiddleware = require('koa-webpack');
const webpack = require('webpack');
const koa = require('koa');
const path = require('path');
const Router = require('koa-router');

const router = new Router();
const compiler = webpack(webpackDevConfig());
const serve = require('koa-static');
const app = new koa();

router.get('/', function(ctx) {
  ctx.res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

app.use(serve('public')); //serve assets from public folder

console.log(`running app in ${process.env.NODE_ENV} mode`);

if (process.env.NODE_ENV != 'prod') {
    app.use(webpackMiddleware({
        compiler: compiler
    }));
}

app.listen(3001, function () {
    console.log('Listening on port 3001!');
});