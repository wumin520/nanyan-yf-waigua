module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://back.run4wd.com/",
        ws: true,
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '/', // rewrite path
        // }
      },
      "^/foo": {
        target: "<other_url>"
      }
    }
  }
};
