import React from 'react';
import { connect } from 'react-redux';
import { NavLink} from '../components/shared/NavLink/NavLink.jsx';
import { loadRecipes } from '../actions'

class ListViewComponent extends React.Component {
    static fetchData() {
        return loadRecipes();
    }

    render() {
        return (
            <div>
                <span>Your awesome recipes:</span>
                <ul>
                    { this.props.recipes.list.map(recipe =><li key={recipe.id}><NavLink to={`/recipe/${recipe.id}`}>{recipe.name}</NavLink></li>) }
                </ul>
            </div>
        );
    }

    componentDidMount() {
        if (!this.props.recipes.loaded) {
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