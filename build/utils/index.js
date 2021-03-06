var path = require('path')
var config = require('../config')
var packageConfig = require("../../package.json")
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob')

exports.getEntries = function (globPath) {
  var entries = {},
    basename, tmp, pathname

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry))
    tmp = entry.split('/').splice(-2)
    pathname = tmp.splice(0, 1) + '/index'
    entries[pathname] = entry
  })
  entries['index'] = './src/app.js'
  entries['components'] = this.getComponentsEntries('./src/components/**/index.js')
  return entries;
}

exports.getEntryPages = function(globPath){
  var entries = {},
    basename, tmp, pathname

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry))
    tmp = entry.split('/').splice(-2)
    pathname = tmp.splice(0, 1) + '/index'
    entries[pathname] = entry
  })
  entries['index'] = './src/app.js'
  return entries;
}

exports.getComponentsEntries = function (globPath) {
  var entries = []
  glob.sync(globPath).forEach(function (entry) {
    var tmp = entry.substr(0, entry.lastIndexOf("/"))
    var basename = tmp.substr(tmp.lastIndexOf("/") + 1)
    entries.push(basename)
  })
  return entries;
}

exports.getComponentsPath = function (globPath) {
  var entries = {}
  glob.sync(globPath).forEach(function (entry) {
    var tmp = entry.substr(0, entry.lastIndexOf("/"))
    var basename = tmp.substr(tmp.lastIndexOf("/") + 1)
    var filePath = path.resolve(__dirname, "../../" + entry)
    entries[basename] = filePath
  })
  return entries;
}

exports.getDependencies = function(){
  var entries = [];
  for(var entry in packageConfig.dependencies){
    if(entry)
      entries.push(entry);
  }
  glob.sync('./lib/**/index.js').forEach(function (entry) {
    entries.push(entry);
  })
  return entries;
}

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}
