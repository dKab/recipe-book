import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from '../components/shared/NavLink/NavLink.jsx';
import { loadRecipes } from '../actions'
// import { ChildComponentForTest } from '../components/TestComponent.jsx';

class ListViewComponent extends React.Component {
    static fetchData() {
        return loadRecipes();
    }

    render() {
        return (
            <div>
                <span>Your awesome recipes:</span>
                <ul>
                    { this.props.recipes.list.map(recipe => {
                        return (<li key={recipe.id}>
                                    <NavLink to={`/recipe/${recipe.id}`}>{recipe.name}</NavLink>
                                </li>)
                     }) }
                </ul>
            </div>
        );
    }

    componentDidMount() {
        // If the component was rendered on the server "loaded" flag will be true
        // In this case we shoudn't load data on the client.
        if (!this.props.recipes.loaded) {
            // TODO Currently when we navigate to this component it won't make API call to refresh recipes list
            // If they were already loaded before. It's fine for now, because there's no way list can change now.
            // When we add add recipe functionality we'll have to think of a way to always show actual list,
            // when user navigates to this route.
            this.props.dispatchLoadRecipes();
        }
    }
}

const mapStateToProps = (state) => ({
    recipes: state.recipes
});

const mapDispatchToProps = (dispatch) => ({
    dispatchLoadRecipes: () => dispatch(loadRecipes())
});

export const ListView = connect(mapStateToProps, mapDispatchToProps)(ListViewComponent);