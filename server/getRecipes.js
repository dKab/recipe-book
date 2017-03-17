import fs from "fs";
import path from "path";

export const getRecipes = () => {
  // TODO replace it with actual query to DB once db is set up
  return loadDataFromFile(path.resolve(__dirname, "../__mocks__/recipes.json"));
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

export const getRecipe = () => {
  return loadDataFromFile(path.resolve(__dirname, "../__mocks__/recipe.json"));
};

function readModuleFile(pathToFile, callback) {
  try {
    fs.readFile(pathToFile, "utf8", callback);
  } catch (e) {
    callback(e);
  }
}
