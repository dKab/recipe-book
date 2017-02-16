const webpackDevConfig = require('../../config/webpack.config.dev.js');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const express = require('express');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');

const compiler = webpack(webpackDevConfig());

const app = express();

app.get('/', function(req,res) {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

app.use(express.static('public'));

console.log(`running app in ${process.env.NODE_ENV} mode`);

if (process.env.NODE_ENV != 'prod') {
    app.use(webpackMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler));
}

app.listen(3001, function () {
    console.log('Listening on port 3001!');
});