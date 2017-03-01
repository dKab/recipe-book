import React from 'react';
import {Link} from 'react-router';
import styles from './NavLink.css';

export const NavLink = (props) => {
    return (
        <Link className="gfdsg" activeClassName="active" {...props}  />
    );
};