import "babel-polyfill";
import koa from "koa";
import webpackDevMiddleware from "koa-webpack";
import webpackDevConfig  from "./config/webpack.config.dev.js";
import React from 'react';
import serve from 'koa-static';

import path from 'path';

//import {handleRender} from './render-react-app.jsx';

const app = new koa();

console.log(`running app in ${app.env} mode`);

app.use(serve(`${__dirname}/public`));
//app.use(handleRender);

//function renderFullPage(html, preloadedState) { /* ... */ }

if (app.env !== 'prod') {
    console.log('using webpack-dev-middleware');

    app.use(webpackDevMiddleware({
        config: webpackDevConfig()
    }));
}

app.listen(3001, function () {
    console.log("Listening on port 3001!");
});