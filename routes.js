import { ListView } from "./containers/ListView.jsx";
import { Recipe } from "./containers/Recipe.jsx";
import { Login } from "./containers/Login/Login.jsx";

// Use `authRequired: true` to make route private
// it's not part of react-router API - it's just how I decided to mark routes as private
// I can check for this flag whenever I need to restrict access to the page.
// E.g. /logout handler uses this flag to decide where it should redirect user
// after logout. If page is private - it redirects to login page, if not - it
// redirects back to this page.
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
