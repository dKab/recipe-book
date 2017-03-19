import {
  RECIPES_FAILURE,
  RECIPES_REQUEST,
  RECIPES_SUCCESS,
  RECIPE_FAILURE,
  RECIPE_REQUEST,
  RECIPE_SUCCESS
} from "./actions";
import { combineReducers } from "redux";

const initialRecipes = {
  isLoading: false,
  loaded: false,
  error: null,
  list: []
};

const recipes = (state = initialRecipes, action) => {
  switch (action.type) {
    case RECIPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        list: action.response
      };
    case RECIPES_REQUEST:
      return { ...state, isLoading: true };
    case RECIPES_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

const currentRecipe = (state = {}, action) => {
  switch (action.type) {
    case RECIPE_SUCCESS:
      return { ...action.response, loaded: true, isLoading: false };
    case RECIPE_FAILURE:
      return { loaded: false, isLoading: false };
    case RECIPE_REQUEST:
      return { loaded: false, isLoading: true };
    default:
      return state;
  }
};

const user = (state = {}) => {
  return state; // just a stub for now
};

export const reducer = combineReducers({
  recipes,
  user,
  currentRecipe
});
