import React from "react";
import { connect } from "react-redux";
import {
  SignInWithTwitterButton
} from "../components/SignInWithTwitter/SignInWithTwitterButton.jsx";
// import { Redirect } from "react-router-dom";

const LoginComponent = (/*{ location, user }*/) => {
  // console.log("location", location);
  // console.log("user", user);

  //location.state is undefined for some reason - need to investigate this
  /*const { from } = location.state;
  return user.name
    ? <Redirect to={from} />
    : <div>
        <ul>
          <li>Log in (not available yet)</li>
          <li>Sign up (not available yet)</li>
        </ul>
        or
        <div>
          <SignInWithTwitterButton />
        </div>
      </div>;*/
  return (
    <div>
      <ul>
        <li>Log in (not available yet)</li>
        <li>Sign up (not available yet)</li>
      </ul>
      or
      <div>
        <SignInWithTwitterButton />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  location: ownProps.location
});

LoginComponent.propTypes = {
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
    id: React.PropTypes.number
  }),
  location: React.PropTypes.object
};

export const Login = connect(mapStateToProps)(LoginComponent);
