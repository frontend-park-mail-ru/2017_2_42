module.exports = () => {
  return {
    module: {
      rules: [{
        test: /\.js$/,
        exclude: [/node_modules/, /Box2D/],
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              modules: false,
              useBuiltIns: true,
              targets: {
                browsers: [
                  'Chrome >= 60',
                  'Safari >= 10.1',
                  'iOS >= 10.3',
                  'Firefox >= 54',
                  'Edge >= 15',
                ],
              },
            }],
            // ['minify'],
          ],
        },
      }],
    },
  };
};
