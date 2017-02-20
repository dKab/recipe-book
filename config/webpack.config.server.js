var fs = require('fs');
var path = require('path');

module.exports = {

    entry: './server.js',

    output: {
        filename: 'server.bundle.js'
    },

    target: 'node',

    // keep node_module paths out of the bundle
    externals: fs.readdirSync(path.resolve(__dirname, '../node_modules')).concat([
        'react-dom/server', 'react/addons'
    ]).reduce(function (ext, mod) {
        ext[mod] = 'commonjs ' + mod;
        return ext;
    }, {}),

    node: {
        __filename: true,
        __dirname: true
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: './node_modules',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "es2015",
                            "es2017", //for koa async-await
                            "react"
                        ]
                    }
                }
            }
        ]
    }
};