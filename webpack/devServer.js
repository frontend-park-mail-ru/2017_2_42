module.exports = () => {
    return {
        devServer: {
            contentBase: __dirname + '/public/static',
            stats: 'errors-only',
            inline: true,
            port: '8001',
        },
    };
};
