import React from 'react';
import {NavLink} from '../shared/NavLink/NavLink.jsx';

export const NotFound = () => {
    const headerStyles = {
         position: 'absolute',
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         transform: 'translate(-50%, -50%)'
    };
    return (
        <div style={headerStyles}>
            <h2>404 NOT FOUND...</h2>
            <div style={{ textAlign: 'center'}}>
                <a href="/">Go Home</a>
            </div>
        </div>
    )
};