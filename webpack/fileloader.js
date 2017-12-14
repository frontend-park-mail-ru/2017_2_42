module.exports = () => {
    return {
        module: {
            rules: [{
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: 'font/[name].[ext]',
                },
            }, {
                test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]',
                },
            }],
        },
    };
};
