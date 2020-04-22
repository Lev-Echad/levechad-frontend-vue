import {devServer} from "vuetify-loader/dev/webpack.config";

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ]
}
devServer = {
  disableHostCheck: true,
      host: '0.0.0.0',
      port: 3000
}