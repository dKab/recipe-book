const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.client.common.js');
const webpack = require('webpack');
const path = require('path');

module.exports = function() {
    return webpackMerge(commonConfig, {
        entry: './index.js',
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
                                ]
                        }
                    }
                }
            ]
        },
        plugins: [
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
    })
};