import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {RootComponent} from './components/RootComponent';

const render = (Component) => {
    let components = process.env.NODE_ENV != 'production'
        ? (<AppContainer>
                <Component/>
            </AppContainer>)
        : <Component />;
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