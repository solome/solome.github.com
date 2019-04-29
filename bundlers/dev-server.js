module.exports = (contentBase) => {
  return {
    contentBase, compress: true, inline: true,
    allowedHosts: [ '.tecnet.me', '.js.org', 'juyipeng.net' ],
    port: '8081',
  }
}
