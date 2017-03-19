import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { App } from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducers";
import api from "./middleware/api";
import { BrowserRouter as Router } from "react-router-dom";

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = createStore(reducer, preloadedState, applyMiddleware(api));

const render = Component => {
  let componentTree;
  if (process.env.NODE_ENV === "production") {
    componentTree = (
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    );
  } else {
    componentTree = (
      <AppContainer>
        <Provider store={store}>
          <Router>
            <Component />
          </Router>
        </Provider>
      </AppContainer>
    );
  }
  ReactDOM.render(componentTree, document.getElementById("react-root"));
};

render(App);
/* global module:false */
if (module.hot) {
  module.hot.accept("./components/App", () => {
    render(App);
  });
}
