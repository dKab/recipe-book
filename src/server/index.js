const koa = require("koa");
const webpackDevMiddleware = require("koa-webpack");
const webpack = require("webpack");
const webpackDevConfig = require("../../config/webpack.config.dev.js");
const compiler = webpack(webpackDevConfig());
const app = new koa();

console.log('config', JSON.stringify(webpackDevConfig()));

console.log(`running app in ${app.env} mode`);

if (app.env !== 'prod') {
    console.log('using webpack-dev-middleware');

    app.use(webpackDevMiddleware({
        compiler: compiler
    }));
}

app.listen(3000, function () {
    console.log("Listening on port 3000!");
});