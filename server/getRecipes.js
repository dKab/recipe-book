import fs from "fs";
import path from "path";
import pg from "pg";
const config = {
  user: "postgres", // TODO change user (postgres has root priviliges)
  database: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
const pool = new pg.Pool(config);

export const getRecipes = async () => {
  // console.log(dbconfig);
  try {
    const queryResult = await pool.query(`SELECT * FROM public."Recipes";`);
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
