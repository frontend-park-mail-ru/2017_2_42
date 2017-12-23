module.exports = () => {
  return {
    module: {
      rules: [{
        test: /\.js$/,
        enforce: 'pre',
        exclude: [/node_modules/, /Box2D/],
        loader: 'eslint-loader',
        options: {
          fix: true,
          failOnWarning: true,
          failOnError: true,
        },
      },
        {
          test: /\.ts$/,
          enforce: 'pre',
          exclude: [/node_modules/, /Box2D/],
          loader: 'tslint-loader',
          options: {
            fix: true,
            failOnWarning: true,
            failOnError: true,
          },
        },
      ],
    },
  };
};
