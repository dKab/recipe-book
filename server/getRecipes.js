import fs from "fs";
import path from "path";
import { query } from "./db";

export const getRecipes = async () => {
  try {
    const queryResult = await query(`SELECT * FROM "Recipes";`);
    return Promise.resolve(queryResult.rows);
  } catch (err) {
    return Promise.reject(err);
  }
};

const loadDataFromFile = mockFileName => {
  return new Promise((resolve, reject) => {
    readModuleFile(mockFileName, (err, json) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(json));
      }
    });
  });
};
// eslint-disable-next-line no-unused-vars
export const getRecipe = ({ id }) => {
  return loadDataFromFile(path.resolve(__dirname, "../__mocks__/recipe.json"));
};

function readModuleFile(pathToFile, callback) {
  try {
    fs.readFile(pathToFile, "utf8", callback);
  } catch (e) {
    callback(e);
  }
}
