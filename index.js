import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {RootComponent} from './components/RootComponent';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {reducer} from './reducers';
import api from './middleware/api';
import thunk from 'redux-thunk';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = createStore(reducer, 
    preloadedState,
    applyMiddleware(thunk, api)
    );

const render = (Component) => {
    let components;
    if (process.env.NODE_ENV === 'production') {
        components = <Provider store={store}><Component /></Provider>;
    } else {
        components = (<AppContainer>
                        <Provider store={store}><Component/></Provider>
                      </AppContainer>);
    }
    ReactDOM.render(
        components,
        document.getElementById('react-root')
    );
};

render(RootComponent);

if (module.hot) {
    module.hot.accept('./components/RootComponent', () => {
        render(RootComponent);
    });
}