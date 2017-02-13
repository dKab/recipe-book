const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

module.exports = function() {
    return webpackMerge(commonConfig, {
        devtool: 'cheap-eval-source-map',
        plugins: []
    });
};