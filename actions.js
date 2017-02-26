import { CALL_API } from './middleware/api';
import getRecipes from './server/getRecipes';

export const RECIPES_REQUEST = 'RECIPES_REQUEST';
export const RECIPES_SUCCESS = 'RECIPES_SUCCESS';
export const RECIPES_FAILURE = 'RECIPES_FAILURE';

// Makes API call if ececuted on the client, doesn't do API call if executed on the server.
// Relies on Redux Thunk middleware.
export const loadRecipes = () => (dispatch, getState) => {
   if (isNode()) {
        // We will reuse the same actions that we use for API call on the client
        // Although we won't dispatch RECIPES_REQUEST action because we have no use for it on the server
        getRecipes()
            .then(response => {
                dispatch({type: RECIPES_SUCCESS, response });
            }, error => {
                dispatch({type: RECIPES_FAILURE, error});    
            });
   } else {
       dispatch(fetchUserFromAPI());
   } 
}

const isNode = () => typeof window === 'undefined';

const fetchUserFromAPI = () => ({
    [CALL_API]: {
        types: [RECIPES_REQUEST, RECIPES_SUCCESS, RECIPES_FAILURE],
        endpoint: 'recipes/' // TODO provide user id to load only recipes of that user
    }
});
