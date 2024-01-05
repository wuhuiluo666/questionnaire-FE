module.exports = {
  devServer: {
    port: 3000,
    hot: true,
    client: {
      overlay: false
    },
    proxy: {
      '/api': {
        target: 'https://question-server.onrender.com',
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  }
}
