import { ListView } from './containers/ListView.jsx';
import { Recipe } from './containers/Recipe.jsx';

const routes = [
  { path: '/',
    exact: true,
    component: ListView
  },
  { path: '/recipe/:id',
    component: Recipe
  }
];

export default routes
