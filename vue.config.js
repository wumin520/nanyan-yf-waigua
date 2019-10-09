module.exports = {
  devServer: {
    proxy: {
      "^/api": {
<<<<<<< HEAD
        target: "http://front.run4wd.com/",
        ws: true,
        changeOrigin: true
=======
        target: "http://dfa34h.natappfree.cc/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/', // rewrite path
        }
>>>>>>> update
      },
      "^/foo": {
        target: "<other_url>"
      }
    }
  }
};
