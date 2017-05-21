const path = require('path')
const glob = require('glob')
const autoprefixer = require('autoprefixer')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))
// const open = require('open')
const HappyPack = require('happypack')
const fs = require('fs')

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(file => {
    return fs.statSync(path.join(srcpath, file)).isDirectory()
  })
}

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}


var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});
delete babelLoaderQuery.env;

babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];

const sections = []
const folders = getDirectories(path.resolve(__dirname, '../src/components/'))

folders.map(folder => {
  sections.push({
    name: capitalizeFirstLetter(folder),
    components: () => {
      return glob.sync(path.resolve(__dirname, '../src/components/' + folder + '/**/*.js'))
      .filter(module => {
        return /\/[A-Z]\w*\.js$/.test(module)
      })
    }
  })
})

module.exports = {
  title: 'Styleguide',
  serverPort: 3020,
  highlightTheme: 'base16-light',
  styleguideDir: './ui',
  sections,
  getComponentPathLine: componentPath => {
    const name = path.basename(componentPath, '.js')
    const dir = path.dirname(componentPath)
    const library = dir.substr(0, dir.lastIndexOf('/')).slice(7)

    console.log(library, 'library')

    return 'import { ' + name + ' } from \'' + library + '\''
  },
  updateWebpackConfig: webpackConfig => {
    const dir = path.resolve(__dirname, '../src')

    // webpackConfig.entry.push(path.join(__dirname, '../../src/assets/css/main.styl'))
    // webpackConfig.entry.push(path.join(__dirname, '../../src/assets/css/ui.styl'))
    webpackConfig.plugins.push(new HappyPack({ id: 'ui', threads: 5 }))
    webpackConfig.resolve.modulesDirectories.push(path.resolve('../src'))
    webpackConfig.module.loaders.push(
      {
        test: /\.js?$/,
        include: dir,
        loaders: ['babel?' + JSON.stringify(babelLoaderQuery)],
        happy: { id: 'ui' }
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        include: dir,
        loader: "style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&camelCase=dashes!stylus-loader"
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        exclude: /node_modules/,
        include: dir,
        loader: 'url-loader?limit=8192&name=fonts/[name].[ext]'
      }, {
        test: /\.(ttf|eot|woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=8192&name=fonts/[name].[ext]'
      }, {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        include: dir,
        loader: 'url-loader?limit=10240'
      }, {
        test: webpackIsomorphicToolsPlugin.regular_expression('svg'),
        include: dir,
        loader: 'url-loader?limit=10240'
      }
    )
    // open('http://localhost:3020')
    return webpackConfig
  }
}
