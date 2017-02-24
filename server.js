import regeneratorRuntime from "regenerator-runtime";
import webpackDevConfig from './config/webpack.config.client.dev.js';
import webpackMiddleware from 'koa-webpack';
import webpack from 'webpack';
import koa from 'koa';
import {renderPage} from './server/renderTemplate';
import serve from 'koa-static';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import {routes} from './routes.jsx';
import send from 'koa-send';
import {NotFound} from './components/NotFound/NotFound.jsx';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {recipiesReducer} from './reducers';


const compiler = webpack(webpackDevConfig());
const app = new koa();

console.log(`running app in ${process.env.NODE_ENV} mode`);

app.use(async (ctx, next) => {
    const matchedPath = await serve('public')(ctx, next);
    if (!matchedPath && !ctx.body && ctx.status == 404) {
        ctx.body = renderToString(<NotFound />);
        ctx.status = 404;
    }
});

if (process.env.NODE_ENV != 'prod') {
    app.use(webpackMiddleware({
        compiler: compiler
    }));
}

app.use(function(ctx, next) {
    if (ctx.path.indexOf('/api') !== 0) {
        next();
    } else {
        ctx.body = 'API isnt ready yet!';
    }
});

app.use(function(ctx) {
    match({ routes: routes, location: ctx.path }, (err, redirect, props) => {
        if (err) {
            ctx.status = 500;
            ctx.body = 'Server error';
            console.log(err);
        } else if (redirect) {
            ctx.redirect(redirect.pathname + redirect.search)
        } else if (props) {
            const store = createStore(recipiesReducer);
            const appHtml = renderToString( <Provider store={store}>
                                                <RouterContext {...props}/>
                                            </Provider>);
            const initialState = store.getState();
            ctx.body = renderPage(appHtml, initialState);
        }
    });
});

app.listen(3001, function () {
    console.log('Listening on port 3001!');
});