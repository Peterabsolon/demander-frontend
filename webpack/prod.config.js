require('babel-polyfill');

var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');
var autoprefixer = require('autoprefixer');
var glob = require('glob');

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './static/dist');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      './tsrc/assets/css/main.styl',
      './tsrc/client.js'
    ],
    vendor: ['react', 'react-dom', 'react-redux', 'redux-form', 'react-helmet', 'react-notification-system', 'react-router-redux', 'redux-connect', 'lodash', 'react-intl']
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [{
          loader: 'strip-loader',
          options: {
            strip: ['debug']
          }
        }, {
          loader: 'babel-loader'
        }],
        exclude: /(node_modules)\/|fontConfig.font.js$/,
        include: [path.resolve(__dirname, '../src')]
      }, {
        test: /\.json?$/,
        loader: 'json-loader',
        exclude: /node_modules/
      }, {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'stylus-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                importLoaders: 3,
                camelCase: 'dashes'
              }
            }, {
              loader: 'autoprefixer-loader',
              query: {
                browsers: 'last 2 version'
              }
            }, {
              loader: 'stylus-loader'
            }
          ]
        })
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
          name: 'fonts/[name].[ext]'
        }
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }, {
        test: webpackIsomorphicToolsPlugin.regular_expression('svg'),
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }, {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./tsrc'),
      'node_modules'
    ],
    extensions: ['.json', '.js']
  },
  plugins: [
    new CleanPlugin([assetsPath], { root: projectRootPath }),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({ filename: '[name]-[chunkhash].css', disable: false, allChunks: true }),
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
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      'process.env.API_URL': JSON.stringify(process.env.API_URL || 'https://dofe-dev.inloop.eu/v1'),
      'process.env.API_URL_FROM_SERVER': JSON.stringify(process.env.API_URL_FROM_SERVER || process.env.API_URL || 'https://dofe-dev.inloop.eu/v1'),
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    // optimizations
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),

    webpackIsomorphicToolsPlugin
  ]
};
