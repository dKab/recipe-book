import React from 'react';
import {NavLink} from './shared/NavLink/NavLink.jsx';

export const App = (props) => {
    return (
        <div className="app-container">
            <h1>Recipy book</h1>
            <ul>
                <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
            </ul>
            {props.children}
        </div>
    );
};