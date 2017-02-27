import { CALL_API } from './middleware/api';
import { getRecipes, getRecipe } from './server/getRecipes';

export const RECIPES_REQUEST = 'RECIPES_REQUEST';
export const RECIPES_SUCCESS = 'RECIPES_SUCCESS';
export const RECIPES_FAILURE = 'RECIPES_FAILURE';

// Makes API call if executed on the client, doesn't do API call if executed on the server.
// Relies on Redux Thunk middleware.
export const loadRecipes = () => (dispatch, getState) => {
   return isomorphicFetch(getRecipes, fetchRecipesFromAPI, RECIPES_REQUEST, RECIPES_FAILURE, dispatch);
}


export const RECIPE_REQUEST = 'RECIPE_REQUEST';
export const RECIPE_FAILURE = 'RECIPE_FAILURE';
export const RECIPE_SUCCESS = 'RECIPE_SUCCESS';

export const loadRecipe = (id) => (dispatch, getState) => {
    const boundGetRecipe = () => loadRecipe(id);
    const boundFetchRecipeFromAPI = () => fetchRecipeFromAPI(id);
    return isomorphicFetch(boundGetRecipe, boundFetchRecipeFromAPI, RECIPE_REQUEST, RECIPE_FAILURE, dispatch);   
}


const isomorphicFetch = (directHandler, apiHandler, successAction, failureAction, dispatch) => {
    if (isNode()) {
        // We will reuse the same actions that we use for API call on the client
        // Although we won't dispatch RECIPES_REQUEST action because we have no use for it on the server
        return directHandler()
            .then(response => {
                dispatch({type: successAction, response });
            }, error => {
                dispatch({type: failureAction, error});    
            });
    } else {
       return Promise.resolve(dispatch(apiHandler()));
    } 
}  



const isNode = () => typeof window === 'undefined';



const fetchRecipesFromAPI = () => ({
    [CALL_API]: {
        types: [RECIPES_REQUEST, RECIPES_SUCCESS, RECIPES_FAILURE],
        endpoint: 'recipes/' // TODO provide user id to load only recipes of that user
    }
});

const fetchRecipeFromAPI = (id) => ({
    [CALL_API]: {
        types: [RECIPE_REQUEST, RECIPE_SUCCESS, RECIPE_FAILURE],
        endpoint: `recipe/${id}`
    }
});