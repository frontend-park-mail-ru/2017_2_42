const WebpackClearConsole = require(
    'webpack-clear-console').WebpackClearConsole;

module.exports = () => {
    return {
        plugins: [
            new WebpackClearConsole(),
        ],
    };
};
