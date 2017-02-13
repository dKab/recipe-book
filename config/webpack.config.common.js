let path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, exclude: /node_modules/, use: {
                loader: 'babel-loader',
                options: {
                        presets: ['es2015', 'react']
                    }
                }
            }
        ]
    }
};