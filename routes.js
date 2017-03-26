import { ListView } from "./containers/ListView.jsx";
import { Recipe } from "./containers/Recipe.jsx";
import { Login } from "./containers/Login.jsx";

const routes = [
  {
    path: "/",
    exact: true,
    component: ListView
  },
  {
    path: "/recipe/:id",
    component: Recipe
  },
  {
    path: "/login",
    component: Login
  }
];

export default routes;
