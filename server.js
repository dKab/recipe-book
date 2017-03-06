import regeneratorRuntime from "regenerator-runtime";
import webpackDevConfig from './config/webpack.config.client.dev.js';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import koa from 'koa';
import { renderPage } from './server/renderTemplate';
import serve from 'koa-static';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import routes from './routes';
import { NotFound } from './components/NotFound/NotFound.jsx';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducers';
import { router } from './server/api-endpoints';
import api from './middleware/api';
import thunk from 'redux-thunk';
import path from 'path';
import { App as AppComponent } from './components/App';

const app = new koa();

console.log(`running app in ${process.env.NODE_ENV} mode`);

app.use(async (ctx, next) => {
     await next();
     if (!ctx.body && ctx.status == 404) {
        ctx.body = renderToString(<NotFound />);
        ctx.status = 404;
    }
});

const store = createStore(
        reducer,
        {},
        applyMiddleware(thunk, api)
    );

app.use(router.routes());

app.use(async (ctx, next) => {
    console.log('we are in react-router middleware, path is:',  ctx.path);
    await new Promise((resolve, reject) => {
        const matches = routes.reduce((matches, route) => {
            const match = matchPath(ctx.url, route);
            if (match) {
                matches.push({
                    route,
                    match,
                    promise: route.component.fetchData 
                        ? store.dispatch(route.component.fetchData(match.params))
                        : Promise.resolve(null)
                });
            }
            return matches;
        }, []);

        if (!matches.length) {
         // ?   return reject('404');
            console.log('No matched routes from react-router');
            resolve();
        } else {
            const promises = matches.map(match => match.promise);
            Promise.all(promises)
                .then(() => {
                    const context = {};
                    const appHtml = renderToString(
                    <Provider store={store}>
                        <StaticRouter location={ctx.url} context={context}>
                           <AppComponent />
                        </StaticRouter>
                    </Provider>);
                    if (context.url) {
                        ctx.redirect(context.url);
                    } else {
                        const initialState = store.getState();
                        ctx.body = renderPage(appHtml, initialState);
                    }
                    resolve();
                }, (err) => {
                    ctx.status = 500;
                    ctx.body = 'Server error';
                    reject(err);
                })
        }
    });
    console.log('awaiting static middleware, body = ', ctx.body);
    console.log('status = ', ctx.status);
    await next();
    console.log(`static middleware finished, body = ${ctx.body}, status = ${ctx.status}`); 
});

if (process.env.NODE_ENV != 'prod') {
    var webpackDevServer = new WebpackDevServer(
        webpack(webpackDevConfig), 
        webpackDevConfig.devServer );

    webpackDevServer.listen(8080, "localhost", (
    ) => {
        console.log('Listening on port 8080!');
    });
} else {
    console.log('using static middleware since we are in prod');
    // webpack-dev-server serves all static assets from memory in development mode
    app.use(serve('public'));  
}

app.listen(3001, () => {});