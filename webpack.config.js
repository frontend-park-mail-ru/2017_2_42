'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './static/js/main.js',
    },

    output: {
        filename: '[name].js',
        path: __dirname + '/public'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader', {publicPath: __dirname})
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(__dirname + '/public/bundle.css'),
    ]
};