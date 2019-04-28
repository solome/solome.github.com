const path = require('path')
const resolve = path.resolve


const root = resolve(__dirname, '../resources/blog')

console.log('debug', resolve(__dirname, 'loaders/markdown.js'))

module.exports = {
  entry: {
    'show-icon-in-web': resolve(root, 'show-icon-in-web.markdown')
  },
  output: {
    filename: '[name].html',
    path: resolve(__dirname, '../web/blog'),
  },
  resolve: {
    extensions: ['.markdown'],
  },
  module: {
    rules: [
      {
        test: /\.markdown$/,
        use: [
          {
            loader: resolve(__dirname, 'loaders/markdown.js'),
            options: {
              debug: true,
            },
          },
        ],
      },
    ],
  },
  mode: 'development',
  stats: 'normal',
}
