const util = require('util')
const through = require('through2')
const PluginError = require('plugin-error')

const Markdown = require('./providers/Markdown')

module.exports = _options => {

  const options = _options || {}
  const markdown = new Markdown(options)

  return through.obj(async (file, encoding, callback) => {

    if (file.isNull()) {
      callback(null, file)
      return
    }

    if (file.isStream()) {
      callback(new PluginError('gulp markdown', 'Streaming not supported.'))
      return
    }

    try {
      file.contents = await markdown.build(file.contents.toString())
      file.extname = '.html'
      callback(null, file)
    } catch (error) {
      callback(new PluginError('gulp markdown', error, { fileName: file.path }))
    }
  })
}

