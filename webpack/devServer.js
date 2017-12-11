module.exports = () => {
  return {
    devServer: {
      contentBase: __dirname + '/public/',
      stats: 'errors-only',
      inline: true,
      port: '8080',
      host: '0.0.0.0',
    },
  };
};
