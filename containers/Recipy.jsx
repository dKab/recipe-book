import React from 'react';
import { connect } from 'react-redux';
import { loadRecipe } from '../actions';

class Recipy extends React.Component {
   static fetchData(params) {
        return dispatchLoadRecipy(params.id);
   }
   
    render() {
        return (
            <div>
                <h2>{ this.props.recipe.name }</h2>
                <div>Description: <br />
                    { this.props.recipe.description }
                </div> 
            </div>
        );
    }
    
    componentDidMount() {
        // this.props.recipe.id != this.props.recipyId will be true when we have some recipyId
        // in store that was loaded before but now went to other recipy detail
        if (!this.props.recipe.isLoaded || this.props.recipe.id != this.props.recipyId) {
            this.constructor.fetchData({ id: this.props.recipyId });
        }
    }
}

const mapStateToProps = (state, ownProps) => ({
    recipyId: ownProps.params.id,
    recipe: state.recipe
});

const mapDispatchToProps = (dispatch) => ({
    dispatchLoadRecipy: (id) => dispatch(loadRecipe(id))
});