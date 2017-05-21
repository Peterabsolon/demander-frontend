/* eslint-disable */
if (process.env.NODE_ENV !== 'production') {
  require('../server.babel');
}
var path = require('path');
var rootDir = path.resolve(__dirname, '..');

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

// if (__DEVELOPMENT__ && !process.env.PIPING_DISABLED) {
//   if (!require('piping')({
//     hook: true,
//     ignore: /(\/\.|~$|\.json|\.styl)/i
//   })) {
//     return;
//   }
// }

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .server(rootDir, function() {
    if (__DEVELOPMENT__) {
      require('../src/server');
    } else {
      require('../tsrc/server');
    }
  });
/* eslint-enable */
