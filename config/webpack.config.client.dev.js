const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.client.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const ModuleMappingPlugin = require('module-mapping-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = function() {
    return webpackMerge(commonConfig, {
        entry: [
            "react-hot-loader/patch",
            'webpack-hot-middleware/client',
            './index.js'
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: './node_modules',
                    use: 
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ["es2015", {"modules": false}], // modules: false is because of webpack 2
                                    "react"
                                ],
                                plugins: [
                                    "react-hot-loader/babel",
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
                                        modules: true
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
        devtool: 'cheap-eval-source-map',
        plugins: [
            new ExtractTextPlugin({
                filename: 'styles.css',
                allChunks: true,
                ignoreOrder: true
            }),
            // new ModuleMappingPlugin({
            //     'fs': '../__mocks__/fs-mock.js'
            // }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    });
};