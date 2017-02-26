import { RECIPES_FAILURE, RECIPES_REQUEST, RECIPES_SUCCESS } from './actions';
import { combineReducers } from 'redux';

const recipes = {
    isLoading: false,
    loaded: false,
    error: null,
    list: []
};

const recipes = (state = recipes, action) => {
    switch (action.type) {
        case RECIPES_SUCCESS:
            return {...state, isLoading: false, loaded: true, list: action.response };
        case RECIPES_REQUEST: 
            return {...state, isLoading: true };
        case RECIPES_FAILURE: 
            return {...state, isLoading: false, error: action.error };
        default:
            return state;
    }
};

const user = (state = {}, action) => {
    return state; // just a stub for now
}

export const reducer = combineReducers({
    recipes, user
});