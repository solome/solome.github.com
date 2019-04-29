const path = require('path')

const parse = require('./bundlers/parse')
const rules = require('./bundlers/rules')
const devServer = require('./bundlers/dev-server')

const prod = process.env.NODE_ENV === 'production'
const resolve = path.resolve
const resources = resolve(__dirname, 'resources')

const outputPath = resolve(__dirname, 'webroot/explore')

const { entries, htmlPlugins } = parse(resources)

module.exports = {
  entry: entries,
  output: {
    filename: '[name]-[hash:8].js',
    publicPath: prod ? '//solome.js.org/explore' : '',
    path: outputPath,
  },
  devServer: devServer(outputPath),
  resolve: {
    alias: {
      '@images': resolve(resources, 'images'),
      '@three/controls': resolve(resources, 'threejs/controls'),
      '@three/libs': resolve(resources, 'threejs/libs'),
    },
    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.png', '.jpg', '.gif' ],
  },
  devtool: 'source-map',
  module: { rules: rules() },
  plugins: [].concat(htmlPlugins),
  optimization: {
    /*splitChunks: {
      chunks: 'async',
      // chunks: (chunk) => {
      //   return chunk.name.indexOf('three') !== -1
      // },
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        'react-vendor': {
          test: (module, chunks) => /react/.test(module.context),
          priority: 1,
        },
      },
    },*/
  },
  resolveLoader: {
    modules: [
      'node_modules',
      resolve(__dirname, 'bundlers/webpack-loaders')
    ],
  },
  mode: process.env.NODE_ENV ||'development',
}

