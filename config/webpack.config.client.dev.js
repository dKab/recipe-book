const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.client.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = function() {
    return webpackMerge(commonConfig, {
        output: {
            path: path.resolve(__dirname, '../public'),
            filename: 'bundle.js',
            publicPath: 'http://localhost:8081/public/'
        },
        entry: [
            './index.js',
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8081'
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
        devServer: {
            // proxy: {
            //     "/": {
            //         target: "http://localhost:3001",
            //         bypass: function(req, res, proxyOptions) {
            //             if (req.headers.accept.indexOf("сss") !== -1 || req.headers.accept.indexOf('javascript') !== -1 || font) {
            //                 console.log(`serving ${req.url} from webpack-dev-server:`);
            //                 return `/public/${req.url}`;
            //             } else if (req.headers.accept.indexOf('javascript') !== -1) {
            //                 console.log(`serving ${req.url} from webpack-dev-server:`);
            //                 return `/public`
            //             } else {
            //                 console.log(`bypassing request ${req.url} to koa server on http://localhost:3001`);
            //                 return false;
            //             }
            //         }
            //     }
            // }
            port: 8081
        },
        devtool: 'cheap-eval-source-map',
        plugins: [
            new ExtractTextPlugin({
                filename: 'styles.css',
                allChunks: true,
                ignoreOrder: true
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    });
};