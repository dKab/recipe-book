const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const webpack = require('webpack');
const path = require('path');

module.exports = function() {
    return webpackMerge(commonConfig, {
        entry: [
            "react-hot-loader/patch",
            'webpack-hot-middleware/client',
            './src/index.js'
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: path.resolve(__dirname, '../src'),
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ["es2015", {"modules": false}],
                                    "react"
                                ],
                                plugins: [
                                    "react-hot-loader/babel"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        devtool: 'cheap-eval-source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    });
};