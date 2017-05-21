require('babel-polyfill')

var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var assetsPath = path.resolve(__dirname, '../static/dist')
var config = require('../src/config')
var host = config.host
var port = (+process.env.PORT + 1) || 3001
var HappyPack = require('happypack')
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools')).development()
var helpers = require('./helpers')
var glob = require('glob');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

var babelrc = fs.readFileSync('./.babelrc')
var babelrcObject = {}

try {
  babelrcObject = JSON.parse(babelrc)
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.')
  console.error(err)
}


var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {}

var combinedPlugins = babelrcObject.plugins || []
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins)

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins})
delete babelLoaderQuery.env

babelLoaderQuery.plugins = babelLoaderQuery.plugins || []
var reactTransform = null
for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
  var plugin = babelLoaderQuery.plugins[i]
  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin
  }
}

if (!reactTransform) {
  reactTransform = ['react-transform', {transforms: []}]
  babelLoaderQuery.plugins.push(reactTransform)
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], {transforms: []})
}

reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
})

var validDLLs = helpers.isValidDLLs('vendor', assetsPath);

if (process.env.WEBPACK_DLLS === '1' && !validDLLs) {
  process.env.WEBPACK_DLLS = '0'
  console.warn('webpack dlls disabled')
}

const webpackConfig = module.exports = {
  devtool: 'cheap-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/assets/css/main.styl',
      './src/client.js'
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, '../src')],
        exclude: /(node_modules)\/|fontConfig.font.js$/,
        loader: 'happypack/loader?id=js'
      }, {
        test: /\.json$/,
        loader: 'happypack/loader?id=json',
        include: [path.resolve(__dirname, '../src')]
      }, {
        test: /\.styl$/,
        loader: 'happypack/loader?id=styl',
        include: [path.resolve(__dirname, '../src')]
      }, {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/font-woff',
          name: 'fonts/[name].[ext]'
        }
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/octet-stream',
          name: 'fonts/[name].[ext]',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }, {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }, {
        test: webpackIsomorphicToolsPlugin.regular_expression('svg'),
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules'
    ],
    extensions: ['.json', '.js']
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'inloop-dev-stack',
        filename: 'my-service-worker.js',
        maximumFileSizeToCacheInBytes: 4194304,
        minify: true,
        dynamicUrlToDependencies: {
          '/': [
            ...glob.sync(path.resolve(assetsPath, './dist/*.js')),
            ...glob.sync(path.resolve(assetsPath, './dist/*.css'))
          ]
        },
      }
    ),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:8000'),
      'process.env.API_URL_FROM_SERVER': JSON.stringify(process.env.API_URL_FROM_SERVER || process.env.API_URL || 'http://localhost:8000'),
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
    }),
    helpers.createHappyPlugin('js', [
      {
        loader: 'react-hot-loader/webpack'
      }, {
        loader: 'babel-loader',
        query: babelLoaderQuery
      }, {
        loader: 'eslint-loader'
      }
    ]),
    helpers.createHappyPlugin('styl', [
      {
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        query: {
          modules: true,
          importLoaders: 3,
          sourceMap: true,
          localIdentName: '[local]___[hash:base64:5]',
          camelCase: 'dashes'
        }
      }, {
        loader: 'autoprefixer-loader',
        query: {
          browsers: 'last 2 version'
        }
      }, {
        loader: 'resolve-url-loader',
      }, {
        loader: 'stylus-loader',
        query: {
          outputStyle: 'expanded',
          sourceMap: true
        }
      }
    ]),
    webpackIsomorphicToolsPlugin.development()
  ]
}

if (process.env.WEBPACK_DLLS === '1' && validDLLs) {
  helpers.installVendorDLL(webpackConfig, 'vendor')
}
