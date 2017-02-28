import React from 'react';
import { connect } from 'react-redux';
import { NavLink} from '../components/shared/NavLink/NavLink.jsx';
import { loadRecipes } from '../actions'

class ListViewComponent extends React.Component {
    static fetchData() {
        console.log('fetching data for ListView');
        return this.props.dispatchLoadRecipes();
    }

    render() {
        return (
            <div>
                <ul>
                    { this.props.recipes.list.map(recipe =><li><NavLink to={`/recipy/${recipe.id}`}>{recipe.name}</NavLink></li>) }
                </ul>
            </div>
        );
    }

    componentDidMount() {
        if (!this.props.recipes.loaded) {
            this.constructor.fetchData();
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