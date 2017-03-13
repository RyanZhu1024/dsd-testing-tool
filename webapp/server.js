var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

new WebpackDevServer(webpack(config) ,{
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    '/api/*': 'http://localhost:4000'
  }
}).listen(3000, 'localhost', (err,result) => {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at http:localhost:3000');
});
