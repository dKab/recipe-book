/*
This middleware is used on server insdead of `api` middleware
which is used for client use. loadOnServer intercepts actions in the same format
as `api` middleware but instead of making xhr request to server API, it reads the url
from action object and calls corresponding function directly  
 */
import { CALL_API } from "./api";
import { routeLoaderMap } from "../server/api-endpoints";
import pathToRegexp from "path-to-regexp";

const invokeLoaderDirectly = (apiEndpointUrl, params) => {
  var matchedHandler;
  for (let [path, loader] of routeLoaderMap) {
    if (pathToRegexp(path).test(apiEndpointUrl)) {
      matchedHandler = loader;
      break;
    }
  }
  return matchedHandler(params);
};

export default () =>
  next =>
    action => {
      const callAPI = action[CALL_API];
      if (typeof callAPI === "undefined") {
        return next(action);
      }

      const { endpoint, types, params } = callAPI;

      if (typeof endpoint !== "string") {
        throw new Error("Specify a string endpoint URL.");
      }
      if (!Array.isArray(types) || types.length !== 3) {
        throw new Error("Expected an array of three action types.");
      }
      if (!types.every(type => typeof type === "string")) {
        throw new Error("Expected action types to be strings.");
      }

      const actionWith = data => {
        const finalAction = { ...action, ...data };
        delete finalAction[CALL_API];
        return finalAction;
      };

      const [, successType, failureType] = types;

      return invokeLoaderDirectly(endpoint, params).then(
        response =>
          next(
            actionWith({
              response,
              type: successType
            })
          ),
        error =>
          next(
            actionWith({
              type: failureType,
              error: error.message || "Something bad happened"
            })
          )
      );
    };
