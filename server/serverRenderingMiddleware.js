import routes from "../routes";
import { StaticRouter, matchPath } from "react-router";
import { createStore, applyMiddleware } from "redux";
import { reducer } from "../reducers";
import loadOnServer from "../middleware/loadOnServer";
import { Provider } from "react-redux";
import { App as AppComponent } from "../components/App";
import { renderPage } from "./renderTemplate";
import React from "react";
import { renderToString } from "react-dom/server";

export const serverRender = async (ctx, next) => {
  const store = createStore(
    reducer,
    { user: ctx.session.user },
    applyMiddleware(loadOnServer)
  );

  await new Promise((resolve, reject) => {
    const matches = routes.reduce(
      (matches, route) => {
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
      },
      []
    );

    if (!matches.length) {
      // ?   return reject('404');
      resolve();
    } else {
      const promises = matches.map(match => match.promise);
      Promise.all(promises).then(
        () => {
          const context = {};
          const appHtml = renderToString(
            <Provider store={store}>
              <StaticRouter location={ctx.url} context={context}>
                <AppComponent />
              </StaticRouter>
            </Provider>
          );
          if (context.url) {
            ctx.redirect(context.url);
          } else {
            const initialState = store.getState();
            ctx.body = renderPage(appHtml, initialState);
          }
          resolve();
        },
        err => {
          ctx.status = 500;
          ctx.body = "Server error";
          reject(err);
        }
      );
    }
  });
  await next();
};
