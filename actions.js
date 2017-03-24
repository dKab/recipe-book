import { CALL_API } from "./middleware/api";

export const RECIPES_REQUEST = "RECIPES_REQUEST";
export const RECIPES_SUCCESS = "RECIPES_SUCCESS";
export const RECIPES_FAILURE = "RECIPES_FAILURE";

export const RECIPE_REQUEST = "RECIPE_REQUEST";
export const RECIPE_FAILURE = "RECIPE_FAILURE";
export const RECIPE_SUCCESS = "RECIPE_SUCCESS";

export const loadRecipes = () => ({
  [CALL_API]: {
    types: [RECIPES_REQUEST, RECIPES_SUCCESS, RECIPES_FAILURE],
    endpoint: "recipes/", // TODO provide user id to load only recipes of that user
    params: {}
  }
});

export const loadRecipe = id => ({
  [CALL_API]: {
    types: [RECIPE_REQUEST, RECIPE_SUCCESS, RECIPE_FAILURE],
    endpoint: `recipes/${id}`,
    params: { id }
  }
});
