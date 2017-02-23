import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {RootComponent} from './components/RootComponent';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {recipiesReducer} from './reducers';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__

const store = createStore(recipiesReducer, preloadedState);

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