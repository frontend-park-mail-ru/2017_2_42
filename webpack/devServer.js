module.exports = () => {
  return {
    devServer: {
      proxy: {
        '/**': {  //catch all requests
          target: '/index.html',  //default target
          secure: false,
          bypass: function(req, res, opt){
            //your custom code to check for any exceptions
            //console.log('bypass check', {req: req, res:res, opt: opt});
            if(req.path.indexOf('/img/') !== -1 || req.path.indexOf('/public/') !== -1){
              return '/'
            }

            if (req.headers.accept.indexOf('html') !== -1) {
              return '/index.html';
            }
          }
        }
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      contentBase: __dirname + '/public/',
      stats: 'errors-only',
      inline: true,
      port: '8080',
      host: '0.0.0.0',
      compress: true,
      historyApiFallback: false,
    },
  };
};
