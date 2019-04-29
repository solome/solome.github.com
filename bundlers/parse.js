const fs = require('fs')
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = path.resolve

const accessible = (f) => {
  try {
    fs.accessSync(f)
    return true
  } catch (e) {
    return false
  }
}

const htmlPlugins = []

const parse = (c, srcPath) => {

  const name = c.replace('.page.ts', '')
  const tpl = resolve(srcPath, name + '.njk')

  htmlPlugins.push(new HtmlWebpackPlugin({
    filename: name + '.html', chunks: [name],
    template: 'nunjucks-html-loader!./resources/' + (accessible(tpl) ? name : 'app') + '.njk',
  }))
  const res = {}
  res[name] = resolve(srcPath, c)
  return res
}

module.exports = (srcPath ) => {
  const entries = glob.sync('**/*.page.ts', { cwd: srcPath })
    .reduce((a, c) => {
      const res = parse(c, srcPath)
      Object.assign(res, typeof a === 'string' ? parse(a, srcPath) : a)
      return res
    })

  return { entries, htmlPlugins }
}

