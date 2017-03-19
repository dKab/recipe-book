import { getRecipe, getRecipes } from "./getRecipes";
import Router from "koa-router";

export const router = new Router({
  prefix: "/api/"
});

export const routeLoaderMap = new Map([
  ["recipes/", getRecipes],
  ["recipes/:id", getRecipe]
]);

for (let [route, loader] of routeLoaderMap) {
  router.get(route, async ctx => {
    try {
      const result = await loader(ctx.params);
      ctx.body = { ok: true, result };
    } catch (err) {
      ctx.status = 500;
      ctx.body = "Internal server error";
    }
  });
}
