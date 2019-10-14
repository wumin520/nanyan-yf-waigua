const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://front.run4wd.com/",
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
  },
  configureWebpack: {
    entry: {
      antd: ['ant-design-vue']
    },
    plugins: [
      new CompressionWebpackPlugin()
    ],
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          antd: {
            name: 'antd',
            chunks: 'initial'
          }
        }
      }
    }
  },
};
