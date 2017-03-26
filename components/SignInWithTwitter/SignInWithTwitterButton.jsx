import React from "react";
import styles from "./signInWithTwitter.css";

export const SignInWithTwitterButton = ({ onClickHandler }) => {
  return (
    <a
      href="connect/twitter"
      onClick={onClickHandler}
      className={styles.twitterButton}
    />
  );
};

SignInWithTwitterButton.propTypes = {
  onClickHandler: React.PropTypes.func
};
