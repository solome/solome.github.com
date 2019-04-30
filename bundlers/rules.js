const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = () => {

  return [
    { test: /\.tsx?$/, loader: 'ts-loader' }, // typescript
    { test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: { fallback: 'file-loader', limit: 2048, name: '[name]-[hash:8].[ext]', outputPath: 'webroot/imgs' },
      }],
    }, // images
    { test:  /\.njk/,
      use: ['html-loader', {
        loader: 'nunjucks-html-loader',
        options: { searchPaths: [ 'resources' ] },
      }],
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        { loader: MiniCssExtractPlugin.loader },
        {
          loader: 'css-loader',
          options: { importLoaders: 1 },
        },
        { loader: 'postcss-loader' },
      ],
    }, // scss
  ]
}

