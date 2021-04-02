/* eslint-disable import/no-extraneous-dependencies, no-unused-vars */
const merge = require('webpack-merge');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const base = require('./base');

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: 'bundle.min.js',
  },
  module: {
    rules: [
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});
/* eslint-enable import/no-extraneous-dependencies, no-unused-vars */
