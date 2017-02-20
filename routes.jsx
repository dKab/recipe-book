import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {App} from './components/App.js';
import {ListView} from './components/ListView.jsx';
import {Recipy} from './components/Recipy.jsx';

export const routes = (
  <Route path="/" component={App}>
      <IndexRoute component={ListView}></IndexRoute>
      <Route path="/recipy/:id" component={Recipy}></Route>
  </Route>
);