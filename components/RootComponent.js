import React from 'react';
import {routes} from '../routes.jsx';
import {Router, browserHistory} from 'react-router';

export const RootComponent = () => {
    return (
        <Router routes={routes} history={browserHistory}/>
    )
};