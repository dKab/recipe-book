import fs from 'fs';

export default getRecipes = () => {
    // TODO replace it with actual query to DB once db is set up
    return new Promise((resolve, reject) => {
        readModuleFile('../__mocks__/recipes.json', 
            (err, json) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(json);
                }
        });
    });
}

function readModuleFile(path, callback) {
    try {
        var filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}