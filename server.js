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
// import send from 'koa-send';
import {NotFound} from './components/NotFound/NotFound.jsx';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {reducer} from './reducers';
import Router from 'koa-router';
import api from './middleware/api';
import thunk from 'redux-thunk';
import { getRecipe, getRecipes } from './server/getRecipes';
import path from 'path';

// const compiler = webpack(webpackDevConfig());
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

// var router = new Router({
//   prefix: '/api/'
// });

// router.get('/recipes', async (ctx, next) => {
//   try { 
//     const response = await getRecipes();
//     ctx.body = response;
//   } catch (err) {
//       ctx.status = 500;
//       ctx.body = 'Internal server error';
//   }
// }); 

// router.get('/recipes/:id', async (ctx, next) => {
//   try { 
//     const response = await getRecipe(ctx.params.id);
//     ctx.body = response;
//   } catch (err) {
//       ctx.status = 500;
//       ctx.body = 'Internal server error';
//   }
// });

// app.use(router.routes());

// app.use(function(ctx, next) {
//     if (ctx.path.indexOf('/api/') !== 0) {
//         next();
//     } else {
//         // TODO somehow mount koa-router here so it can handle /api/ calls
//         ctx.body = 'API isnt ready yet!';
//     }
// });

app.use(async (ctx, next) => {
    // await next();
    await new Promise((resolve, reject) => {
        match({ routes: routes, location: ctx.path }, (err, redirect, props) => {
        console.log('we are in match');
        console.log(`url is ${ctx.path}`);
        if (err) {
            ctx.status = 500;
            ctx.body = 'Server error';
            console.log(err);
        } else if (redirect) {
            ctx.redirect(redirect.pathname + redirect.search)
        } else if (props) {
            console.log('we have props!');
            // console.log('props.components', props.components);
            // console.log('props.params', props.params);
            const store = createStore(reducer,
                    {},
                 applyMiddleware(thunk, api));
                 console.log('store is created');
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
                console.log('sending markup');
                resolve();
            })
            
        }
        });
    });
    next();
});

if (process.env.NODE_ENV != 'prod') {
    var webpackDevServer = new WebpackDevServer(webpack(webpackDevConfig()), {
        contentBase: path.resolve(__dirname, '../public'),
        hot: true,
        quiet: false,
        noInfo: false,
        publicPath: '/',
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
                "/**": {
                target: "http://localhost:3000",
                bypass: function(req, res, proxyOptions) {
                    if (req.path.indexOf("bundle.js") !== -1 
                        || req.headers.accept.indexOf('css') !== -1
                        ) {
                        console.log(`Skipping proxy for ${req.path} request.`);
                        return `/public${req.path}`;
                    }
                }
                }
        },
        stats: { 
            colors: true
        }
    });
} else {
    // webpack-dev-server serves all static assets in development mode
    app.use(serve('public'));
}



webpackDevServer.listen(8080, "localhost", () => {});
app.listen(3000, () => {
    console.log('Listening on port 3000!');
});