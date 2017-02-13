module.exports = {
  entry: 'index.js',
  output: {
    'app.js'
  },
  module: {
    rules: [
      {test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader'}
    ]
  }
};