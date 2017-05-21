var path = require('path')
var webpack = require('webpack')
var projectRootPath = path.resolve(__dirname, '../')
const glob = require('glob').sync
var fs = require('fs')
const uniq = require('lodash/uniq')
var detect = require('detect-import-require')

const defaultList = [
  'babel-polyfill',

  // <babel-runtime>
  //
  // Generate this list using the following command against the stdout of
  // webpack running against the source bundle config (dev/prod.js):
  //
  //    webpack --config webpack/dev.config.js --display-modules | egrep -o 'babel-runtime/\S+' | sed 's/\.js$//' | sort | uniq
  'babel-runtime/core-js/array/from',
  'babel-runtime/core-js/get-iterator',
  'babel-runtime/core-js/is-iterable',
  'babel-runtime/core-js/json/stringify',
  'babel-runtime/core-js/map',
  'babel-runtime/core-js/number/is-integer',
  'babel-runtime/core-js/number/is-safe-integer',
  'babel-runtime/core-js/object/assign',
  'babel-runtime/core-js/object/create',
  'babel-runtime/core-js/object/define-property',
  'babel-runtime/core-js/object/get-own-property-descriptor',
  'babel-runtime/core-js/object/get-own-property-names',
  'babel-runtime/core-js/object/get-prototype-of',
  'babel-runtime/core-js/object/keys',
  'babel-runtime/core-js/object/set-prototype-of',
  'babel-runtime/core-js/promise',
  'babel-runtime/core-js/symbol',
  'babel-runtime/core-js/symbol/iterator',
  'babel-runtime/helpers/class-call-check',
  'babel-runtime/helpers/classCallCheck',
  'babel-runtime/helpers/create-class',
  'babel-runtime/helpers/createClass',
  'babel-runtime/helpers/defineProperty',
  'babel-runtime/helpers/extends',
  'babel-runtime/helpers/get',
  'babel-runtime/helpers/inherits',
  'babel-runtime/helpers/interop-require-default',
  'babel-runtime/helpers/interopRequireDefault',
  'babel-runtime/helpers/object-without-properties',
  'babel-runtime/helpers/objectWithoutProperties',
  'babel-runtime/helpers/possibleConstructorReturn',
  'babel-runtime/helpers/slicedToArray',
  'babel-runtime/helpers/to-consumable-array',
  'babel-runtime/helpers/toConsumableArray',
  'babel-runtime/helpers/typeof',
  // </babel-runtime>

  'react',
  'react-dom',
  'react-helmet',
  'react-hot-loader',
  'react-redux',
  'react-router',
  'react-router-redux',
  'react-router-scroll',
  'redux',
  'redux-connect',
  'redux-form',
  'serialize-javascript',
  'superagent'
]

function getVendors() {
  const loadDir = glob(projectRootPath + '/src/**/*.js')
  const loadDirArr = Array.prototype.slice.apply(loadDir)
  const arr = []
  const files = loadDirArr.map(file => {
    var src = fs.readFileSync(file, 'utf8')

    try {
      detect(src).forEach(item => {
        if (
          item[0] !== '.' &&
          item[0] !== '~' &&
          item.indexOf('components/') !== 0 &&
          item.indexOf('containers/') !== 0 &&
          item.indexOf('models/') !== 0 &&
          item.indexOf('redux/') !== 0 &&
          item.indexOf('constants/') !== 0 &&
          item.indexOf('helpers/') !== 0 &&
          item.indexOf('routes/') !== 0 &&
          item.indexOf('utils/') !== 0 &&
          item.indexOf('config/') !== 0 &&
          item.indexOf('config') !== 0 &&
          file.slice(-7) !== 'test.js' &&
          file.slice(-10) !== '/client.js' &&
          file.slice(-12) !== 'src/index.js' &&
          file.slice(-10) !== '/server.js' &&
          file.slice(-7) !== '/app.js' &&
          item !== 'pretty-error' &&
          item !== 'express' &&
          item !== 'request'
          )
        {
          arr.push(item)
          // console.log(item)
        }
      })

    } catch(err) {
      // console.log(err)
    }

  })

  return uniq(defaultList.concat(uniq(arr)))
}

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',

  output: {
    path: path.join(projectRootPath, 'static/dist/dlls'),
    filename: 'dll__[name].js',
    library: 'DLL_[name]_[hash]'
  },

  performance: {
    hints: false
  },

  entry: {
    vendor: getVendors()
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    new webpack.DllPlugin({
      path: path.join(projectRootPath, 'webpack/dlls/[name].json'),
      name: 'DLL_[name]_[hash]'
    })
  ]
}
