const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const webpack = require('webpack');

module.exports = function() {
    return webpackMerge(commonConfig, {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('prod')
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