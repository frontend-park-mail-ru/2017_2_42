'use strict';


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
                use: [
                    "style-loader",
                    "css-loader"
                ]
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
    devServer: {
        contentBase: __dirname + '/static',
        inline: true,
        port: 1234
    },
};