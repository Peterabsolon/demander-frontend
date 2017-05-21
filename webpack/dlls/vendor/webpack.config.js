var path = require('path');
var webpack = require('webpack');
var root = path.resolve(__dirname, '..', '..', '..');
const glob = require('glob').sync
var fs = require('fs')
const uniq = require('lodash/uniq')
var detect = require('detect-import-require')

var vendorConfig = {
  devtool: process.env.NODE_ENV === 'production' ? null : 'inline-source-map',

  output: {
    path: path.join(root, 'static/dist/dlls'),
    filename: 'dll__[name].js',
    library: 'DLL_[name]_[hash]'
  },

  entry: {
    vendor: [

    ]
  },

  resolve: {
    root: path.resolve(root, 'node_modules'),
    extensions: [ '', '.js' ],
    postfixes: [],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    new webpack.DllPlugin({
      path: path.join(root, 'webpack/dlls/manifests/[name].json'),
      name: 'DLL_[name]_[hash]'
    })
  ]
};

function getVendorConfig() {
  return new Promise(resolve => {
    const loadDir = glob(root + '/tsrc/**/*.js')
    const loadDirArr = Array.prototype.slice.apply(loadDir)

    const arr = []
    const files = loadDirArr.map(file => {
      var src = fs.readFileSync(file, 'utf8')

      try {
        detect(src).forEach(item => {
          // if (item[0] !== '.' && item.slice(0, 1) !==  && item.slice(0, 4) !== 'main' && file.slice(-10) !== '/client.js' && file.slice(-7) !== '/app.js') {
         // if (item[0] !== '.' && item.slice(0, 1) !==  && item.slice(0, 4) !== 'main' && file.slice(-10) !== '/client.js' && file.slice(-7) !== '/app.js') {
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


    vendorConfig.entry.vendor = uniq(vendorConfig.entry.vendor.concat(uniq(arr)))

    console.log('# 👀  Found ' + vendorConfig.entry.vendor.length + ' dependencies')
    resolve(vendorConfig)
  })
}

// getVendorConfig().then(data => console.log(data))
module.exports = getVendorConfig()