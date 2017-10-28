'use strict';

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: {
    main: './static/js/main.js',
  },
  output: {
    filename: './[name].js',
    path: __dirname + '/public',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        failOnWarning: true,
        failOnError: true,
      },
    },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              modules: false,
              useBuiltIns: true,
              targets: {
                browsers: [
                  'Chrome >= 60',
                  'Safari >= 10.1',
                  'iOS >= 10.3',
                  'Firefox >= 54',
                  'Edge >= 15',
                ],
              },
            }],
          ],
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader'],
        }),
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|gif|jpeg)$/,
        use: [
          'file-loader',
        ],
      },

    ],
  },
  node: {
    fs: 'empty',
  },
  plugins: [
    new ExtractTextPlugin('./bundle.css'),
    new HtmlWebpackPlugin({
      template: './static/index.html',
    }),
  ],
  devServer: {
    contentBase: __dirname + '/public',
    inline: true,
    port: 1234,
  },
};
