import React from "react";
import { withRouter } from "react-router";
import { NavLink } from "../shared/NavLink/NavLink.jsx";
export const AuthButton = ({ user }) => {
  return (
    <div>
      {user.name
        ? <span>{user.name} | <LogOutLink /></span>
        : <NavLink to="/login">Log in/Sign up</NavLink>}
    </div>
  );
};

const LogOutLink = withRouter(({ match }) => {
  // Passing path and url of current location so that server could know where to redirect to after logout.
  const href = `/logout?url=${match.url}`;
  return <a href={href}>Log out</a>;
});

AuthButton.propTypes = {
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
    id: React.PropTypes.number
  })
};
