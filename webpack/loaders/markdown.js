const loaderUtils = require('loader-utils')

module.exports = function (source) {

  const options = loaderUtils.getOptions(this)

  console.log(options)
  console.log(source)


  //return source
  return 'export default "' + encodeURIComponent(source) + '"'
}
