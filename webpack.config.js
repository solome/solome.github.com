const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const hashids = require('./bundlers/hashids')
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
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: prod ? '//solome.js.org/' : '/',
    path: outputPath,
  },
  devServer: devServer(outputPath),
  resolve: {
    alias: {
      '@images': resolve(resources, 'images'),
      '@components': resolve(resources, 'components'),
      '@three/l3': resolve(resources, 'threejs/l3'),
      '@three/controls': resolve(resources, 'threejs/controls'),
      '@three/libs': resolve(resources, 'threejs/libs'),
    },
    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.png', '.jpg', '.gif' ],
  },
  devtool: prod ? false : 'source-map',
  module: { rules: rules() },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].css",
    })
  ].concat(htmlPlugins),
  resolveLoader: {
    modules: [
      'node_modules',
      resolve(__dirname, 'bundlers/webpack-loaders')
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 2,
      maxInitialRequests: 3,
      name: (module, chunks, cacheGroupKey) => hashids([cacheGroupKey].concat(chunks.map(c => c.name)).join('~')),
      cacheGroups: {},
    },
    runtimeChunk: 'single',
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  mode: process.env.NODE_ENV || 'development',
  stats: {
    children: false,
  },
}

