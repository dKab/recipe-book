import fs from 'fs';


export const getRecipes = () => {
    // TODO replace it with actual query to DB once db is set up
    return loadDataFromFile('../__mocks__/recipes.json');
}


const loadDataFromFile = (mockFileName) => {
    return new Promise((resolve, reject) => {
        readModuleFile(mockFileName, 
            (err, json) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(json);
                }
        });
    });
}

export const getRecipe = (id) => {
    return loadDataFromFile('../__mocks__/recipe.json');
};

function readModuleFile(path, callback) {
    try {
        var filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}