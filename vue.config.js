module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://dfa34h.natappfree.cc/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/', // rewrite path
        }
      },
      "^/foo": {
        target: "<other_url>"
      }
    }
  }
};
