const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = merge(require('./webpack.base.conf'), {
  entry: {
    index: path.resolve(__dirname, '../src/index.js'),
    'index.min': path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: 'VueDictaphone',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
  devtool: '#source-map',
  externals: ['vue'],
  stats: {
    modules: false,
  },
});
