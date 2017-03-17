import React from "react";
import { NavLink as Link } from "react-router-dom";
import styles from "./NavLink.css";

export const NavLink = props => {
  return (
    <Link className={styles.navLink} activeClassName="active" {...props} />
  );
};
