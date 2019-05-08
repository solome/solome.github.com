module.exports = (contentBase) => {
  return {
    contentBase, compress: true, inline: true,
    allowedHosts: [ '.tecnet.me', '.js.org', '.juyipeng.net', '.iliyang.cn' ],
    port: '8081',
    historyApiFallback: {
      rewrites: [
        { from: /^\/threejs\/l3/, to: '/threejs/l3/index.html' },
        { from: /./, to: '/404.html'},
      ]
    },
  }
}
