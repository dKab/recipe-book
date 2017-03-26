import React from "react";
import { connect } from "react-redux";
import { loadRecipe } from "../actions";
import { AuthButton } from "../components/AuthButton/AuthButton.jsx";

class RecipeComponent extends React.Component {
  static fetchData(params) {
    const { id } = params;
    return loadRecipe(id);
  }

  render() {
    return (
      <div>
        <AuthButton user={this.props.user} />
        <h2>{this.props.recipe.name}</h2>
        <div>
          Description: <br />
          {this.props.recipe.description}
        </div>
      </div>
    );
  }

  componentDidMount() {
    // this.props.recipe.id != this.props.RecipeId will be true when we have some RecipeId
    // in store that was loaded before but now went to other Recipe detail
    // but for now we return hardcoded recipe from json file and its id === 1
    // so untill we change it to real db call this check should be commented
    if (!this.props.recipe.loaded) {
      /*|| this.props.recipe.id != this.props.RecipeId*/ this.props.dispatchLoadRecipe(
        this.props.RecipeId
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  RecipeId: ownProps.match.params.id,
  user: state.user,
  recipe: state.currentRecipe
});

const mapDispatchToProps = dispatch => ({
  dispatchLoadRecipe: id => dispatch(loadRecipe(id))
});

export const Recipe = connect(mapStateToProps, mapDispatchToProps)(
  RecipeComponent
);

RecipeComponent.propTypes = {
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
    id: React.PropTypes.number
  }),
  RecipeId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  recipe: React.PropTypes.shape({
    name: React.PropTypes.string,
    loaded: React.PropTypes.bool,
    description: React.PropTypes.string
  }),
  dispatchLoadRecipe: React.PropTypes.func.isRequired
};
