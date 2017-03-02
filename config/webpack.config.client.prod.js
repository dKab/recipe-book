const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, '../public'),
            filename: 'bundle.js',
            publicPath: '/'
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
                                    ["es2015", {"modules": false}], //modules: false is because of webpack 2
                                    "react"
                                ],
                             plugins: [
                                 "transform-object-rest-spread"
                             ]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: 
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    minimize: true
                                }
                            }
                    })
                }
            ]
        },
        resolve: {
            alias: {
                'path': '../__mocks__/path-mock.js',
                'fs': '../__mocks__/fs-mock.js'
            }
        },
        plugins: [
            new ExtractTextPlugin({
                filename: 'styles.css',
                allChunks: true,
                ignoreOrder: true
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false
            })
        ]
};