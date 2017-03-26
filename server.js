import webpackDevConfig from "./config/webpack.config.client.dev.js";
import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import koa from "koa";
import serve from "koa-static";
import React from "react";
import { NotFound } from "./components/NotFound/NotFound.jsx";
import { router as APIRouter } from "./server/api-endpoints";
import { router as AuthRouter } from "./server/auth";
import { renderToString } from "react-dom/server";
import { serverRender } from "./server/serverRenderingMiddleware";
import Grant from "grant-koa";
import mount from "koa-mount";
import grantConfig from "./config/grant-config";
import session from "koa-session";

const app = new koa();
const grant = new Grant(grantConfig);
app.keys = ["a key for encryption of cookies and stuff"];
app.use(
  session(
    {
      key: "recipy-book"
    },
    app
  )
);
app.use(mount(grant));

app.use(async (ctx, next) => {
  await next();
  if (!ctx.body && ctx.status == 404) {
    ctx.body = renderToString(<NotFound />);
    ctx.status = 404;
  }
});

app.use(AuthRouter.routes());
app.use(APIRouter.routes());

app.use(serverRender);

if (process.env.NODE_ENV != "production") {
  var webpackDevServer = new WebpackDevServer(
    webpack(webpackDevConfig),
    webpackDevConfig.devServer
  );

  webpackDevServer.listen(8080, "localhost");
} else {
  // webpack-dev-server serves all static assets from memory in development mode
  app.use(serve("public"));
}

app.listen(3001, () => {});
