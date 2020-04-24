module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    devServer: {
      host: '0.0.0.0',
      disableHostCheck: true
    },
  }
}