// require('babel-polyfill')

var path = require('path')
var projectRootPath = path.resolve(__dirname, '../../')
var assetsPath = path.resolve(projectRootPath, './static/dist')

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, './'),
  entry: {
    iconfont: [
      './fontConfig.font.js',
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      test: /\.font.js$/,
      exclude: /node_modules/,
      loader: "style-loader?css-loader!url-loader!file-loader!file?name=iconfont.css!fontgen?formats=woff,eot,ttf&fileName=iconfont/iconfont[ext]"
    }]
  }
}
