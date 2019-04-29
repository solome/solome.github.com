const yaml = require('js-yaml')
const marked = require('marked')
const nunjucks = require('nunjucks')
const promisify = require('util').promisify
const highlighting = require('pygmentize-bundled')

class Markdown {
  constructor (options) {
    if (!options.nunjucks || !options.nunjucks.base || !options.nunjucks.layout) {
      throw new Error('Need legal configuration for nunjucks.')
    }
    this.env = options.nunjucks.env || new nunjucks.Environment(new nunjucks.FileSystemLoader(options.nunjucks.base), options.nunjucks)

    this.options = options || {}

    marked.setOptions(Object.assign(this.options.marked || {}, {
      renderer: new marked.Renderer(),
      gfm: true, tables: true, breaks: false,
      pedantic: false, sanitize: false,
      smartLists: true, smartypants: false,
      highlight: (code, lang, callback) => highlighting({lang, format: 'html'}, code, (err, content) => callback(err, content.toString())),
    }))

    this.marked = promisify(marked)
    this.render = async (params) =>
      new Promise((resolve, reject) => {
        const layout = params.meta && params.meta.layout ? params.meta.layout : options.nunjucks.layout
        this.env.render(layout.endsWith('.njk') ? layout : layout + '.njk', params, (err, res) => err ? reject(err) : resolve(res))
      })
  }

  async extract (text) {
    const reg = /-{3}([\s\S]*?)-{3}/mg
    const ret = {}
    const match = reg.exec(text)
    if (!match) {
      throw Error('markdown meta info must be required.')
    }
    const content = text.replace(match[0], '')
    const meta = yaml.load(match[1])
    if (!meta.title) {
      throw Error('post must have a title.')
    }
    if (!meta.date) {
      throw Error('post must have a date.')
    }
    const date = (typeof meta.date === 'string') ? (new Date(meta.date)) : false
    if (!date || isNaN(date.getTime())) {
      throw Error(`Invalid Date: ${meta.date}`)
    }
    meta.date = date
    ret['content'] = await this.marked(content)
    ret['meta'] = meta
    return ret
  }

  async build (text) {
    return Buffer.from(await this.render(await this.extract(text)))
  }
}

module.exports = Markdown

