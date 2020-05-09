module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    devtool: 'source-map',
    devServer: {
      host: '127.0.0.1',
      disableHostCheck: true
    },
  }
}