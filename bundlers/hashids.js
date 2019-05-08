const Hashids = require('hashids')


module.exports = (txt) => {
  const hashids = new Hashids(txt, 16)
  return hashids.encode(3, 1, 4)
}
