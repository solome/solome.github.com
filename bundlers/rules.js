module.exports = () => {

  return [
    { test: /\.tsx?$/, loader: 'ts-loader' }, // typescript
    { test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: { fallback: 'file-loader', limit: 2048, name: '[name]-[hash:8].[ext]', outputPath: '/webroot/images/build' },
      }],
    }, // images
    { test:  /\.njk/,
      use: ['html-loader', {
        loader: 'nunjucks-html-loader',
        options: { searchPaths: [ 'resources' ] },
      }],
    },
  ]
}

