'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const wpMerge = require('webpack-merge');

const sourceMap = require('./webpack/source-map');
const pugLoader = require('./webpack/pug');
const lint = require('./webpack/lint');
const tsLoader = require('./webpack/tsloader');
const extractCss = require('./webpack/css.extract');
const consoleLogRemover = require('./webpack/clearConsole');
const babel = require('./webpack/babel');
const fileLoader = require('./webpack/fileloader');
const devServer = require('./webpack/devServer');

const PATHS = {
  src: path.join(__dirname, 'src'),
  public: path.join(__dirname, 'public'),
  game: path.join(__dirname, 'src/js/game'),
};

const common = wpMerge([{
    context: __dirname,
    entry: {
      main: path.join(PATHS.src, 'js/main.js'),
      worker: path.join(PATHS.src, 'js/sw-test.js'),
      // game: path.join(PATHS.game, 'game.js'),
    },
    output: {
      filename: '[name].js',
      path: PATHS.public,
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    node: {
      fs: 'empty',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],
  },
  lint(),
  pugLoader(),
  tsLoader(),
  babel(),
  fileLoader(),
  extractCss(),
]);


module.exports = (env) => {
  switch (env) {
    case 'development':
      return wpMerge([
        common,
        sourceMap(),
        devServer(),
      ]);
    case 'production':
      return wpMerge([
        common,
        consoleLogRemover(),
        // uglify(),
      ]);
  }
};
