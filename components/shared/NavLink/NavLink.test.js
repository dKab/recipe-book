import React from 'react';
import {NavLink} from './NavLink.jsx'
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
      <NavLink to='/whatever'>Somewhere</NavLink>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});