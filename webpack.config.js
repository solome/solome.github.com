const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const parse = require('./bundlers/parse')
const rules = require('./bundlers/rules')
const devServer = require('./bundlers/dev-server')

const prod = process.env.NODE_ENV === 'production'
const resolve = path.resolve
const resources = resolve(__dirname, 'resources')

const outputPath = resolve(__dirname, 'webroot')

const { entries, htmlPlugins } = parse(resources)

module.exports = {
  entry: entries,
  output: {
    filename: '[name]-[hash:8].js',
    publicPath: prod ? '//solome.js.org/' : '/',
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]-[hash:8].css",
      chunkFilename: "[name].css"
    })
  ].concat(htmlPlugins),
  resolveLoader: {
    modules: [
      'node_modules',
      resolve(__dirname, 'bundlers/webpack-loaders')
    ],
  },
  optimization: {
    splitChunks: { chunks: 'async' },
  },
  mode: process.env.NODE_ENV ||'development',
  stats: {
    children: false,
  },
}
