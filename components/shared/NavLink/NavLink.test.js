import React from 'react';
import {NavLink} from './NavLink.jsx'
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router'


it('renders correctly', () => {
  const tree = renderer.create(
    <StaticRouter context={{}}>
      <NavLink to='/whatever'>Somewhere</NavLink>
    </StaticRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});