import fs from "fs";
import path from "path";
import pg from "pg";
const config = {
  user: "postgres",
  database: "postgres",
  password: "openthedog",
  host: "localhost",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
const pool = new pg.Pool(config);

export const getRecipes = () => {
  // TODO replace it with actual query to DB once db is set up
  // console.log(dbconfig);

  // return loadDataFromFile(path.resolve(__dirname, "../__mocks__/recipes.json"));
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM public."Recipes";`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
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
};
