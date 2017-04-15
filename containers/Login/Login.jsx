import React from "react";
import { connect } from "react-redux";
import {
  SignInWithTwitterButton
} from "../../components/SignInWithTwitter/SignInWithTwitterButton.jsx";
import styles from "./Login.css";

const LoginComponent = () => {
  return (
    <div className={styles.container}>
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
