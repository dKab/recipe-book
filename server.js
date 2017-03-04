import regeneratorRuntime from "regenerator-runtime";
import webpackDevConfig from './config/webpack.config.client.dev.js';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import koa from 'koa';
import {renderPage} from './server/renderTemplate';
import serve from 'koa-static';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import {routes} from './routes.jsx';
import {NotFound} from './components/NotFound/NotFound.jsx';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {reducer} from './reducers';
import Router from 'koa-router';
import api from './middleware/api';
import thunk from 'redux-thunk';
import { getRecipe, getRecipes } from './server/getRecipes';
import path from 'path';

const app = new koa();

console.log(`running app in ${process.env.NODE_ENV} mode`);

app.use(async (ctx, next) => {
    await next();
    console.log('here what in response body:', ctx.body);
    console.log('status: ', ctx.status);
})

// app.use(async (ctx, next) => {
//      await next();
//     //  if (!ctx.body && ctx.status == 404) {
//     //     console.log('sending 404');
//     //     ctx.body = renderToString(<NotFound />);
//     //     ctx.status = 404;
//     // }
// });


var router = new Router({
  prefix: '/api/'
});

router.get('recipes', async (ctx, next) => {
  try { 
    const recipes = await getRecipes();
    ctx.body = {ok: true, payload: recipes};
  } catch (err) {
      ctx.status = 500;
      ctx.body = 'Internal server error';
  }
}); 

router.get('recipes/:id', async (ctx, next) => {
  try { 
    const recipe = await getRecipe(ctx.params.id);
    ctx.body = {ok: true, payload: recipe} ;
  } catch (err) {
      ctx.status = 500;
      ctx.body = 'Internal server error';
  }
});

app.use(router.routes());

app.use(async (ctx, next) => {
    await new Promise((resolve, reject) => {
        match({ routes: routes, location: ctx.path }, (err, redirect, props) => {
            console.log('we are in match');
            console.log(`url is ${ctx.path}`);
            if (err) {
                ctx.status = 500;
                ctx.body = 'Server error';
                reject(err);
            } else if (redirect) {
                ctx.redirect(redirect.pathname + redirect.search)
                resolve();
            } else if (props) {
                console.log('props.components', props.components);
                console.log('props.params', props.params);

                // TODO figure out how to get hold of all components which are descendants of
                // matched component to call fetchData for all components that need it.
                // https://github.com/ReactTraining/react-router/issues/4594
                // https://gist.github.com/ryanflorence/efbe562332d4f1cc9331202669763741 
                const store = createStore(reducer,
                        {},
                    applyMiddleware(thunk, api));
                // TODO check that wee have indeed ALL our components here even child ones and deeply nested
                const promises = props.components
                    .filter(component => typeof component.fetchData !== 'undefined') 
                    .map(component => store.dispatch(component.fetchData(props.params)));
                
                console.log(`we have ${promises.length} promises`);
                Promise.all(promises).then(() => {
                    console.log('promises are done');
                    const appHtml = renderToString( <Provider store={store}>
                                                    <RouterContext {...props}/>
                                                </Provider>);
                    const initialState = store.getState();
                    ctx.body = renderPage(appHtml, initialState);
                    resolve();
                });
            } else {
                resolve();
            }
        });
    });
    await next();
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
    // webpack-dev-server serves all static assets from memory in development mode
    app.use(serve('public'));
}

app.listen(3000, () => {});