import React from "react";
import { NavLink } from "../shared/NavLink/NavLink.jsx";

export const AuthButton = ({ user }) => {
  return (
    <div>
      {user.name
        ? <span> {user.name} | Log out</span>
        : <NavLink to="/login">Log in/Sign up</NavLink>}
    </div>
  );
};

AuthButton.propTypes = {
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
    id: React.PropTypes.number
  })
};
