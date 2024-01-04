module.exports = {
  devServer: {
    proxy: {
      '/api': 'https://question-server.onrender.com'
    }
  }
}
