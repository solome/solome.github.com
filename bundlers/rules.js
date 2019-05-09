const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const prod = process.env.NODE_ENV === 'production'

module.exports = () => {

  return [
    {
      test: /\.tsx?$/,
      use: [
        'cache-loader',
        {
          loader: 'thread-loader',
          options: {
            workers: require('os').cpus().length - 1,
          },
        }, {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
            transpileOnly: true,
          },
        }
      ],
    }, // typescript
    {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: { fallback: 'file-loader', limit: 2048, name: '[name]-[hash:8].[ext]', outputPath: 'imgs' },
      }],
    }, // images
    {
      test: /\.njk/,
      use: ['html-loader', {
        loader: 'nunjucks-html-loader',
        options: { searchPaths: ['resources'] },
      }],
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: !prod,
            reloadAll: true,
          }
        },
        {
          loader: 'css-loader',
          options: { importLoaders: 1 },
        },
        { loader: 'postcss-loader' },
      ],
    }, // scss
  ]
}

