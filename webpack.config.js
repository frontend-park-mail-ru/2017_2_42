'use strict';

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    devtool: "source-map",
    entry: {
        main: './static/js/main.js',
    },
    output: {
        filename: './bundle.js',
        path: __dirname + '/public'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.html$/,

                use: [
                    "html-loader"
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./bundle.css'),
        new HtmlWebpackPlugin({
            inject: true,
            template: './static/index.html'
        }),
    ],
    devServer: {
        contentBase: __dirname + '/public',
        inline: true,
        port: 1234
    },
};