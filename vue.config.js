module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://front.run4wd.com/",
        ws: true,
        changeOrigin: true
      },
      "^/foo": {
        target: "<other_url>"
      }
    }
  }
};
