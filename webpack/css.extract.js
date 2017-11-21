const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (paths) => {
    return {
        module: {
            rules: [{
                    test: /\.scss$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        publicPath: '/static/',
                        fallback: 'style-loader',
                        use: [{
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                },

                            },
                            {
                                loader: 'postcss-loader',
                            },
                            {
                                loader: 'sass-loader',
                            },
                        ],
                    }),
                },
                {
                    test: /\.css$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        publicPath: '/static/',
                        fallback: 'style-loader',
                        use: [{
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                },
                            },
                            {
                                loader: 'postcss-loader',
                            },
                        ],
                    }),
                },
            ],
        },
        plugins: [
            new ExtractTextPlugin('css/bundle.css'),
        ],
    };
};
