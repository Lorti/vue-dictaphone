const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = merge(require('./webpack.base.conf'), {
  context: __dirname,
  entry: '../src/example/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'build.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    open: true,
    overlay: true,
  },
  devtool: '#eval-source-map',
  performance: {
    hints: false,
  },
});
