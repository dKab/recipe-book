import React from 'react';
import { NavLink } from './shared/NavLink/NavLink.jsx';
import { Route } from 'react-router-dom';
import routes from '../routes';

export const App = (props) => {
    return (
        <div>
            <h1>Recipe book</h1>
            <ul>
                <li><NavLink to="/" exact={true}>Home</NavLink></li>
            </ul>
            { routes.map((route, index) => {
                return <Route key={index} {...route} />    
            }) }
        </div>
    );
};