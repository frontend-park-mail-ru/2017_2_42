module.exports = () => {
    return {
        module: {
            rules: [{
                test: /\.ts?$/,
                loader: 'ts-loader',
            }],
        },
    };
};
