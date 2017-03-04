const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
        output: {
            path: path.resolve(__dirname, '../public'),
            filename: 'bundle.js',
            publicPath: 'http://localhost:8080/public/'
        },
        entry: [
             'react-hot-loader/patch',
            // activate HMR for React

            'webpack-dev-server/client?http://localhost:8080',
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint

            'webpack/hot/only-dev-server',
            // bundle the client for hot rel
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
        devtool: 'inline-source-map',
        devServer: {
            contentBase: path.resolve(__dirname, '../public'),
            hot: true,
            quiet: false,
            noInfo: false,
            publicPath: 'http://localhost:8080/public/',
            overlay: {
                warnings: true,
                errors: true
            },
            proxy: {
                "/**": {
                    target: "http://localhost:3000",
                    bypass: function(req, res, proxyOptions) {
                        if (req.path.indexOf("bundle.js") !== -1 
                            || req.headers.accept.indexOf('css') !== -1
                            ) {
                            console.log(`Skipping proxy for ${req.path} request.`);
                            return `/public${req.path}`;
                        }
                    }
                }
            },
            stats: { 
                colors: true
            }
        },
        plugins: [
            new ExtractTextPlugin({
                filename: 'styles.css',
                allChunks: true,
                ignoreOrder: true
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]
};