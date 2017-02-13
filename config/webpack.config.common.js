let path = require('path');

module.exports = {
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js',
        publicPath: 'localhost:3000/'
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader'}
        ]
    }
};