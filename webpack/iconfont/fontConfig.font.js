const glob = require('glob').sync
const loadDir = glob('../../src/assets/iconfont/**/*.svg')
const loadDirArr = Array.prototype.slice.apply( loadDir )
const iconsInDir = loadDirArr.map((elem) => {
  // return '../' + elem.replace('./src/', '')
  return elem
})

const fontConfig = {
  fontName: 'iconfont',
  files: iconsInDir,
  baseClass: 'ico',
  classPrefix: 'ico--',
  fixedWidth: true
}

module.exports = fontConfig
