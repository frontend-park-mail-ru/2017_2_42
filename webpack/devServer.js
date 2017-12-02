module.exports = () => {
    return {
        devServer: {
            contentBase: __dirname + '/public/',
            stats: 'errors-only',
            inline: true,
            port: '8001',
        },
    };
};
