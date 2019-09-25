module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://locahost:8001/',
        ws: true,
        changeOrigin: true
      },
      '^/foo': {
        target: '<other_url>'
      }
    }
  }
}
